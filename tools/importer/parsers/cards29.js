/* global WebImporter */
export default function parse(element, { document }) {
  // Find all immediate card wrappers
  const cardWrappers = element.querySelectorAll('.Bentos_bentoCardWrapper__JOqaj');

  // Header row: single cell, matches example exactly
  const rows = [
    ['Cards (cards29)'],
  ];

  for (const card of cardWrappers) {
    // Find card body content: title and description
    const content = card.querySelector('.FeatureCard_bentoCard___SlXN .PortableText_portableText__iCL6x');
    let title = null, desc = null;
    if (content) {
      title = content.querySelector('h6');
      desc = content.querySelector('p');
    }

    // Find the card's main illustrative image (prefer foreground, then background)
    let image = null;
    let media = card.querySelector('.FeatureCard_mediaWrapper__iqX3p .GlassWrapper_glassWrapper__v7ny9');
    if (!media) {
      media = card.querySelector('.FeatureCard_mediaWrapper__iqX3p .FeatureCard_backgroundWrapper__1SJvr');
    }
    if (!media) {
      media = card.querySelector('.FeatureCard_mediaWrapper__iqX3p .FeatureCard_foregroundContainer___WJBA');
    }
    if (!media) {
      media = card.querySelector('.FeatureCard_mediaWrapper__iqX3p');
    }
    if (media) {
      image = media.querySelector('img');
    }
    // fallback: any img directly inside this card (protection for variants)
    if (!image) {
      image = card.querySelector('img');
    }

    // Fallback: if still no image, leave cell empty
    let imageCell = image || '';

    // Compose text cell: include title and desc if present (existing elements, order preserved)
    const cellContent = [];
    if (title) cellContent.push(title);
    if (desc) cellContent.push(desc);
    // If both are missing, leave cell empty
    rows.push([
      imageCell,
      cellContent.length ? cellContent : ''
    ]);
  }

  // The createTable helper does NOT set colspan on header, so we do it here manually
  const table = WebImporter.DOMUtils.createTable(rows, document);
  // Set the colspan=2 on the first row's first cell
  const firstRow = table.querySelector('tr');
  if (firstRow && firstRow.children.length === 1) {
    firstRow.children[0].setAttribute('colspan', '2');
  }
  element.replaceWith(table);
}

/* global WebImporter */
export default function parse(element, { document }) {
  // Table header
  const headerRow = ['Hero'];

  // ---
  // 1. Get background image (if any)
  let backgroundImageEl = null;
  // Look for the main image inside the background container
  const bgPicture = element.querySelector('.PotholeV4_backgroundContainer__KykGO picture');
  if (bgPicture) {
    const img = bgPicture.querySelector('img');
    if (img) {
      backgroundImageEl = img;
    }
  }

  // 2. Get content: heading, subheading, CTA, etc.
  // All inside PortableText_portableText__iCL6x
  const contentContainer = element.querySelector('.PortableText_portableText__iCL6x');
  let contentEls = [];
  if (contentContainer) {
    contentEls = Array.from(contentContainer.childNodes).filter(node => {
      // Only include element nodes and meaningful text nodes
      return node.nodeType === 1 || (node.nodeType === 3 && node.textContent.trim());
    });
  }

  // ---
  // Build table rows
  // Row 2: background image (optional)
  // Row 3: content (optional)
  const rows = [
    headerRow,
    [backgroundImageEl ? backgroundImageEl : ''],
    [contentEls.length ? contentEls : '']
  ];

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}

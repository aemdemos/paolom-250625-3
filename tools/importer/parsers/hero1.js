/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Table header row must match example exactly
  const header = ['Hero'];

  // 2. Find the background image (optional, can be empty)
  let bgImg = null;
  // The picture tag is inside a div with class containing 'PotholeV4_backgroundContainer'
  const bgContainer = element.querySelector('[class*="PotholeV4_backgroundContainer"]');
  if (bgContainer) {
    // Try <picture> <img> directly inside it
    const img = bgContainer.querySelector('picture img');
    if (img) {
      bgImg = img;
    }
  }

  // 3. Collect content: Heading, subheading, CTA, etc. Should be block content, not flat text
  // The text content is in the div with class containing 'PotholeV4_content'
  let contentCell = '';
  const contentDiv = element.querySelector('[class*="PotholeV4_content"]');
  if (contentDiv) {
    // We want all child elements, in order
    const children = Array.from(contentDiv.children);
    if (children.length > 0) {
      contentCell = children;
    } else {
      contentCell = '';
    }
  } else {
    contentCell = '';
  }

  // 4. Assemble the rows. 1 column, 3 rows.
  const rows = [
    header,
    [bgImg ? bgImg : ''],
    [contentCell],
  ];

  // 5. Create and replace
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}

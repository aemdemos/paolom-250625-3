/* global WebImporter */
export default function parse(element, { document }) {
  // HERO block: 1 column, 3 rows: [Header], [Background image (optional)], [Text/Heading/Subheading/CTA]

  // 1. Header row
  const headerRow = ['Hero'];

  // 2. Background image row: none in the HTML, so empty.
  const imageRow = [''];

  // 3. Content row: All children from the element in order (preserves structure, headings, buttons, etc)
  // Per spec, reference the existing elements, not clones.
  const contentElements = Array.from(element.childNodes).filter(node => {
    // Filter out empty text nodes
    return !(node.nodeType === Node.TEXT_NODE && !node.textContent.trim());
  });
  // If all children are empty, content cell should still be present (as empty string)
  const contentRow = [contentElements.length > 0 ? contentElements : ['']];

  // Compose the final cells array
  const cells = [
    headerRow,
    imageRow,
    contentRow
  ];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}

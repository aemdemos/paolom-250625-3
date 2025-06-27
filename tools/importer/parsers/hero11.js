/* global WebImporter */
export default function parse(element, { document }) {
  // Build the Hero table: 1 column, 3 rows (header, background image, content)

  // Exact header as shown in example markdown
  const headerRow = ['Hero'];

  // 2nd row: Background image -- there is no image in this HTML, so empty string
  const imageRow = [''];

  // 3rd row: Content (title and body)
  // Try to find the content wrapper
  let contentElems = [];
  const wrapper = element.querySelector(':scope > .PortableText_portableText__iCL6x');
  if (wrapper) {
    // Get all direct children (should be heading and paragraph)
    contentElems = Array.from(wrapper.children);
  } else {
    // Fallback: gather all h1-h6 and p inside the element
    contentElems = Array.from(element.querySelectorAll('h1,h2,h3,h4,h5,h6,p'));
  }
  // If there is no content, ensure we have an empty cell (edge case)
  const contentRow = [contentElems.length ? contentElems : ['']];

  // Build and replace
  const rows = [headerRow, imageRow, contentRow];
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}

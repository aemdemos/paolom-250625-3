/* global WebImporter */
export default function parse(element, { document }) {
  // According to the example, there is only one table (with 'Hero' as header, one column, three rows)
  // No Section Metadata in the example, so no <hr> or metadata table.
  // The 2nd (middle) row is for a background image (none in provided HTML)
  // The last row must include all content from the hero: all headings, text, buttons, etc (all direct children)

  // Get all direct children (including text nodes with non-whitespace)
  const contentNodes = Array.from(element.childNodes).filter(node => {
    if (node.nodeType === Node.ELEMENT_NODE) return true;
    if (node.nodeType === Node.TEXT_NODE && node.textContent.trim().length > 0) return true;
    return false;
  });

  // Table rows as per example markdown (one column only)
  const rows = [
    ['Hero'],
    [''], // No background image in the HTML
    [contentNodes]
  ];
  
  // Create the block table
  const table = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element
  element.replaceWith(table);
}

/* global WebImporter */
export default function parse(element, { document }) {
  // Block header row (must match example exactly)
  const blockHeader = ['Hero'];

  // Row 2: background image (optional, not in this html, so empty)
  const row2 = [''];

  // Row 3: All visible content from the main hero (iframe and text)
  // The only content in this hero is an iframe (possibly with text overlayed by JS, but not in the DOM)
  // We'll extract all children of the main div wrapper and convert any iframe to a link as per rules
  let row3Content = [];
  const wrapper = element.querySelector(':scope > div');
  if (wrapper) {
    // Iterate all direct children
    wrapper.childNodes.forEach(node => {
      if (node.nodeType === Node.ELEMENT_NODE && node.tagName.toLowerCase() === 'iframe') {
        // Replace iframe with a link to its src
        const link = document.createElement('a');
        link.href = node.src;
        link.textContent = node.src;
        row3Content.push(link);
      } else if (node.nodeType === Node.TEXT_NODE && node.textContent.trim()) {
        // Text nodes: append as text
        row3Content.push(document.createTextNode(node.textContent));
      } else if (node.nodeType === Node.ELEMENT_NODE) {
        // Other elements: append as is
        row3Content.push(node);
      }
    });
  }
  // If row3Content is empty, add an empty string for cell
  if (!row3Content.length) row3Content = [''];

  // Compose the table: 1 column, 3 rows
  const cells = [
    blockHeader,
    row2,
    [row3Content]
  ];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  // Replace original with the new table
  element.replaceWith(table);
}

/* global WebImporter */
export default function parse(element, { document }) {
  // Table header as in the markdown example; must be exactly 'Hero'
  const headerRow = ['Hero'];

  // Second row: background image (none in the provided HTML)
  const backgroundRow = [''];

  // Third row: collect title, subheading, button group (if exists) in order
  const cells = [headerRow, backgroundRow];
  const contentNodes = [];
  // In the example HTML, content is in order: h1, p, div.buttonGroup (may be missing some parts)
  for (const child of element.children) {
    if (
      child.tagName === 'H1' ||
      child.tagName === 'H2' ||
      child.tagName === 'H3' ||
      child.tagName === 'H4' ||
      child.tagName === 'H5' ||
      child.tagName === 'H6' ||
      child.tagName === 'P' ||
      child.classList.contains('ButtonGroup_buttonGroup__IqHNF')
    ) {
      contentNodes.push(child);
    }
  }
  // If there's at least one content node, collect it for the third row
  // If not, insert an empty string
  cells.push([contentNodes.length ? contentNodes : ['']]);

  // Create the table and replace the element
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}

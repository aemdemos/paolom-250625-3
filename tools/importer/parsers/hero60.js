/* global WebImporter */
export default function parse(element, { document }) {
  // Header row as in the example
  const headerRow = ['Hero'];

  // No background image in this HTML block, so the image row is empty
  const backgroundRow = [''];

  // Gather content for the final cell (title/heading and call-to-actions)
  // Find the heading (any level, for generality)
  const heading = element.querySelector('h1, h2, h3, h4, h5, h6');
  // Find the button group
  const btnGroup = element.querySelector('.ButtonGroup_buttonGroup__IqHNF, .title3Block_buttonGroup__pLNNO');
  
  // Prepare content array for the final row
  const contentArr = [];
  if (heading) contentArr.push(heading);
  if (btnGroup) contentArr.push(btnGroup);

  // The content row is always present, even if empty
  const contentRow = [contentArr.length > 0 ? contentArr : ['']];

  // Compose the block table
  const rows = [headerRow, backgroundRow, contentRow];
  const block = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element with the new table
  element.replaceWith(block);
}

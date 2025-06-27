/* global WebImporter */
export default function parse(element, { document }) {
  // Get all direct child buttons (each contains a logo block)
  const buttons = Array.from(element.querySelectorAll(':scope > button'));

  // Determine number of columns per row (visually, it's 3 per row)
  const columns = 3;
  const headerRow = ['Columns (columns67)'];
  const tableRows = [];

  // Create rows of three logos each. Each cell references the direct logo tile div inside each button.
  for (let i = 0; i < buttons.length; i += columns) {
    const rowButtons = buttons.slice(i, i + columns);
    const rowCells = rowButtons.map(btn => {
      // Each button should have a div as its first child which is the logo tile (with svg and label)
      const tile = btn.querySelector(':scope > div');
      return tile || '';
    });
    // If the last row is not full, pad with empty strings
    while (rowCells.length < columns) {
      rowCells.push('');
    }
    tableRows.push(rowCells);
  }

  // Compose the final table array: first header, then all rows
  const cells = [headerRow, ...tableRows];
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}

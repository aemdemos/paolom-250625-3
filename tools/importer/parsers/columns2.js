/* global WebImporter */
export default function parse(element, { document }) {
  // Locate the grid containing the columns
  const mainGrid = element.querySelector('.Touts_container__vz1BL');
  if (!mainGrid) return;
  const toutsWrap = mainGrid.querySelector('.Touts_touts__tzgjP');
  if (!toutsWrap) return;
  // The actual columns are direct children of the final subgrid
  const subGrid = toutsWrap.querySelector('.Touts_container__lYFO0');
  if (!subGrid) return;

  // Each tout is a column
  const columns = Array.from(subGrid.querySelectorAll(':scope > .tout'));
  if (!columns.length) return;

  // Build the header as in the example
  const cells = [
    ['Columns (columns2)']
  ];

  // Extract content for each column
  const rowCells = columns.map(col => {
    // Per block guidelines, reference the direct content block
    // The inner .Touts_tout__lhjIQ contains all visible content (icon + text)
    const inner = col.querySelector(':scope > .Touts_tout__lhjIQ');
    return inner || col;
  });
  cells.push(rowCells);

  // Create table and replace original element
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}

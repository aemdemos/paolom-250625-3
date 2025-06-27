/* global WebImporter */
export default function parse(element, { document }) {
  // Gather all columns: logo, then navigation columns
  const columns = [];
  const logoCol = element.querySelector('.Footer_columnLogo__ZmOOW');
  if (logoCol) columns.push(logoCol);
  const navColsContainer = element.querySelector('.Footer_columnPrimaryLinks__Sacae');
  if (navColsContainer) {
    const navCols = Array.from(navColsContainer.querySelectorAll(':scope > .Footer_columnPrimaryLink__JXxbx'));
    columns.push(...navCols);
  }
  if (columns.length === 0) return;
  // The header row must contain only a single cell with the block name
  const headerRow = ['Columns (columns24)'];
  const cells = [
    headerRow,
    columns
  ];
  // Create the table
  const table = WebImporter.DOMUtils.createTable(cells, document);
  // Set the header cell to have colspan to match the number of columns
  const th = table.querySelector('th');
  if (th && columns.length > 1) {
    th.setAttribute('colspan', String(columns.length));
  }
  element.replaceWith(table);
}

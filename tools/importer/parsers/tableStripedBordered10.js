/* global WebImporter */
export default function parse(element, { document }) {
  // Define the block header row exactly as in the example
  const headerRow = ['Table (striped, bordered, tableStripedBordered10)'];

  // Gather all feature rows (these are the table's data rows)
  const featureRows = Array.from(element.querySelectorAll(':scope > .PricingTable_featureRow__QJQRU'));
  if (featureRows.length === 0) return;

  // Each row: [Title, ...feature cells]
  const tableData = [];

  // 1. Extract all feature titles and all data cells per row
  featureRows.forEach(row => {
    // Extract the feature title
    let featureTitle = '';
    const ftWrap = row.querySelector('.PricingTable_featureTitle__ksNjC');
    if (ftWrap) {
      // Grab all textContent from the feature title wrapper (ensures we get the whole label)
      featureTitle = ftWrap.textContent.trim();
    }
    // Extract all feature cells (one per pricing column)
    const limits = Array.from(row.querySelectorAll('.PricingTable_featureLimitsWrapper__WJucA > .PricingTable_featureLimit__atY0q'));
    const cellValues = limits.map(cell => {
      // If there's an SVG inside, treat it as a checkmark
      if (cell.querySelector('svg')) {
        return '✔';
      }
      // Otherwise, get the text content (covers dashes and numbers)
      return cell.textContent.trim();
    });
    tableData.push([featureTitle, ...cellValues]);
  });

  // 2. Build the column headers row: for this table, use the first row's cell count
  //    and set empty string for column headers except the first (feature heading)
  //    because the source html does not provide column headings, only row (feature) headings
  const firstRow = tableData[0];
  const numCols = firstRow.length;
  // First cell is blank, then 'Column 1', 'Column 2', etc. But in most pricing tables the columns are just empty if not provided
  const colHeader = [firstRow[0], ...Array(numCols - 1).fill('')];

  // 3. Construct the full cells array with header row, column header, then data
  const cells = [headerRow, colHeader, ...tableData];

  // 4. Create and replace with the table block
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}

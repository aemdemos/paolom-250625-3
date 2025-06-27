/* global WebImporter */
export default function parse(element, { document }) {
  // Block header: must match example EXACTLY, single column
  const headerRow = ['Table (striped, bordered, tableStripedBordered9)'];

  // Get all direct child feature rows (each row = one feature)
  const featureRows = Array.from(element.querySelectorAll(':scope > div'));
  if (featureRows.length === 0) {
    // Just the block header if empty
    const block = WebImporter.DOMUtils.createTable([headerRow], document);
    element.replaceWith(block);
    return;
  }

  // Determine the maximum number of plan columns across all rows
  let maxPlanCount = 0;
  featureRows.forEach(row => {
    const planCells = row.querySelectorAll('.PricingTable_featureLimitsWrapper__WJucA > .PricingTable_featureLimit__atY0q');
    if (planCells.length > maxPlanCount) maxPlanCount = planCells.length;
  });

  // Compose a blank column header row for visual alignment, matching the example
  const columnHeaderRow = [''];
  for (let i = 0; i < maxPlanCount; i++) columnHeaderRow.push('');

  // Compose table rows from each feature row
  const tableRows = featureRows.map(row => {
    // Feature label: get the first span under feature title, fallback to any text
    let featureLabel = '';
    const titleSpan = row.querySelector('.PricingTable_featureTitle__ksNjC span');
    if (titleSpan) {
      featureLabel = titleSpan.textContent.trim();
    } else {
      // fallback: get the first piece of text content in the title area
      const titleDiv = row.querySelector('.PricingTable_featureTitle__ksNjC');
      if (titleDiv) {
        featureLabel = titleDiv.textContent.trim().split('\n')[0];
      } else {
        // fallback: entire row text
        featureLabel = row.textContent.trim().split('\n')[0];
      }
    }
    // Value cells: SVGs, dashes, and/or text
    const planCells = Array.from(row.querySelectorAll('.PricingTable_featureLimitsWrapper__WJucA > .PricingTable_featureLimit__atY0q'));
    const valueCells = planCells.map(cell => {
      // If checkmark SVG present, use the SVG
      const svg = cell.querySelector('svg');
      if (svg) return svg;
      // If dash (figure) present, use the figure
      const figure = cell.querySelector('figure');
      if (figure) return figure;
      // If non-empty text, use it
      const text = cell.textContent.trim();
      if (text) return text;
      return '';
    });
    // Pad to maxPlanCount
    while (valueCells.length < maxPlanCount) valueCells.push('');
    return [featureLabel, ...valueCells];
  });

  // Compose and create the table block
  const cells = [headerRow, columnHeaderRow, ...tableRows];
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}

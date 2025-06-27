/* global WebImporter */
export default function parse(element, { document }) {
  // Table header: one single cell with block name
  const headerRow = ['Columns (columns12)'];
  // Find the columns container
  const toutsContainer = element.querySelector('.Touts_with4Touts___VPox');
  if (!toutsContainer) return;
  // All direct children touts
  const toutEls = Array.from(toutsContainer.querySelectorAll(':scope > .tout'));
  if (!toutEls.length) return;
  // Each tout cell: reference the main content (icon+text)
  const colCells = toutEls.map(tout => {
    const inner = tout.querySelector('.Touts_tout__lhjIQ');
    return inner || '';
  });
  // Table is: header (1 column), then a single row with N columns
  const rows = [
    headerRow,
    colCells
  ];
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}

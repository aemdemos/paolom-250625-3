/* global WebImporter */
export default function parse(element, { document }) {
  // Header row: one column, block name exactly as required
  const headerRow = ['Columns (columns42)'];
  const cells = [headerRow];

  // Find all intro (StandaloneText) and touts blocks in order
  const introBlocks = Array.from(element.querySelectorAll('article.StandaloneText_standaloneText__L1OFJ'));
  const toutsBlocks = Array.from(element.querySelectorAll('div.Touts_container__vz1BL'));

  // The number of pairs is the smallest of the two counts
  const pairCount = Math.min(introBlocks.length, toutsBlocks.length);
  for (let i = 0; i < pairCount; i++) {
    // 1. Add the intro row (single cell)
    const introContainer = introBlocks[i].querySelector('.StandaloneText_container__OjNQe');
    let introContent = null;
    if (introContainer && introContainer.firstElementChild) {
      introContent = introContainer.firstElementChild;
    } else {
      introContent = introBlocks[i];
    }
    cells.push([introContent]);
    // 2. Add the columns row (one cell per tout)
    // Columns: get direct children with class 'tout' (for resiliency)
    let toutCols = [];
    const toutsContainer = toutsBlocks[i].querySelector('.Touts_container__lYFO0');
    if (toutsContainer) {
      toutCols = Array.from(toutsContainer.children).filter(child => child.classList.contains('tout'));
    } else {
      toutCols = Array.from(toutsBlocks[i].querySelectorAll('.tout'));
    }
    // For each column, use the full .Touts_tout__lhjIQ content (so icon+text)
    const colCells = toutCols.map(tout => tout.querySelector('.Touts_tout__lhjIQ') || tout);
    // Only push this row if there is at least one column
    if (colCells.length > 0) {
      cells.push(colCells);
    }
  }
  // Only replace if we have the header, and at least one intro+columns pair
  if (cells.length > 1) {
    const table = WebImporter.DOMUtils.createTable(cells, document);
    element.replaceWith(table);
  }
}

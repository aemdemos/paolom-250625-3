/* global WebImporter */
export default function parse(element, { document }) {
  // Find the container holding the columns (touts)
  const toutsContainer = element.querySelector('.Touts_container__lYFO0') || element;
  // Get all column wrappers in order
  let columnDivs = Array.from(toutsContainer.querySelectorAll(':scope > .Touts_toutInnerWrapper__DvOcQ'));
  // fallback if not found
  if (columnDivs.length === 0) columnDivs = Array.from(toutsContainer.children);

  // For each column, get its inner content
  const columns = columnDivs.map(col => {
    const inner = col.querySelector('.Touts_tout__lhjIQ');
    return inner ? inner : col;
  });

  // Compose the final block structure: 1 header cell, then 1 row with N columns
  const headerRow = ['Columns (columns49)'];
  const contentRow = columns;

  const cells = [headerRow, contentRow];
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}

/* global WebImporter */
export default function parse(element, { document }) {
  // Find the logo wall layout
  const layout = element.querySelector('.LogoWall_layout__WPqSz');
  if (!layout) return;

  // Find the first row only (the example wants all columns in a single row)
  const firstRow = layout.querySelector(':scope > .LogoWallRow_row___NlgR');
  if (!firstRow) return;

  // Get all columns in the first row
  const columns = Array.from(firstRow.querySelectorAll(':scope > .LogoWallRow_duplicate__h1Wun'));
  if (!columns.length) return;

  // For each column, collect all icons (logo svg wrappers)
  const cellEls = columns.map(col => {
    const icons = Array.from(col.querySelectorAll(':scope > .LogoWallRow_icon__J0ork'));
    if (icons.length === 1) return icons[0];
    if (icons.length > 1) {
      const div = document.createElement('div');
      icons.forEach(icon => div.appendChild(icon));
      return div;
    }
    return '';
  });

  // Build table cells: header row, then a single content row with all columns
  const cells = [
    ['Columns (columns15)'],
    cellEls
  ];

  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}

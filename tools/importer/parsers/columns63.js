/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main touts grid inside the element
  const toutsWrapper = element.querySelector('.Touts_touts__tzgjP');
  if (!toutsWrapper) return;
  const toutsContainer = toutsWrapper.querySelector('.Touts_container__lYFO0');
  if (!toutsContainer) return;

  // Get all direct children with class 'tout' (columns)
  const toutCols = Array.from(toutsContainer.children).filter(child => child.classList.contains('tout'));
  if (toutCols.length === 0) return;

  // The header row must have exactly one column per the specification
  const headerRow = ['Columns (columns63)'];

  // Content row: each tout column content
  // Reference .PortableText_portableText__iCL6x if it exists, else the column itself
  const contentRow = toutCols.map(tout => {
    const colContent = tout.querySelector('.PortableText_portableText__iCL6x') || tout;
    return colContent;
  });

  // Build table with one header cell and N content cells
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow
  ], document);

  // Replace the original element
  element.replaceWith(table);
}

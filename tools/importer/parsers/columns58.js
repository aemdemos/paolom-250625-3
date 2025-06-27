/* global WebImporter */
export default function parse(element, { document }) {
  // This block handles a single column containing a vertical image.
  // The header should match exactly: 'Columns (columns58)'

  // Defensive: try to extract the <picture> or <img> if present, otherwise fallback to the element itself.
  let content;
  const picture = element.querySelector('picture');
  if (picture) {
    content = picture;
  } else {
    const img = element.querySelector('img');
    if (img) {
      content = img;
    } else {
      content = element;
    }
  }

  const headerRow = ['Columns (columns58)'];
  const rows = [
    headerRow,
    [content]
  ];
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
/* global WebImporter */
export default function parse(element, { document }) {
  // Table header
  const headerRow = ['Hero'];

  // First content row: background image (picture tag if present, else empty)
  let backgroundImageRow = [''];
  const picture = element.querySelector('picture');
  if (picture) backgroundImageRow = [picture];

  // Second content row: text block (heading, subheading, cta, etc.)
  // For this set, there is no visible foreground text in the HTML blocks, so leave it empty
  const contentRow = [''];

  // Compose the table as specified: 1 column, 3 rows
  const cells = [
    headerRow,
    backgroundImageRow,
    contentRow,
  ];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
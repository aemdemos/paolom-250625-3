/* global WebImporter */
export default function parse(element, { document }) {
  // Find the background image as a <picture> (should always exist)
  const picture = element.querySelector('picture');

  // Make sure we reference the picture element if found, otherwise empty
  const imageCell = picture ? picture : '';

  // The Hero block for this example contains only image and no heading/cta
  // Structure: 1 column, 3 rows: Header ('Hero'), image, empty cell
  const cells = [
    ['Hero'],
    [imageCell],
    [''],
  ];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
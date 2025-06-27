/* global WebImporter */
export default function parse(element, { document }) {
  // The Hero block expects 1 column and 3 rows.
  // First row: block name ('Hero')
  // Second row: Background image (if present)
  // Third row: Title/heading/subheading/CTA (optional, empty for current HTML)

  // Gather all <picture> elements in order (as in the HTML structure)
  const pictures = Array.from(element.querySelectorAll(':scope > div picture'));
  // Use the leftmost (first) <picture> as background image for the block
  const backgroundPicture = pictures[0] || '';

  // There is no heading, subheading or call-to-action in the provided HTML, so leave the 3rd row empty
  const rows = [
    ['Hero'],
    [backgroundPicture],
    [''],
  ];

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}

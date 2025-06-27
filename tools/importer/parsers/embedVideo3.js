/* global WebImporter */
export default function parse(element, { document }) {
  // Find the <img> inside the <picture> inside the element
  const picture = element.querySelector('picture');
  let img = null;
  if (picture) {
    img = picture.querySelector('img');
  }

  // Construct the cell content: only the image, as source HTML contains only an image
  const cellContent = img ? [img] : [];

  // Build the table structure
  const cells = [
    ['Embed (embedVideo3)'],
    [cellContent]
  ];

  // Create the block table and replace the original element
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}

/* global WebImporter */
export default function parse(element, { document }) {
  // Table header as specified in the block description
  const headerRow = ['Embed (embedVideo54)'];

  // We expect the image to be present and to use it in the cell
  // No video URL is provided in the HTML, so only the image is included
  let contentCell = [];

  // Find the <picture> or <img> (should be immediate child of element)
  let img = element.querySelector('img');
  if (img) {
    // Use the <picture> parent for better fidelity if possible
    const picture = img.closest('picture');
    if (picture && element.contains(picture)) {
      contentCell.push(picture);
    } else {
      contentCell.push(img);
    }
  } else {
    // If there is no image, leave the cell empty
    contentCell.push('');
  }

  // Structure: header row, then one cell containing the image (as per example)
  const cells = [
    headerRow,
    [contentCell],
  ];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
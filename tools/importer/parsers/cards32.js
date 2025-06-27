/* global WebImporter */
export default function parse(element, { document }) {
  // Header row for the Cards block
  const headerRow = ['Cards (cards32)'];

  // Helper: Gets the immediate child .Sequence_fallbackImageContainer and the following text card div (if it exists)
  const imageContainers = Array.from(element.querySelectorAll(':scope > .Sequence_fallbackImageContainer__NBc3G'));

  // Try to find the associated description/text for each card
  // In this HTML, there is no text content -- so we only get the images
  // We'll still create a 2-column row for each image, with an empty cell for text
  const cells = [headerRow];

  imageContainers.forEach(imgDiv => {
    // Find the image element
    const img = imgDiv.querySelector('img');
    // If there's an image, add the row (image + empty div)
    if (img) {
      const emptyTextCell = document.createElement('div');
      cells.push([img, emptyTextCell]);
    }
  });

  // Create and replace block
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}

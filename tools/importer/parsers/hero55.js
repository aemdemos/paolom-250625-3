/* global WebImporter */
export default function parse(element, { document }) {
  // Find the picture or img element for the image (background)
  let imgEl = element.querySelector('picture, img');
  if (!imgEl && element.firstElementChild) {
    imgEl = element.firstElementChild;
  }

  // There is no heading, subheading, or CTA in the sample HTML, so just use empty string in last row
  // Table header must be exactly 'Hero'
  const tableRows = [
    ['Hero'],
    [imgEl],
    [''],
  ];
  const block = WebImporter.DOMUtils.createTable(tableRows, document);
  element.replaceWith(block);
}
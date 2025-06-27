/* global WebImporter */
export default function parse(element, { document }) {
  // Helper: Find the background image (img inside picture inside element)
  let image = null;
  const picture = element.querySelector('picture');
  if (picture) {
    image = picture.querySelector('img');
  }
  // The Hero block only requires the background image in the second row, heading (text overlay) would be in a later row if present
  // In this HTML, there is no visible heading or overlayed text, so the third row is left empty as shown in the example
  const rows = [
    ['Hero'], // Header row matches the example exactly
    [image ? image : ''], // Background image row (if present)
    [''] // Content row (empty, as no heading or CTA is present in this HTML)
  ];

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}

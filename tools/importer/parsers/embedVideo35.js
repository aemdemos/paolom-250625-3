/* global WebImporter */
export default function parse(element, { document }) {
  // Block header must match exactly
  const headerRow = ['Embed (embedVideo35)'];

  // This block is for embedding video (via URL and optional poster image),
  // but the provided element is a purely decorative <div> without any src, iframe, or image.

  // Per the block description, if no URL or image is available, cell should be empty
  const cells = [
    headerRow,
    ['']
  ];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
/* global WebImporter */
export default function parse(element, { document }) {
  // Header row as required
  const headerRow = ['Embed (embedVideo57)'];

  // Try to find the <picture> or <img> in the element
  let content = [];
  const picture = element.querySelector('picture');
  if (picture) {
    content.push(picture);
  } else {
    // Try img directly if picture is missing
    const img = element.querySelector('img');
    if (img) content.push(img);
  }

  // No video or embed link is present, just the image

  // If the element is empty, just leave the content empty
  const rows = [
    headerRow,
    [content]
  ];
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}

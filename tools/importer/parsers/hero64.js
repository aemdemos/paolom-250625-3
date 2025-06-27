/* global WebImporter */
export default function parse(element, { document }) {
  // Find the image (background asset), prefer img inside picture, otherwise any img
  let img = element.querySelector('picture img') || element.querySelector('img');
  // No need to clone, reference directly or use '' if no image

  // Find headline, subheading, cta in content section
  let content = '';
  // Look for the main content container (usually PortableText_portableText__iCL6x)
  let contentContainer = element.querySelector('.PortableText_portableText__iCL6x');
  if (contentContainer) {
    content = contentContainer;
  }

  // Construct table rows exactly per Hero block example: header, background image, content
  const rows = [];
  rows.push(['Hero']); // Header row as in example
  rows.push([img || '']);
  rows.push([content || '']);

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}

/* global WebImporter */
export default function parse(element, { document }) {
  // Table header row, as in the example
  const headerRow = ['Hero'];

  // Extract the background image <img> (found inside <picture> in the second main child)
  let imgEl = null;
  const picture = element.querySelector('picture');
  if (picture) {
    imgEl = picture.querySelector('img');
  }
  const bgImgRow = [imgEl ? imgEl : ''];

  // Extract content (eyebrow, heading, button) from the first grid child
  // We'll keep all content as a fragment to preserve layout and handle variations
  const contentDiv = element.querySelector('.PortableText_portableText__iCL6x');
  // If contentDiv is missing, just leave the row empty
  let contentCell = '';
  if (contentDiv) {
    // Build a fragment with all its children in order
    const frag = document.createDocumentFragment();
    Array.from(contentDiv.childNodes).forEach((node, idx) => {
      // Only append if it's not empty text node
      if (node.nodeType === Node.TEXT_NODE) {
        if (node.textContent.trim()) frag.appendChild(node);
      } else {
        frag.appendChild(node);
      }
    });
    contentCell = frag;
  }
  const contentRow = [contentCell];

  // Compose the block table as specified
  const cells = [
    headerRow,
    bgImgRow,
    contentRow
  ];
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the block table
  element.replaceWith(table);
}

/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main inner container (holds the heading and buttons)
  let contentDiv;
  const container = element.querySelector('.BookEnd_container__ubcoM');
  if (container) {
    // The first (and only) child div of container holds the block content
    contentDiv = Array.from(container.children).find(child => child.tagName === 'DIV');
  } else {
    // fallback: get the first div in element
    contentDiv = element.querySelector('div');
  }

  // Row 2: Background Image (optional) -- not present in provided HTML, so blank
  const backgroundImageCell = '';

  // Row 3: Content (title, subtitle, CTA, etc). All contentDiv children, referenced, not cloned
  // Only include element nodes (not text nodes that are just whitespace)
  // Defensive: if contentDiv is missing, leave blank
  let contentCell;
  if (contentDiv) {
    contentCell = document.createElement('div');
    Array.from(contentDiv.childNodes).forEach(node => {
      if (node.nodeType === Node.ELEMENT_NODE) {
        contentCell.appendChild(node);
      }
    });
    // If contentCell is empty, set to blank string
    if (!contentCell.childNodes.length) contentCell = '';
  } else {
    contentCell = '';
  }

  // Build the cells array with header as in the example ('Hero')
  const cells = [
    ['Hero'],
    [backgroundImageCell],
    [contentCell]
  ];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}

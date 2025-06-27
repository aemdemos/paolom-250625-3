/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Header row: exactly as in the example, one cell containing 'Hero' in bold
  const headerCell = document.createElement('strong');
  headerCell.textContent = 'Hero';

  // 2. Second row: Background image (single cell)
  // Use first <img> (prefer inside <picture> if present)
  let bgImgCell = '';
  const imgs = element.querySelectorAll('img');
  if (imgs.length > 0) {
    const pic = imgs[0].closest('picture');
    bgImgCell = pic || imgs[0];
  }

  // 3. Third row: All text content as a block (headings, spans, ribbons, etc.), preserve DOM order
  // We'll collect all directly relevant text containers (h1-6, p, span) inside the element, in DOM order
  let textNodes = [];
  const walker = document.createTreeWalker(element, NodeFilter.SHOW_ELEMENT, null);
  let currentNode = walker.currentNode;
  while (currentNode) {
    const tag = currentNode.tagName;
    if ((/^H[1-6]$/i.test(tag) || tag === 'P' || tag === 'SPAN') && currentNode.textContent.trim()) {
      textNodes.push(currentNode);
    }
    currentNode = walker.nextNode();
  }
  // If nothing is found, fallback to a single cell with empty string
  if (textNodes.length === 0) {
    textNodes = [''];
  }

  // Compose the block table
  const cells = [
    [headerCell],
    [bgImgCell],
    [textNodes]
  ];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}

/* global WebImporter */
export default function parse(element, { document }) {
  // Block header as required
  const headerRow = ['Embed (embedVideo50)'];

  // Collect all immediate children to ensure we don't miss any structure or text
  const children = Array.from(element.childNodes);
  let cellContent = [];

  // Recursively extract all text content and inline structure, preserving element nodes
  function extractContent(node) {
    // If element node, keep it for richer presentation
    if (node.nodeType === Node.ELEMENT_NODE) {
      // If it's just a wrapper (div/span) with only text, just take text; else, keep the node
      const clone = node.cloneNode(true);
      return clone;
    } else if (node.nodeType === Node.TEXT_NODE) {
      // Plain text node
      if (node.textContent && node.textContent.trim().length > 0) {
        return node.textContent.trim();
      }
    }
    return null;
  }

  for (const child of children) {
    const content = extractContent(child);
    if (content) {
      cellContent.push(content);
    }
  }

  // Fallback: if nothing captured, try to get all text
  if (cellContent.length === 0) {
    const text = element.textContent.trim();
    if (text) cellContent = [text];
    else cellContent = [''];
  }

  const rows = [headerRow, [cellContent]];
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
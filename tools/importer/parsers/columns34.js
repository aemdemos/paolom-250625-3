/* global WebImporter */
export default function parse(element, { document }) {
  // Helper: Recursively collect all nodes (text, elements) for a column, converting video/iframe to links
  function collectNodes(parent) {
    const nodes = [];
    parent.childNodes.forEach(node => {
      if (node.nodeType === 3 && node.textContent.trim()) {
        nodes.push(document.createTextNode(node.textContent));
      } else if (node.nodeType === 1) {
        if ((node.tagName === 'VIDEO' || node.tagName === 'IFRAME') && node.src) {
          // Convert video/iframe to a link
          const a = document.createElement('a');
          a.href = node.src;
          a.textContent = node.src;
          nodes.push(a);
        } else {
          nodes.push(node);
        }
      }
    });
    return nodes;
  }

  // Find all immediate column divs
  const cols = Array.from(element.querySelectorAll(':scope > div'));
  let cells;
  if (cols.length === 2) {
    // Collect all content (including text/inlines) for each column
    const col1 = collectNodes(cols[0]);
    const col2 = collectNodes(cols[1]);
    // Fallback: if column is empty, include the container
    cells = [
      ['Columns (columns34)'],
      [col1.length ? col1 : [cols[0]], col2.length ? col2 : [cols[1]]]
    ];
  } else {
    // If not two columns, treat whole element as one column
    cells = [
      ['Columns (columns34)'],
      [[element]]
    ];
  }
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}

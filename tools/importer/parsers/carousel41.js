/* global WebImporter */
export default function parse(element, { document }) {
  // Header row as required by spec/example
  const headerRow = ['Carousel (carousel41)'];

  // Extract the image or picture element for the first cell
  const imageElem = element.querySelector('picture') || element.querySelector('img') || '';

  // For the text cell: collect ALL visible text (incl. headings, paragraphs, and direct text)
  // Ignore loader and media wrappers
  function extractTextCell(el) {
    // Exclude known non-text container wrappers
    const excludeSelectors = [
      'picture',
      'img',
      'svg',
      '.CircleLoader_circleLoader__gVbnN',
      '.HeroCard_loader__D56bX',
      '.HeroCard_mediaInnerWrapper__LvPO3',
      '.HeroCard_mediaInnerWrapperInner__ogGRk'
    ];
    const exclude = Array.from(el.querySelectorAll(excludeSelectors.join(',')));
    // Gather all heading, paragraph, and non-empty text nodes that are not inside exclude
    const textBlocks = [];
    // Headings
    for (const tag of ['h1','h2','h3','h4','h5','h6']) {
      const heading = el.querySelector(tag);
      if (heading && !exclude.includes(heading)) textBlocks.push(heading);
    }
    // Paragraphs
    const paragraphs = Array.from(el.querySelectorAll('p')).filter(p => !exclude.includes(p));
    textBlocks.push(...paragraphs);
    // Links (CTAs)
    const links = Array.from(el.querySelectorAll('a')).filter(a => !exclude.includes(a));
    textBlocks.push(...links);
    // Any direct, non-wrapped text nodes (not inside exclude)
    function getDirectTextNodes(node) {
      const nodes = [];
      node.childNodes.forEach(child => {
        if (exclude.some(exEl => exEl.contains(child))) return;
        if (child.nodeType === Node.TEXT_NODE && child.textContent.trim()) {
          nodes.push(child.textContent.trim());
        } else if (
          child.nodeType === Node.ELEMENT_NODE &&
          !exclude.includes(child) &&
          !['PICTURE','IMG','SVG'].includes(child.nodeName)
        ) {
          nodes.push(...getDirectTextNodes(child));
        }
      });
      return nodes;
    }
    const directText = getDirectTextNodes(el);
    if (directText.length) {
      const p = document.createElement('p');
      p.textContent = directText.join(' ');
      textBlocks.push(p);
    }
    // If nothing found, return empty string, else return as array
    return textBlocks.length ? textBlocks : '';
  }

  const textCell = extractTextCell(element);

  // Compose the table with the header row (1 cell) and a data row (2 cells)
  const cells = [
    headerRow,
    [imageElem, textCell]
  ];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}

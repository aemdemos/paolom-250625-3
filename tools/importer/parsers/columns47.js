/* global WebImporter */
export default function parse(element, { document }) {
  // Header row: only one cell
  const headerRow = ['Columns (columns47)'];

  // Get articles
  const articles = element.querySelectorAll(':scope > article');
  let textColumnContent = null;
  let toutsRow = [];

  // First article: text block
  if (articles[0]) {
    const textBlock = articles[0].querySelector('.StandaloneText_container__OjNQe') || articles[0];
    textColumnContent = textBlock;
  }

  // Second article: touts
  if (articles[1]) {
    const touts = articles[1].querySelectorAll('.tout');
    if (touts.length === 3) {
      toutsRow = [touts[0], touts[1], touts[2]];
    } else if (touts.length > 0) {
      toutsRow = Array.from(touts);
    } else {
      toutsRow = [articles[1]];
    }
  }

  // Compose row: always [textBlock, ...toutsRow]
  const columnsRow = [textColumnContent, ...toutsRow].filter(Boolean);

  // Ensure header row is a single-cell row, per spec
  const cells = [
    headerRow,
    columnsRow
  ];

  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}

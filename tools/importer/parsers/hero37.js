/* global WebImporter */
export default function parse(element, { document }) {
  // Find the hero article (text over image section)
  const heroArticle = element.querySelector('article');
  if (!heroArticle) return;

  // --- IMAGE ROW ---
  // Find the background image (flexible, any <img> inside a <picture> in the article)
  let bgImg = '';
  const pic = heroArticle.querySelector('picture');
  if (pic) {
    const img = pic.querySelector('img');
    if (img) bgImg = img;
  }

  // --- TEXT CONTENT ROW ---
  // Gather all text blocks that are NOT associated with the background image
  // Most likely candidates: direct children divs of heroArticle, or descendants with headings/spans/ps
  let textContentBlock = '';
  // Look for the largest div that has either a heading, span, or p
  const divs = Array.from(heroArticle.querySelectorAll('div'));
  let bestCandidate = null;
  let bestScore = 0;
  for (const div of divs) {
    // Score by how many of these elements are present
    let score = 0;
    score += div.querySelectorAll('h1, h2, h3, h4, h5, h6').length * 2;
    score += div.querySelectorAll('span').length;
    score += div.querySelectorAll('p').length;
    if (score > bestScore) {
      bestScore = score;
      bestCandidate = div;
    }
  }
  if (bestCandidate) {
    textContentBlock = bestCandidate;
  }

  // Compose the table: 1 column, 3 rows, header exactly as the example
  const cells = [
    ['Hero'],
    [bgImg],
    [textContentBlock],
  ];
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element
  element.replaceWith(table);
}
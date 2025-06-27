/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main background image: look for direct or nested <picture> or <img>
  let imageEl = element.querySelector('picture, img');
  if (!imageEl) {
    // Fallback: look for any picture or img inside
    const candidates = Array.from(element.querySelectorAll('*'));
    for (const cand of candidates) {
      if (cand.tagName.toLowerCase() === 'picture' || cand.tagName.toLowerCase() === 'img') {
        imageEl = cand;
        break;
      }
    }
  }

  // For this HTML, there is NO heading, subheading or CTA, so we leave the content row blank
  // Header must exactly match the markdown: 'Hero' (no formatting)
  const headerRow = ['Hero'];
  const imageRow = [imageEl ? imageEl : ''];
  const contentRow = [''];

  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    imageRow,
    contentRow
  ], document);

  element.replaceWith(table);
}

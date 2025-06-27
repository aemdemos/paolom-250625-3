/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to get background image from <img> with class 'SpeedBump_background__orxze'
  function getBackgroundImageEl(el) {
    const bgImg = el.querySelector('img.SpeedBump_background__orxze');
    if (bgImg) {
      // Prefer the closest <picture> for fidelity
      const picture = bgImg.closest('picture');
      if (picture) return picture;
      return bgImg;
    }
    return '';
  }

  // Helper to get content: heading, CTA as link
  function getContentEl(el) {
    const contentArr = [];
    // Look for a heading inside SpeedBump_content__ppNAQ
    const content = el.querySelector('.SpeedBump_content__ppNAQ');
    if (content) {
      // Get all headings (in case of variation)
      const heading = content.querySelector('h1, h2, h3, h4, h5, h6');
      if (heading) contentArr.push(heading);
      // Find a CTA button text (may be inside a <div>, but the parent <a> is outside block)
      const buttonText = content.querySelector('.Button_buttonText__Yzd9S');
      if (buttonText) {
        // The original link is the <a> wrapping the whole block
        const topLink = el.closest('a');
        let anchor = topLink;
        // If this element is not inside an <a>, try to find <a> wrapping the block
        if (!anchor) {
          anchor = el.querySelector('a[href]');
        }
        // If a link is found, output as an <a>
        if (anchor) {
          const link = document.createElement('a');
          link.href = anchor.getAttribute('href');
          link.textContent = buttonText.textContent.trim();
          contentArr.push(link);
        }
      }
    }
    return contentArr.length ? contentArr : '';
  }

  // Compose the table: 1 column, 3 rows
  const cells = [];
  // Header
  cells.push(['Hero']);
  // Background image (optional)
  const bgImgEl = getBackgroundImageEl(element);
  cells.push([bgImgEl]);
  // Content row (heading + CTA)
  const contentEls = getContentEl(element);
  cells.push([contentEls]);

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}

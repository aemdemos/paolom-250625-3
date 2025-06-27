/* global WebImporter */
export default function parse(element, { document }) {
  // Find the relevant <section> in the wrapper div
  const section = element.querySelector('section');
  if (!section) return;

  // Find the <article> containing the hero content
  const article = section.querySelector('article');
  if (!article) return;

  // Get the background image <img> (first img inside article background container)
  let backgroundImage = '';
  const backgroundImgEl = article.querySelector('.Pothole_backgroundContainer__Oy_34 img');
  if (backgroundImgEl) backgroundImage = backgroundImgEl;

  // Get the content container
  let content = '';
  const contentContainer = article.querySelector('.Pothole_contentContainer__e8d2t');
  if (contentContainer) {
    // Use the inner content block that has all the text/graphics (quote, logo/svg, label, etc)
    const lockup = contentContainer.querySelector('.PortableText_portableText__iCL6x');
    if (lockup) {
      content = lockup;
    } else {
      content = contentContainer;
    }
  }

  // Build the table according to the example
  const rows = [
    ['Hero'],
    [backgroundImage],
    [content],
  ];
  const block = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(block);
}

/* global WebImporter */
export default function parse(element, { document }) {
  // Extract the background image (img or picture)
  let backgroundImg = null;
  const backgroundContainer = element.querySelector('.Pothole_backgroundContainer__Oy_34');
  if (backgroundContainer) {
    const img = backgroundContainer.querySelector('img');
    if (img) {
      backgroundImg = img;
    } else {
      const picture = backgroundContainer.querySelector('picture');
      if (picture) backgroundImg = picture;
    }
  }

  // Extract the content block (contains heading/quote and attribution)
  let content = null;
  const contentContainer = element.querySelector('.Pothole_contentContainer__e8d2t');
  if (contentContainer) {
    content = contentContainer;
  }

  // Construct the table matching the example markdown (Header, Image, Content)
  const rows = [
    ['Hero'],
    [backgroundImg || ''],
    [content || '']
  ];

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}

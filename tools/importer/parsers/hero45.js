/* global WebImporter */
export default function parse(element, { document }) {
  // Locate the main hero/article container
  const hero = element.querySelector('article.Hero_hero__ZH8Mm');

  // 1. Extract background image (if present)
  let bgImg = null;
  if (hero) {
    const pic = hero.querySelector('.Hero_backgroundWrapper__s1VpK picture');
    if (pic) {
      const img = pic.querySelector('img');
      if (img) {
        bgImg = img;
      }
    }
  }

  // 2. Extract content: eyebrow (optional), h1, p (optional), button group (optional)
  let contentElements = [];
  if (hero) {
    const textBlock = hero.querySelector('.Hero_content___5zob');
    if (textBlock) {
      // Eyebrow (optional)
      const eyebrow = textBlock.querySelector('.PortableText_eyebrow__tGjcG');
      if (eyebrow) contentElements.push(eyebrow);
      // Heading (h1)
      const h1 = textBlock.querySelector('h1');
      if (h1) contentElements.push(h1);
      // Paragraph (optional)
      const p = textBlock.querySelector('p');
      if (p) contentElements.push(p);
      // Button group (optional)
      const btnGroup = textBlock.querySelector('.ButtonGroup_buttonGroup__IqHNF');
      if (btnGroup) contentElements.push(btnGroup);
    }
  }

  // Compose the block table as per markdown example (1 column, 3 rows: header, image, content)
  const rows = [
    ['Hero'],
    [bgImg ? bgImg : ''],
    [contentElements.length ? contentElements : '']
  ];
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}

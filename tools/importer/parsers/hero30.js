/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Table header: exactly as in the example
  const headerRow = ['Hero'];

  // 2. Find the background image (largest/most prominent <img> in the element)
  let bgImgContainer = '';
  const imgs = Array.from(element.querySelectorAll('img'));
  if (imgs.length > 0) {
    // Pick the largest img by area
    let bgImg = imgs[0];
    let maxArea = (parseInt(bgImg.getAttribute('width'))||0)*(parseInt(bgImg.getAttribute('height'))||0);
    imgs.forEach(img => {
      const area = (parseInt(img.getAttribute('width'))||0)*(parseInt(img.getAttribute('height'))||0);
      if(area > maxArea) {
        bgImg = img;
        maxArea = area;
      }
    });
    // Use the <picture> parent if available for best fidelity
    const pic = bgImg.closest('picture');
    bgImgContainer = pic ? pic : bgImg;
  }

  // 3. Find the block containing the heading, paragraph, and any CTA (all main text content)
  // Usually a div with a heading/paragraph under it
  let textBlock = null;
  const childDivs = Array.from(element.querySelectorAll(':scope > div'));
  for (const div of childDivs) {
    // Check if contains a heading or paragraph (not just layout dummy)
    if (div.querySelector('h1, h2, h3, h4, h5, h6, p')) {
      textBlock = div;
      break;
    }
  }
  // Fallback: if no such div, use first heading or paragraph in the element
  if (!textBlock) {
    const fallback = element.querySelector('h1, h2, h3, h4, h5, h6, p');
    if (fallback) textBlock = fallback;
  }

  // 4. Compose the cells array as [header], [image], [all text content]
  const cells = [
    headerRow,
    [bgImgContainer ? bgImgContainer : ''],
    [textBlock ? textBlock : '']
  ];

  // 5. Create the table and replace the element
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}

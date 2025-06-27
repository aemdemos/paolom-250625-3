/* global WebImporter */
export default function parse(element, { document }) {
  // Build the header row as in the markdown example
  const headerRow = ['Hero'];

  // There is no background image as a direct <img> in the HTML, so this cell is empty, per markdown
  const imageRow = [''];

  // Collect prominent text content: headline, subheading, button, and supporting text
  const contentEls = [];
  
  // Left column: Typically contains eyebrow, heading, and button
  const left = element.querySelector('.SideBySideItem_titleContent__7NPFH');
  if (left) {
    // Eyebrow (optional)
    const eyebrow = left.querySelector('.PortableText_eyebrow__tGjcG');
    if (eyebrow) contentEls.push(eyebrow);
    // Heading (optional)
    const heading = left.querySelector('h2');
    if (heading) contentEls.push(heading);
    // CTA button (optional)
    const btn = left.querySelector('a');
    if (btn) contentEls.push(btn);
  }

  // Right column: Secondary heading and paragraph (optional)
  const right = element.querySelector('.title5SideBySide_content__wN3xA');
  if (right) {
    // Secondary heading (optional)
    const subheading = right.querySelector('h2');
    if (subheading) contentEls.push(subheading);
    // Paragraph (optional)
    const para = right.querySelector('p');
    if (para) contentEls.push(para);
  }

  // Build the block table
  const cells = [
    headerRow,
    imageRow,
    [contentEls],
  ];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}

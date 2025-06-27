/* global WebImporter */
export default function parse(element, { document }) {
  // Compose the Hero block table as in the example: 1 col, 3 rows
  // 1st row: Header row with 'Hero'
  // 2nd row: (background image) - no image in current HTML, so empty
  // 3rd row: Heading, subheading, and touts

  // Find the main content block (eyebrow, heading, paragraph)
  const contentBlock = element.querySelector(
    '.PortableText_portableText__iCL6x.SideBySideItem_content__UZ90N'
  );
  let eyebrow = '', heading = '', paragraph = '';
  if (contentBlock) {
    eyebrow = contentBlock.querySelector('.PortableText_eyebrow__tGjcG') || '';
    heading = contentBlock.querySelector('h2') || '';
    paragraph = contentBlock.querySelector('p') || '';
  }

  // Find all touts (each tout is a vertical stack of h3 + p)
  const toutsContainer = element.querySelector(
    '.Touts_touts__tzgjP, .SideBySideItem_touts__FcLGL'
  );
  let toutFrags = [];
  if (toutsContainer) {
    const toutElements = toutsContainer.querySelectorAll('.tout');
    toutFrags = Array.from(toutElements).map(tout => {
      const frag = document.createDocumentFragment();
      const h3 = tout.querySelector('h3');
      const p = tout.querySelector('p');
      if (h3) frag.appendChild(h3);
      if (p) frag.appendChild(p);
      return frag;
    });
  }

  // Compose the main content fragment for the third row
  const contentFrag = document.createDocumentFragment();
  if (eyebrow) contentFrag.appendChild(eyebrow);
  if (heading) contentFrag.appendChild(heading);
  if (paragraph) contentFrag.appendChild(paragraph);
  toutFrags.forEach(frag => {
    // Add a <br> for separation before each tout if there is content before
    if (contentFrag.childNodes.length) contentFrag.appendChild(document.createElement('br'));
    contentFrag.appendChild(frag);
  });

  // Compose table rows
  const headerRow = ['Hero'];
  const imageRow = [''];
  const contentRow = [contentFrag];

  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    imageRow,
    contentRow
  ], document);
  
  element.replaceWith(table);
}

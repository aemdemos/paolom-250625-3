/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main hero inner container
  const heroInner = element.querySelector('.HeroScreen_heroInner__GYU4u');
  if (!heroInner) return;

  // Find the content block with headings etc.
  const contentBlock = heroInner.querySelector('.PortableText_portableText__iCL6x, .HeroScreen_content__wfE72, .title1Block_content__qDSDj, .TextLockup_content__gliM2');

  // Find the image (background asset), if any
  let image = null;
  const mediaWrapper = heroInner.querySelector('.HeroScreen_mediaWrapper__iClXg');
  if (mediaWrapper) {
    const img = mediaWrapper.querySelector('img');
    if (img) image = img;
  }

  // Compose block table (3 rows, 1 column)
  // 1. header row: 'Hero'
  // 2. image row (may be empty)
  // 3. content row (may be empty)
  const cells = [
    ['Hero'],
    [image ? image : ''],
    [contentBlock ? contentBlock : '']
  ];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  // Replace the original element with this table
  element.replaceWith(table);
}

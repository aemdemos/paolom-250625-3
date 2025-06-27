/* global WebImporter */
export default function parse(element, { document }) {
  // Get background image element if present
  let img = null;
  const picture = element.querySelector('picture');
  if (picture) {
    img = picture.querySelector('img');
  }

  // Get the main content block (usually left text area)
  // Should select the block containing span, heading, and paragraph
  let contentBlock = null;
  // Look for a div with a class containing 'TextOverImage_content__' or 'TextLockup_content__' or 'PortableText_portableText__'
  contentBlock = element.querySelector(
    '.TextOverImage_content__JSA70, .TextLockup_content__gliM2, .PortableText_portableText__iCL6x'
  );
  // fallback to any .PortableText_portableText__*
  if (!contentBlock) {
    contentBlock = element.querySelector('[class*="PortableText_portableText__"]');
  }

  // Gather content elements (span, h1/h2/h3, p, in DOM order)
  let contentElems = [];
  if (contentBlock) {
    contentElems = Array.from(contentBlock.children).filter(el => {
      const tag = el.tagName.toLowerCase();
      return (
        tag === 'span' ||
        tag === 'h1' ||
        tag === 'h2' ||
        tag === 'h3' ||
        tag === 'h4' ||
        tag === 'p'
      );
    });
  }
  // if no content found, leave cell empty
  const textCellContent = contentElems.length ? contentElems : [''];

  // Build the table as per block spec and example: 1 column, 3 rows
  // 1st row: 'Hero' (no bold, no markdown)
  // 2nd row: background image element (or '')
  // 3rd row: all content elements (text, heading, subheading, eyebrow)
  const rows = [
    ['Hero'],
    [img || ''],
    [textCellContent],
  ];

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}

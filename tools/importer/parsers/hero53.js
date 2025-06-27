/* global WebImporter */
export default function parse(element, { document }) {
  // Only one block table per the example. No Section Metadata present.
  // Gather content blocks (mainly two divs, left for text, right for image if exists)
  const blocks = element.querySelectorAll(':scope > div');
  // Prepare array to accumulate hero body content (heading, subheading, paragraph, etc)
  const textContent = [];
  blocks.forEach(block => {
    Array.from(block.children).forEach(child => {
      // Only include headings, paragraphs, and eyebrow/spans
      if (/^(H1|H2|H3|H4|P|SPAN)$/i.test(child.tagName)) {
        textContent.push(child);
      }
    });
  });
  // Row 2 is for the background image, which is not present in the source HTML
  // (it's handled by CSS, not as an <img>), so we leave it empty as in the example
  const cells = [
    ['Hero'],
    [''],
    [textContent],
  ];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}

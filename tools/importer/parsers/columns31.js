/* global WebImporter */
export default function parse(element, { document }) {
  // This element is only a decorative visual background (footer glow), not content.
  // There is no user or semantic content to extract, nor is there a block table in the example for this element.
  // Remove the element, do not replace with a block table.
  element.remove();
}
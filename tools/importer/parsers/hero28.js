/* global WebImporter */
export default function parse(element, { document }) {
  // Hero block: 1 column, 3 rows. Row 1: 'Hero', Row 2: image (if any), Row 3: heading, subheading, etc

  // 1. Header row (must be exactly as in example)
  const headerRow = ['Hero'];

  // 2. Background image row: try to find a hero/decorative image. We prioritize the Tube_asset (decorative bg), else Tube_ball (if nothing else)
  let imageEl = null;
  const assetImg = element.querySelector('img.Tube_asset__FVEoH');
  const ballImg = element.querySelector('img.Tube_ball__GKDb3');
  if (assetImg) {
    imageEl = assetImg;
  } else if (ballImg) {
    imageEl = ballImg;
  }
  // If no image, cell should be empty string (matches empty row in markdown example)
  const imageRow = [imageEl ? imageEl : ''];

  // 3. Text content row: heading, subheading, signature, etc.
  // In the provided HTML, text is in .WebglText_textElements__ZemSt > .PortableText_portableText__iCL6x
  let textContent = [];
  const textContainer = element.querySelector('.WebglText_textElements__ZemSt .PortableText_portableText__iCL6x');
  if (textContainer) {
    // push all children that are visible and relevant: headings, paragraphs, label (signature), etc.
    // We'll collect h1-h4, p, and any span.typography_label__CkNI3
    textContainer.childNodes.forEach((node) => {
      if (node.nodeType === Node.ELEMENT_NODE) {
        // skip empty p
        if (node.tagName.toLowerCase() === 'p' && node.textContent.trim() === '') return;
        textContent.push(node);
      }
    });
  }
  // In case textContainer didn't exist, fallback to whatever is in .WebglText_textElements__ZemSt
  if (textContent.length === 0) {
    const fallback = element.querySelector('.WebglText_textElements__ZemSt');
    if (fallback) {
      fallback.childNodes.forEach((node) => {
        if (node.nodeType === Node.ELEMENT_NODE && node.textContent.trim()) {
          textContent.push(node);
        }
      });
    }
  }
  const textRow = [textContent.length > 0 ? textContent : ''];

  // Compose rows in order
  const cells = [headerRow, imageRow, textRow];

  // Create the block table
  const table = WebImporter.DOMUtils.createTable(cells, document);
  // Replace original element
  element.replaceWith(table);
}

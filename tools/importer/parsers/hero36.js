/* global WebImporter */
export default function parse(element, { document }) {
  // Find the tube decorative background (tubes, balls, etc)
  const tubeWrapper = element.querySelector('.HeroTube_tubeWrapper__D5OQd');
  // Find the floating video preview (which visually is a background element here)
  const floatingVideoPreview = element.querySelector('.FloatingVideoPreview_floatingVideoPreviewWrapper__IJgA2');

  // Compose the background row contents
  const backgroundCell = [];
  if (tubeWrapper) backgroundCell.push(tubeWrapper);
  if (floatingVideoPreview) backgroundCell.push(floatingVideoPreview);
  if (backgroundCell.length === 0) backgroundCell.push('');

  // Find the hero text wrapper (centered headline, subheading, CTA)
  const heroTextWrapper = element.querySelector('.HeroTube_textWrapper__rHSoE');
  // If not found, fallback to any direct child text lockup
  let contentCell = '';
  if (heroTextWrapper) {
    contentCell = heroTextWrapper;
  } else {
    // fallback: find a h1 or h2 directly
    const headline = element.querySelector('h1, h2');
    contentCell = headline ? headline : '';
  }

  // Compose the table as per the block spec
  const cells = [
    ['Hero'],
    [backgroundCell.length === 1 ? backgroundCell[0] : backgroundCell],
    [contentCell],
  ];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}

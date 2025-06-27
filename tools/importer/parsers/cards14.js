/* global WebImporter */
export default function parse(element, { document }) {
  const cells = [['Cards (cards14)']];
  const cardButtons = element.querySelectorAll('.TileTable_groupItem__0GEGu');

  cardButtons.forEach(button => {
    // Icon: always present
    const icon = button.querySelector('.LogoTextItem_iconWrapper__76ogg');

    // Find the text content block (label/title + any description + links)
    // This is usually in .LogoTextItem_labelWrapper__6MRlp or its parent
    let textRoot = button.querySelector('.LogoTextItem_labelWrapper__6MRlp');
    // fallback: if not found, use the whole .LogoTextItem_logoTextItem__gD_il
    if (!textRoot) {
      textRoot = button.querySelector('.LogoTextItem_logoTextItem__gD_il');
    }
    // Defensive: if still not found, fallback to button
    if (!textRoot) {
      textRoot = button;
    }

    // Compose the text column: strong label/title + all siblings (for possible descriptions/CTAs)
    // Find the label element
    let labelEl = textRoot.querySelector('.LogoTextItem_label__tJ9F_') || textRoot.querySelector('p');
    let label = '';
    if (labelEl) label = labelEl.textContent.trim();

    // Start with <strong>Label</strong>
    const textBlock = document.createElement('div');
    if (label) {
      const strong = document.createElement('strong');
      strong.textContent = label;
      textBlock.appendChild(strong);
    }
    // Now, add any sibling nodes after labelEl in textRoot (for description, links, etc)
    if (labelEl) {
      let next = labelEl.nextSibling;
      while (next) {
        if (next.nodeType === Node.ELEMENT_NODE || (next.nodeType === Node.TEXT_NODE && next.textContent.trim())) {
          textBlock.appendChild(next.cloneNode(true));
        }
        next = next.nextSibling;
      }
    }

    // Also, check for extra children in textRoot after labelEl (may be multiple paragraphs or links)
    // For resilience, include all children of textRoot except for the label itself
    Array.from(textRoot.children).forEach(child => {
      if (child !== labelEl && !textBlock.contains(child)) {
        textBlock.appendChild(child.cloneNode(true));
      }
    });

    cells.push([icon, textBlock]);
  });
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}

/* global WebImporter */
export default function parse(element, { document }) {
  // Create the header row matching the example
  const headerRow = ['Cards (cardsNoImages5)'];
  const rows = [headerRow];

  // Each button is a card; extract all content meaningfully
  const cardButtons = element.querySelectorAll(':scope > button');

  cardButtons.forEach((btn) => {
    // Get the text label (for heading)
    const label = btn.querySelector(
      '.LogoTextItem_label__tJ9F_, .LogoTextItem_labelWrapper__6MRlp p'
    );
    // Compose cell content
    let cellContent = [];
    if (label) {
      const strong = document.createElement('strong');
      strong.textContent = label.textContent.trim();
      cellContent.push(strong);
    } else {
      // fallback: use all text
      const fallbackText = btn.textContent.trim();
      if (fallbackText) {
        const strong = document.createElement('strong');
        strong.textContent = fallbackText;
        cellContent.push(strong);
      }
    }
    // If there was additional descriptive text it would be added here.
    // The given HTML does not have more than the label, so none is added.
    rows.push([cellContent]);
  });

  // Create and replace with the new table
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}

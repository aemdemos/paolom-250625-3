/* global WebImporter */
export default function parse(element, { document }) {
  // Get all pricing card elements, representing columns
  const cards = Array.from(element.querySelectorAll(':scope > .PricingUpgradeCard_container__rQnTF'));

  // The header row must be a single cell per example!
  const headerRow = ['Columns (columns17)'];

  // Each card's content goes into one column in the second row
  const contentRow = cards.map(card => {
    // Get the main content block inside each card
    const content = card.querySelector('.PricingUpgradeCard_content__R4tVK');
    return content || card;
  });

  // Compose the table: header (one cell), row of card contents (n cells)
  const tableRows = [
    headerRow,
    contentRow,
  ];

  // Create the table block
  const block = WebImporter.DOMUtils.createTable(tableRows, document);

  // Replace original element
  element.replaceWith(block);
}

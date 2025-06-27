/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Create the table header row, exactly as in the example
  const headerRow = ['Hero'];

  // 2. Background image row - this example has no background image, so it's a blank row
  const imageRow = [''];

  // 3. Content row: Get heading and button group, referencing DOM nodes directly
  // Get heading (h1/h2/h3 etc. in order of importance)
  let heading = element.querySelector('h1, h2, h3, h4, h5, h6');

  // Get ButtonGroup (the row of CTAs)
  // Try to select direct child divs for robustness
  let buttonGroup = null;
  const directDivs = Array.from(element.children).filter(c => c.tagName === 'DIV');
  for (const div of directDivs) {
    if (div.className && div.className.match(/ButtonGroup|buttonGroup|ButtonGroup_buttonGroup/)) {
      buttonGroup = div;
      break;
    }
  }
  if (!buttonGroup) {
    // fallback: try to find any div with a Button inside (handles variations)
    buttonGroup = element.querySelector('div:has(a.Button_glass__B8SwH), div:has(a.Button_ghost__ohs7M)');
  }
  // Compose contentItems for the content cell
  const contentItems = [];
  if (heading) contentItems.push(heading);
  if (buttonGroup) contentItems.push(buttonGroup);
  // If both are missing, use an empty string so the table cell is not empty
  const contentRow = [contentItems.length ? contentItems : ['']];

  // Build the table as per the example: 1 column, 3 rows
  const cells = [
    headerRow,
    imageRow,
    contentRow,
  ];

  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the generated table
  element.replaceWith(table);
}

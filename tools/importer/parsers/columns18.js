/* global WebImporter */
export default function parse(element, { document }) {
  // The header row must have exactly one column
  const headerRow = ['Columns (columns18)'];

  // Extract the heading cell (Compare plans)
  const headingDiv = element.querySelector('.PricingTable_heading__w4Kln');
  let headingCell = null;
  if (headingDiv) {
    headingCell = headingDiv;
  } else {
    // fallback: use first child
    headingCell = element.firstElementChild;
  }

  // Extract each plan column (Free, Pro, Team, Enterprise)
  const plansWrapper = element.querySelector('.PricingTable_desktopPlanHeadersWrapper__jeCrh');
  let planCells = [];
  if (plansWrapper) {
    planCells = Array.from(plansWrapper.querySelectorAll(':scope > .PricingTable_desktopPlanHeaders__0vNJY'));
  }

  // The content row is an array: [headingCell, ...planCells]
  const contentRow = [headingCell, ...planCells];

  // Only proceed if we have at least 2 columns (heading + 1 plan)
  if (contentRow.length < 2) return;

  // The table structure: header row (1 cell), then content row (multiple columns)
  const table = WebImporter.DOMUtils.createTable([
    headerRow,      // header: ['Columns (columns18)']
    contentRow      // content row: [heading, plan1, plan2, ...]
  ], document);
  element.replaceWith(table);
}

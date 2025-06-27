/* global WebImporter */
export default function parse(element, { document }) {
  // Prepare the header row as per requirements
  const headerRow = ['Accordion'];
  const rows = [headerRow];

  // Select all immediate accordion items
  const items = element.querySelectorAll(':scope > .AccordionItem_accordionItem__XkZ99, :scope > .FaqItem_faqItem__HfaUX');

  items.forEach(item => {
    // Get the title cell: the button, but without the SVG icon
    const button = item.querySelector('button');
    let titleCell = '';
    if (button) {
      // Directly use the button, but remove any <svg> icons from it
      button.querySelectorAll('svg').forEach(svg => svg.remove());
      titleCell = button;
    }

    // Get the content cell: the accordion body content
    const contentDiv = item.querySelector('.AccordionItem_content__ELCKA, .FaqItem_answer__77Dqo');
    let contentCell = '';
    if (contentDiv) {
      // Look for the most relevant child: prefer a .PortableText_portableText__iCL6x,
      // else find the first paragraph, else fallback to the contentDiv itself
      const portable = contentDiv.querySelector('.PortableText_portableText__iCL6x');
      if (portable) {
        contentCell = portable;
      } else {
        const p = contentDiv.querySelector('p');
        if (p) {
          contentCell = p;
        } else {
          // As a last resort, reference the entire contentDiv
          contentCell = contentDiv;
        }
      }
    }
    rows.push([titleCell, contentCell]);
  });

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}

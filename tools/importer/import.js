/*
 * Copyright 2024 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */
/* global WebImporter */
/* eslint-disable no-console */
import embedVideo3Parser from './parsers/embedVideo3.js';
import hero8Parser from './parsers/hero8.js';
import columns2Parser from './parsers/columns2.js';
import cardsNoImages5Parser from './parsers/cardsNoImages5.js';
import hero1Parser from './parsers/hero1.js';
import hero7Parser from './parsers/hero7.js';
import hero11Parser from './parsers/hero11.js';
import hero4Parser from './parsers/hero4.js';
import columns17Parser from './parsers/columns17.js';
import hero19Parser from './parsers/hero19.js';
import columns12Parser from './parsers/columns12.js';
import hero6Parser from './parsers/hero6.js';
import hero16Parser from './parsers/hero16.js';
import accordion20Parser from './parsers/accordion20.js';
import hero22Parser from './parsers/hero22.js';
import hero27Parser from './parsers/hero27.js';
import columns15Parser from './parsers/columns15.js';
import hero26Parser from './parsers/hero26.js';
import cards29Parser from './parsers/cards29.js';
import embedVideo23Parser from './parsers/embedVideo23.js';
import columns31Parser from './parsers/columns31.js';
import hero30Parser from './parsers/hero30.js';
import columns18Parser from './parsers/columns18.js';
import hero28Parser from './parsers/hero28.js';
import embedVideo35Parser from './parsers/embedVideo35.js';
import hero33Parser from './parsers/hero33.js';
import hero38Parser from './parsers/hero38.js';
import hero37Parser from './parsers/hero37.js';
import hero40Parser from './parsers/hero40.js';
import hero36Parser from './parsers/hero36.js';
import cards39Parser from './parsers/cards39.js';
import columns24Parser from './parsers/columns24.js';
import hero43Parser from './parsers/hero43.js';
import hero44Parser from './parsers/hero44.js';
import carousel41Parser from './parsers/carousel41.js';
import hero46Parser from './parsers/hero46.js';
import hero45Parser from './parsers/hero45.js';
import columns47Parser from './parsers/columns47.js';
import carousel21Parser from './parsers/carousel21.js';
import columns34Parser from './parsers/columns34.js';
import hero51Parser from './parsers/hero51.js';
import hero52Parser from './parsers/hero52.js';
import hero53Parser from './parsers/hero53.js';
import embedVideo54Parser from './parsers/embedVideo54.js';
import hero55Parser from './parsers/hero55.js';
import embedVideo57Parser from './parsers/embedVideo57.js';
import hero56Parser from './parsers/hero56.js';
import hero59Parser from './parsers/hero59.js';
import cards32Parser from './parsers/cards32.js';
import hero60Parser from './parsers/hero60.js';
import hero61Parser from './parsers/hero61.js';
import hero62Parser from './parsers/hero62.js';
import hero64Parser from './parsers/hero64.js';
import columns49Parser from './parsers/columns49.js';
import hero65Parser from './parsers/hero65.js';
import columns63Parser from './parsers/columns63.js';
import columns67Parser from './parsers/columns67.js';
import cardsNoImages66Parser from './parsers/cardsNoImages66.js';
import columns58Parser from './parsers/columns58.js';
import columns42Parser from './parsers/columns42.js';
import embedVideo50Parser from './parsers/embedVideo50.js';
import tableStripedBordered10Parser from './parsers/tableStripedBordered10.js';
import tableStripedBordered9Parser from './parsers/tableStripedBordered9.js';
import cards14Parser from './parsers/cards14.js';
import cardsNoImages48Parser from './parsers/cardsNoImages48.js';
import headerParser from './parsers/header.js';
import metadataParser from './parsers/metadata.js';
import cleanupTransformer from './transformers/cleanup.js';
import imageTransformer from './transformers/images.js';
import linkTransformer from './transformers/links.js';
import { TransformHook } from './transformers/transform.js';
import {
  generateDocumentPath,
  handleOnLoad,
  TableBuilder,
  mergeInventory,
} from './import.utils.js';

const parsers = {
  metadata: metadataParser,
  embedVideo3: embedVideo3Parser,
  hero8: hero8Parser,
  columns2: columns2Parser,
  cardsNoImages5: cardsNoImages5Parser,
  hero1: hero1Parser,
  hero7: hero7Parser,
  hero11: hero11Parser,
  hero4: hero4Parser,
  columns17: columns17Parser,
  hero19: hero19Parser,
  columns12: columns12Parser,
  hero6: hero6Parser,
  hero16: hero16Parser,
  accordion20: accordion20Parser,
  hero22: hero22Parser,
  hero27: hero27Parser,
  columns15: columns15Parser,
  hero26: hero26Parser,
  cards29: cards29Parser,
  embedVideo23: embedVideo23Parser,
  columns31: columns31Parser,
  hero30: hero30Parser,
  columns18: columns18Parser,
  hero28: hero28Parser,
  embedVideo35: embedVideo35Parser,
  hero33: hero33Parser,
  hero38: hero38Parser,
  hero37: hero37Parser,
  hero40: hero40Parser,
  hero36: hero36Parser,
  cards39: cards39Parser,
  columns24: columns24Parser,
  hero43: hero43Parser,
  hero44: hero44Parser,
  carousel41: carousel41Parser,
  hero46: hero46Parser,
  hero45: hero45Parser,
  columns47: columns47Parser,
  carousel21: carousel21Parser,
  columns34: columns34Parser,
  hero51: hero51Parser,
  hero52: hero52Parser,
  hero53: hero53Parser,
  embedVideo54: embedVideo54Parser,
  hero55: hero55Parser,
  embedVideo57: embedVideo57Parser,
  hero56: hero56Parser,
  hero59: hero59Parser,
  cards32: cards32Parser,
  hero60: hero60Parser,
  hero61: hero61Parser,
  hero62: hero62Parser,
  hero64: hero64Parser,
  columns49: columns49Parser,
  hero65: hero65Parser,
  columns63: columns63Parser,
  columns67: columns67Parser,
  cardsNoImages66: cardsNoImages66Parser,
  columns58: columns58Parser,
  columns42: columns42Parser,
  embedVideo50: embedVideo50Parser,
  tableStripedBordered10: tableStripedBordered10Parser,
  tableStripedBordered9: tableStripedBordered9Parser,
  cards14: cards14Parser,
  cardsNoImages48: cardsNoImages48Parser,
};

const transformers = {
  cleanup: cleanupTransformer,
  images: imageTransformer,
  links: linkTransformer,
};

WebImporter.Import = {
  findSiteUrl: (instance, siteUrls) => (
    siteUrls.find(({ id }) => id === instance.urlHash)
  ),
  transform: (hookName, element, payload) => {
    // perform any additional transformations to the page
    Object.entries(transformers).forEach(([, transformerFn]) => (
      transformerFn.call(this, hookName, element, payload)
    ));
  },
  getParserName: ({ name, key }) => key || name,
  getElementByXPath: (document, xpath) => {
    const result = document.evaluate(
      xpath,
      document,
      null,
      XPathResult.FIRST_ORDERED_NODE_TYPE,
      null,
    );
    return result.singleNodeValue;
  },
  getFragmentXPaths: (
    { urls = [], fragments = [] },
    sourceUrl = '',
  ) => (fragments.flatMap(({ instances = [] }) => instances)
    .filter((instance) => {
      // find url in urls array
      const siteUrl = WebImporter.Import.findSiteUrl(instance, urls);
      if (!siteUrl) {
        return false;
      }
      return siteUrl.url === sourceUrl;
    })
    .map(({ xpath }) => xpath)),
};

const pageElements = [{ name: 'metadata' }];

/**
* Page transformation function
*/
function transformPage(main, { inventory, ...source }) {
  const { urls = [], blocks: inventoryBlocks = [] } = inventory;
  const { document, params: { originalURL } } = source;

  // get fragment elements from the current page
  const fragmentElements = WebImporter.Import.getFragmentXPaths(inventory, originalURL)
    .map((xpath) => WebImporter.Import.getElementByXPath(document, xpath))
    .filter((el) => el);

  // get dom elements for each block on the current page
  const blockElements = inventoryBlocks
    .flatMap((block) => block.instances
      .filter((instance) => WebImporter.Import.findSiteUrl(instance, urls)?.url === originalURL)
      .map((instance) => ({
        ...block,
        element: WebImporter.Import.getElementByXPath(document, instance.xpath),
      })))
    .filter((block) => block.element);

  // remove fragment elements from the current page
  fragmentElements.forEach((element) => {
    if (element) {
      element.remove();
    }
  });

  // before page transform hook
  WebImporter.Import.transform(TransformHook.beforePageTransform, main, { ...source });

  const tableBuilder = TableBuilder(WebImporter.DOMUtils.createTable);
  // transform all block elements using parsers
  [...pageElements, ...blockElements].forEach(({ element = main, ...pageBlock }) => {
    const parserName = WebImporter.Import.getParserName(pageBlock);
    const parserFn = parsers[parserName];
    if (!parserFn) return;
    try {
      // before parse hook
      WebImporter.Import.transform(TransformHook.beforeParse, element, { ...source });
      // parse the element
      WebImporter.DOMUtils.createTable = tableBuilder.build(parserName);
      parserFn.call(this, element, { ...source });
      WebImporter.DOMUtils.createTable = tableBuilder.restore();
      // after parse hook
      WebImporter.Import.transform(TransformHook.afterParse, element, { ...source });
    } catch (e) {
      console.warn(`Failed to parse block: ${pageBlock.key}`, e);
    }
  });
}

/**
* Fragment transformation function
*/
function transformFragment(main, { fragment, inventory, ...source }) {
  const { document, params: { originalURL } } = source;

  if (fragment.name === 'nav') {
    const navEl = document.createElement('div');

    // get number of blocks in the nav fragment
    const navBlocks = Math.floor(fragment.instances.length / fragment.instances.filter((ins) => ins.uuid.includes('-00-')).length);
    console.log('navBlocks', navBlocks);

    for (let i = 0; i < navBlocks; i += 1) {
      const { xpath } = fragment.instances[i];
      const el = WebImporter.Import.getElementByXPath(document, xpath);
      if (!el) {
        console.warn(`Failed to get element for xpath: ${xpath}`);
      } else {
        navEl.append(el);
      }
    }

    // body width
    const bodyWidthAttr = document.body.getAttribute('data-hlx-imp-body-width');
    const bodyWidth = bodyWidthAttr ? parseInt(bodyWidthAttr, 10) : 1000;

    try {
      const headerBlock = headerParser(navEl, {
        ...source, document, fragment, bodyWidth,
      });
      main.append(headerBlock);
    } catch (e) {
      console.warn('Failed to parse header block', e);
    }
  } else {
    const tableBuilder = TableBuilder(WebImporter.DOMUtils.createTable);

    (fragment.instances || [])
      .filter((instance) => {
        const siteUrl = WebImporter.Import.findSiteUrl(instance, inventory.urls);
        if (!siteUrl) {
          return false;
        }
        return `${siteUrl.url}#${fragment.name}` === originalURL;
      })
      .map(({ xpath }) => ({
        xpath,
        element: WebImporter.Import.getElementByXPath(document, xpath),
      }))
      .filter(({ element }) => element)
      .forEach(({ xpath, element }) => {
        main.append(element);

        const fragmentBlock = inventory.blocks
          .find(({ instances }) => instances.find((instance) => {
            const siteUrl = WebImporter.Import.findSiteUrl(instance, inventory.urls);
            return `${siteUrl.url}#${fragment.name}` === originalURL && instance.xpath === xpath;
          }));

        if (!fragmentBlock) return;
        const parserName = WebImporter.Import.getParserName(fragmentBlock);
        const parserFn = parsers[parserName];
        if (!parserFn) return;
        try {
          WebImporter.DOMUtils.createTable = tableBuilder.build(parserName);
          parserFn.call(this, element, source);
          WebImporter.DOMUtils.createTable = tableBuilder.restore();
        } catch (e) {
          console.warn(`Failed to parse block: ${fragmentBlock.key}, with xpath: ${xpath}`, e);
        }
      });
  }
}

export default {
  onLoad: async (payload) => {
    await handleOnLoad(payload);
  },

  transform: async (source) => {
    const { document, params: { originalURL } } = source;

    // sanitize the original URL
    /* eslint-disable no-param-reassign */
    source.params.originalURL = new URL(originalURL).href;

    /* eslint-disable-next-line prefer-const */
    let publishUrl = window.location.origin;
    // $$publishUrl = '{{{publishUrl}}}';

    let inventory = null;
    // $$inventory = {{{inventory}}};
    if (!inventory) {
      const siteUrlsUrl = new URL('/tools/importer/site-urls.json', publishUrl);
      const inventoryUrl = new URL('/tools/importer/inventory.json', publishUrl);
      try {
        // fetch and merge site-urls and inventory
        const siteUrlsResp = await fetch(siteUrlsUrl.href);
        const inventoryResp = await fetch(inventoryUrl.href);
        const siteUrls = await siteUrlsResp.json();
        inventory = await inventoryResp.json();
        inventory = mergeInventory(siteUrls, inventory, publishUrl);
      } catch (e) {
        console.error('Failed to merge site-urls and inventory');
      }
      if (!inventory) {
        return [];
      }
    }

    let main = document.body;

    // before transform hook
    WebImporter.Import.transform(TransformHook.beforeTransform, main, { ...source, inventory });

    // perform the transformation
    let path = null;
    const sourceUrl = new URL(originalURL);
    const fragName = sourceUrl.hash ? sourceUrl.hash.substring(1) : '';
    if (fragName) {
      // fragment transformation
      const fragment = inventory.fragments.find(({ name }) => name === fragName);
      if (!fragment) {
        return [];
      }
      main = document.createElement('div');
      transformFragment(main, { ...source, fragment, inventory });
      path = fragment.path;
    } else {
      // page transformation
      transformPage(main, { ...source, inventory });
      path = generateDocumentPath(source, inventory);
    }

    // after transform hook
    WebImporter.Import.transform(TransformHook.afterTransform, main, { ...source, inventory });

    return [{
      element: main,
      path,
    }];
  },
};

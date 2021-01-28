export const hashRE = /#.*$/;
export const extRE = /\.(md|html)$/;
export const endingSlashRE = /\/$/;
export const outboundRE = /^[a-z]+:/i;

export function normalize(path) {
  return decodeURI(path)
    .replace(hashRE, '')
    .replace(extRE, '')
}

export function isExternal(path) {
  return outboundRE.test(path)
}

export function isMailto(path) {
  return /^mailto:/.test(path)
}

export function isTel(path) {
  return /^tel:/.test(path)
}

export function ensureExt(path) {
  if (isExternal(path)) {
    return path
  }
  console.log(path);
  const hashMatch = path.match(hashRE)
  const hash = hashMatch ? hashMatch[0] : ''
  const normalized = normalize(path)

  if (endingSlashRE.test(normalized)) {
    return path
  }
  return normalized + '.html' + hash
}

/**
 * @param { Page } page
 * @param { string } regularPath
 * @param { SiteData } site
 * @param { string } localePath
 * @returns { SidebarGroup }
 */
export function resolveSidebarItems(page, regularPath, site, localePath) {
  const { pages, themeConfig } = site;

  const localeConfig = localePath && themeConfig.locales
    ? themeConfig.locales[localePath] || themeConfig
    : themeConfig;

  const pageSidebarConfig = page.frontmatter.sidebar || localeConfig.sidebar || themeConfig.sidebar;
  if (pageSidebarConfig === 'auto') {
    return resolveHeaders(page);
  }

  const sidebarConfig = localeConfig.sidebar || themeConfig.sidebar;
  if (!sidebarConfig) {
    return [];
  } else {
    const { base, config } = resolveMatchingConfig(regularPath, sidebarConfig);
    if (config === 'auto') {
      return resolveHeaders(page);
    }
    return config
      ? config.map(item => resolveItem(item, pages, base))
      : [];
  }
}

/**
 * @param { Page } page
 * @returns { SidebarGroup }
 */
function resolveHeaders(page) {
  const headers = groupHeaders(page.headers || []);
  return [{
    type: 'group',
    collapsable: false,
    title: page.title,
    path: null,
    children: headers.map(h => ({
      type: 'auto',
      title: h.title,
      basePath: page.path,
      path: page.path + '#' + h.slug,
      children: h.children || []
    })),
  }];
}

export function groupHeaders(headers) {
  // group h3s under h2
  headers = headers.map(h => Object.assign({}, h));
  let lastH2;
  headers.forEach(h => {
    if (h.level === 2) {
      lastH2 = h;
    } else if (lastH2) {
      (lastH2.children || (lastH2.children = [])).push(h);
    }
  });
  return headers.filter(h => h.level === 2);
}

export function resolveNavLinkItem(linkItem) {
  return Object.assign(linkItem, {
    type: linkItem.items && linkItem.items.length ? 'links' : 'link'
  })
}
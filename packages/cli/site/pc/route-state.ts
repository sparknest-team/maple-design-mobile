import { MenuTypes, type Menu } from '../utils'

export function getPcSiteRoute(
  path: string,
  hash: string,
  menu: Menu[],
  mobileRedirect: string | undefined,
  defaultUseMobile: boolean | undefined,
  mobileDocs: string[] = [],
) {
  const [, language = '', menuName = ''] = path.split('/')
  const component = menu.find((item) => item.doc === menuName && item.type === MenuTypes.COMPONENT)

  return {
    language,
    menuName,
    hash: hash.replace(/^#/, ''),
    componentName: component
      ? menuName
      : mobileDocs.includes(menuName)
        ? `${language}/${menuName}`
        : mobileRedirect?.replace(/^\//, ''),
    useMobile: component?.useMobile ?? defaultUseMobile,
  }
}

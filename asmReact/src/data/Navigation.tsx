import { IHeaderNav } from "../types/navType"

export{}

// header navigation
export const headerNav: IHeaderNav[] = [
  {
    name: 'Home',
    url: '/'
  },
  {
    name: 'Products',
    url: '/products'
  },
  {
    name: 'About Us',
    url: '#'
  },
  {
    name: 'Contact',
    url: '#'
  }
]

// footer navigation
export const FooterNav: IHeaderNav[] = [
  {
    name: 'About',
    url: '/about-us'
  },
  {
    name: 'Contact',
    url: '/contact'
  }
]
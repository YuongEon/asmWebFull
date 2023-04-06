import React from 'react'
import { Link } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid'
import './Navigation.css'

interface INavItem {
  name: string,
  url: string
}

interface NavigationProps {
  data: INavItem[]
}

const Navigation = ({data}: NavigationProps) => {

  return (
    <nav
      aria-label="Site Nav"
      className="hidden items-center justify-center gap-8 text-sm font-medium lg:flex lg:w-0 lg:flex-1 list-none"
    >
      {data.map((item) => {
        const uuidKey = uuidv4();
        return (
          <li key={uuidKey} className="text-gray-900">
            <Link to={item.url}>{item.name}</Link>
          </li>
        )
      })}
    </nav>
  )
}

export default Navigation
import { Link } from "react-router-dom";
import { CustomRouteProps } from "../../routes";

import './BreadCrumb.css'

export interface BreadCrumbProps {
  paths: Array<CustomRouteProps>
}

export function BreadCrumb(props: BreadCrumbProps) {
  const { paths } = props
  
  return (
    <div className="breadcrumb is-flex">
      <ul>
        <li><Link key='Home' to="/">Home</Link></li>
        {paths.map(({ name, path } :CustomRouteProps) => (
          <li key={name}><Link to={path?.toString() || ''}>{name}</Link></li>
        ))}
      </ul>
    </div>
  )
}

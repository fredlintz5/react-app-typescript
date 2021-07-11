import { useEffect, useState } from 'react'
import { Button, ButtonProps } from '../../components/general/Button'
import { CustomRouteProps } from '../../routes'
import { BreadCrumb, BreadCrumbProps } from './BreadCrumb'

export interface PageHeaderProps {
  title: string
  heading: string
  buttons?: ButtonProps[]
  breadCrumbs?: CustomRouteProps[]
}

export function PageHeader(props: PageHeaderProps) {
  const { title, heading, buttons = [], breadCrumbs = []} = props

  const [breadCrumbProps] = useState<BreadCrumbProps>({ paths: [...breadCrumbs] })

  useEffect(() => {
    const baseTitle = 'React + Typescript FTW'
    document.title = `${title} | ${baseTitle}`
    return () => { document.title = baseTitle }
  }, [title])
  
  return (
    <div className="page-header mb-3">
      <BreadCrumb {...breadCrumbProps}/>
      <div className="is-flex has-aligned-items-center">
        <h2 className="m-0">{heading}</h2>
        <div className="buttons ml-auto">
          {!!buttons.length && buttons.map((butt: ButtonProps) => (
            <Button key={butt.id} {...butt}/>
          ))}
        </div>
      </div>
    </div>
  )
}

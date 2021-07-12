import './Loader.scss'

export interface LoaderProps {
  isLoading: boolean
  text?: string
}

export function Loader(props: LoaderProps) {
  const { isLoading, text } = props

  return (
    <>
    {
      isLoading
        ? <div className="loader">
            <div className="is-loading"></div>
            {!!text?.length && <p className="has-position-absolute">{text}</p>}
          </div>
        : ''
    }
    </>
  )
}

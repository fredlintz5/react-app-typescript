import { useEffect, useState } from 'react'

import './Button.scss'

export interface ButtonProps {
  onClick?: () => void
  type?: ButtonType
  size?: ButtonSize
  label: string
  expanded?: boolean
  id: string
}

enum ButtonType {
  IS_PRIMARY = 'is-primary',
  IS_DANGER = 'is-danger',
  IS_WARNING = 'is-warning',
  IS_SUCCESS = 'is-success',
}

enum ButtonSize {
  IS_SMALL = 'is-small',
  IS_LARGE = 'is-large',
  IS_DEFAULT = 'is-default',
}

export function Button(props: ButtonProps) {
  const {
    label,
    onClick,
    type = ButtonType.IS_PRIMARY,
    size = ButtonSize.IS_DEFAULT,
    expanded = false
  } = props

  const [className, setClassName] = useState('button')

  // hooks
  useEffect(() => {
    setClassName(`button ${type} ${size} ${expanded ? 'expanded' : ''}`)
  }, [type, size, expanded])

  return (
    <button
      className={className}
      onClick={onClick}>
      {label}
    </button>
  )
}

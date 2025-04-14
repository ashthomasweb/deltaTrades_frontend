import {
  ReactElement,
  JSXElementConstructor,
  ReactNode,
  ReactPortal,
} from 'react'
import './content.scss'

export const ContentView = (props: {
  children:
    | string
    | number
    | boolean
    | ReactElement<unknown, string | JSXElementConstructor<unknown>>
    | Iterable<ReactNode>
    | ReactPortal
    | null
    | undefined
}) => {
  return (
    <div className="content-container">
      <div className="header-spacer"></div>
      <div className="content-pane">{props.children}</div>
    </div>
  )
}

import {
  ReactElement,
  JSXElementConstructor,
  ReactNode,
  ReactPortal,
} from 'react'

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
  return <div className="content-container">{props.children}</div>
}

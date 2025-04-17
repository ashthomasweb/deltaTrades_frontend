import { PropsWithChildren } from 'react'
import './content.scss'

export const ContentView = ({ children }: PropsWithChildren) => {
  return (
    <div className="content-container">
      <div className="header-spacer"></div>
      <div className="content-pane">{children}</div>
    </div>
  )
}

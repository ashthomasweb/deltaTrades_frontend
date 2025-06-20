import React from 'react'
import { NavLink } from 'react-router-dom'
import './header.scss'
import deltaLogo from '../../_assets/icons/delta-logo.png'

export const HeaderView: React.FC = () => {
  return (
    <div className="header-container">
      <img src={deltaLogo} />
      <NavLink
        to="/"
        end
        className={({ isActive }) => (isActive ? 'active' : '')}
      >
        Splash
      </NavLink>
      <NavLink
        to="/historic"
        end
        className={({ isActive }) => (isActive ? 'active' : '')}
      >
        Historic
      </NavLink>
      <NavLink
        to="/real-time"
        end
        className={({ isActive }) => (isActive ? 'active' : '')}
      >
        Real-Time
      </NavLink>
      <NavLink
        to="/analysis"
        end
        className={({ isActive }) => (isActive ? 'active' : '')}
      >
        Analysis
      </NavLink>
    </div>
  )
}

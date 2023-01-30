import React from 'react'
import logo from "../../img/logos/png/logowhite.png"
import "./Logosearch.css"
import {UilSearch} from '@iconscout/react-unicons'


export default function LogoSearch() {
  return (
      <div className='LogoSearch' >
      <img src={logo} className="logo" alt='logo' />
      <div className="Search">
        <input type="text" placeholder='#Explore' />
        <div className="s-icon">
          <UilSearch/>
        </div>
      </div>
    </div>
  )
}

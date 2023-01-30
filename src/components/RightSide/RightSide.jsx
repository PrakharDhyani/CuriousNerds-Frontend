import React from 'react'
import Comment from "../../img/comment.png"
import Notification from "../../img/noti.png"
import Home from "../../img/home.png"
import {UilSetting} from "@iconscout/react-unicons"


import "./RightSide.css"
import TrendCard from '../TrendCard/TrendCard'
import { Link } from 'react-router-dom'

export default function RightSide() {
  return (
    <div className="RightSide">
      <div className="navIcons">
        <Link to="../home" >
          <img src={Home} alt="" />
        </Link>
          <UilSetting />
        <img src={Notification} alt="" />
        <Link to= "../chat" >
          <img src={Comment} alt="" />
        </Link>
      </div>
      <TrendCard/>
    </div>
  )
}

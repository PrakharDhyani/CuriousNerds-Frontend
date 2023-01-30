import React from 'react'
import PostSide from '../../components/PostSide/PostSide'
import ProfileSide from '../../components/ProfileSide/ProfileSide'
import RightSide from '../../components/RightSide/RightSide'
import "./Home.css"

export default function Home() {
  return (
      <div className='Home' >
        <ProfileSide location = "homepage" />
        <PostSide location = "homepage" />
        <RightSide/>
    </div>
  )
}

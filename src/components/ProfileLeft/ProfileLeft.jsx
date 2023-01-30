import React from 'react'
import FollowerCard from '../FollowerCard/FollowerCard'
import InfoCard from '../InfoCard/InfoCard'
import LogoSearch from '../LogoSearch/LogoSearch'



export default function ProfileLeft() {
  return (
      <div className='ProfileSide'>
          <LogoSearch />
          <InfoCard/>
          <FollowerCard/>
    </div>
  )
}

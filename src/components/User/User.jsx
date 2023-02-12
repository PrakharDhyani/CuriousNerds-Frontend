import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { followUser } from '../../features/user/userActions';
import { useState } from 'react';
import defaultprofile from '../../img/defaultprofile.jpg'

export default function User({ person }) {
  const dispatch = useDispatch();
  const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;
  const { user } = useSelector((state) => state.user.userInfo);
  const state = useSelector((state)=>state)
  const [following, setFollowing] = useState(person.followers.includes(user._id));

  const handleFollow = async () => {
    console.log(state)
    const followingVar = !following;
    setFollowing(!following)
    dispatch(followUser({id: person._id, user,following:followingVar}));
  }
  return (
    <div className='followers'  >
        <div>
        <img src={person.profilePicture ? serverPublic + person.profilePicture :defaultprofile} alt="follower" className='followerImg' />
            <div className="name">
                <span style={{fontWeight:"bold"}} >{ person.firstname}</span>
                <span>{ person.username}</span>
            </div>
        </div>
      <button className={following ? `button fc-btn unfollowBtn`: "button fc-btn"} onClick={handleFollow} >{following ? "unfollow":"follow" }</button>
    </div>
  )
}

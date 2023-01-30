import React from 'react'
import { useSelector } from "react-redux"
import "./ProfileCard.css"
import {Link} from "react-router-dom"

export default function ProfileCard({ location }) {
  const {posts} = useSelector((state) => state.posts)
  const { user } = useSelector((state) => state.user.userInfo);
  const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;
  return (
      <div className="ProfileCard">
          <div className="ProfileImages">
              <img src={user.coverPicture ? serverPublic + user.coverPicture : serverPublic + "defaultcover.jpg"} alt="background" />
              <img src={user.profilePicture ? serverPublic + user.profilePicture : serverPublic + "defaultprofile.jpg"} alt="profile" />
          </div>
          <div className="ProfileName">
        <span>{user.firstname} {user.lastname }</span>
        <span>{ user.worksAt ? user.worksAt : "Write about yourself"}</span>
          </div>
          <div className="followStatus">
              <hr />
              <div>
                  <div className="follow">
            <span>{ user.following.length}</span>    
                    <span>Following</span>    
                  </div>
                  <div className="vl"></div>
                  <div className="follow">
            <span>{user.followers.length}</span>    
                    <span>Followers</span>    
                  </div>
              {
            location === "profilePage"&& (
              <>
                <div className="vl"></div>
                <div className="follow">
                  <span>{posts.filter((post)=>post.userId === user._id).length} </span>
                  <span>Posts</span>
                </div>
              </>
            )}

              </div>
              <hr />
      </div>
      {
        location === "profilePage" ?"": (
          <span style={{ marginBottom: "1rem" }}  >
            <Link style={{textDecoration:"none", color:"inherit"}} to={`/profile/${user._id}`} >
              My Profile
            </Link>
          </span>
          ) 
          }
    </div>
  )
}

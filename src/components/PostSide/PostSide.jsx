import React from 'react'
import Posts from '../Posts/Posts'
import PostShare from "../PostShare/PostShare"

export default function PostSide({location}) {
  return (
      <div className="PostSide">
      <PostShare />
      <Posts location={location} />
    </div>
  )
}

import React,{useEffect} from 'react'
import Post from '../Post/Post'
import "./Posts.css"
import { useDispatch, useSelector } from "react-redux"
import { getTimeLinePosts } from "../../features/post/postAction"

export default function Posts({location}) {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user.userInfo );
  const {posts} = useSelector((state) => state.posts)
  const { loading } = useSelector((state) => state.posts);

  useEffect(() => {
    console.log("post fetch for ", location)
    dispatch(getTimeLinePosts(user._id));
  },[])
  
  return (
      <div className='Posts' >
      {
        loading ? "fetching posts"
          : posts.map((post, id) => {
            // console.log(post)
                  if(location === 'profilepage' && post.userId === user._id)            
                      return <Post data={post} key={id} />
                  else if(location === 'homepage' && (user.following.includes(post.userId) ||post.userId === user._id ) ) {
                      return <Post data={post} key={id} />
                  }
              })
      }
    </div>
)}

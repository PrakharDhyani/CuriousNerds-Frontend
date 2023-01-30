import React,{useState} from 'react'
import Heart from "../../img/like.png"
import NotLike from "../../img/notlike.png"
import Share from "../../img/share.png"
import Comment from "../../img/comment.png"
import "./Post.css"
import {useDispatch, useSelector } from "react-redux"
import { likePost } from '../../features/post/postAction'

export default function Post({data}) {
  const { user } = useSelector((state) => state.user.userInfo);
  const dispatch = useDispatch()
  const [liked, setLiked] = useState(data.likes.includes(user._id))
  const [likes, setLikes] = useState(data.likes.length)
  // console.log(data.likes.length, " ", data.likes.includes(user._id))
  
  const handleLike = () => {
    const like = !liked;
    setLiked(!liked); 
    like ? setLikes((prev)=>prev+1) : setLikes((prev)=>prev-1)
    dispatch(likePost({ id: data._id, userId: user._id, like }));
  }
  return (
    <div className='Post' >
      <img src={data.image ? process.env.REACT_APP_PUBLIC_FOLDER + data.image : ""} alt="" />
      <span>{data.user}</span>
      <div className="PostReact">
          <img src= {liked ? Heart : NotLike} alt="" style={{cursor:"pointer"}} onClick={()=>{handleLike()}} />
          <img src= {Comment} alt="" />
          <img src= {Share} alt="" />
      </div>
      <span style={{ color: "var(--gray)", fontSize:"12px"}} >{likes} likes</span>
      <div className="detail">
        <span><strong>{data.name}</strong> </span>
        <span>{data.desc}</span>
      </div>
    </div>
  )
} 

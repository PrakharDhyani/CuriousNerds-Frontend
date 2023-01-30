import React, {useState,useRef} from 'react'
import ProfileImg from "../../img/profileImg.jpg"
import {UilScenery ,UilPlayCircle ,UilLocationPoint,UilSchedule,UilTimes} from "@iconscout/react-unicons"
import { useDispatch, useSelector } from 'react-redux'
import { uploadPost,uploadImg } from '../../features/post/postAction'
import "./PostShare.css"


export default function PostShare() {
  const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;
  const [image, setImage] = useState(null);
  const imageRef = useRef()
  const { user } = useSelector((state) => state.user.userInfo);
  const {loading} = useSelector((state)=>state.posts)
  const desc = useRef()
  const dispatch = useDispatch();

  const onImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      let image = e.target.files[0];
      setImage(image)
    }
  }
  const reset=()=>{
        setImage(null);
        desc.current.value='';
  }
  const handleSubmit = async(e) => {
    e.preventDefault();
    const newPost = {
      userId: user._id,
      desc: desc.current.value,
    } 
    if (image) {
      const data = new FormData()
      const fileName =  image.name
      console.log(fileName)
      data.append("name", fileName);
      console.log(data.name)
      data.append("file", image); // this "file" will be the name of the -> upload.single("file")
      newPost.image = fileName;
      newPost.user = user.username;
      try {
          console.log(data)
          dispatch(uploadImg(data));
        }
        catch (err) {
            console.log(err)
        }
      }
    console.log(newPost)
    //sending our newPost data in redux first that will store our post in store and as well as send the post to server
    dispatch(uploadPost(newPost))
    reset();
  }
  return (
      <div className='PostShare' >
           <img src={user.profilePicture ?serverPublic + user.profilePicture : serverPublic + "defaultprofile.jpg"} alt="profile" />
          <div>
              <input type="text" required ref={desc} placeholder='Whats happening'  />
          <div className="PostOptions">
          <div className="option" style={{ color: "var(--photo)" }} onClick={() => imageRef.current.click() }  >
              <UilScenery />
              Photo
          </div> 
          <div className="option" style={{color:"var(--video)"}}>
              <UilPlayCircle />  
              Video
          </div> 
          <div className="option"  style={{color:"var(--location)"}}>
              <UilLocationPoint />
              Location
          </div> 
          <div className="option" style={{color:"var(--schedule)"}}>
              <UilSchedule />  
              Schedule
            </div>  
          <button className="button  ps-btn" onClick={handleSubmit} disabled={loading} > { loading ? "uploading" :"share"}</button>
          <div style={{display:'none'}} >
            <input type="file" name='myImage' ref={imageRef} onChange={onImageChange} />
          </div>   
        </div>
        { 
          image && (
            < div className="previewImage">
              <UilTimes onClick={()=> setImage(null)} />
              <img src={ URL.createObjectURL(image)} alt="Preview" />
            </div>
          )
        }
          </div>
    </div>
  )
}

import React from 'react'
import { UilPen } from "@iconscout/react-unicons"
import "./InfoCard.css"
import { useState,useEffect } from 'react'
import ProfileModal from '../ProfileModal/ProfileModal'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import Api from '../../common/api/Api'
import { logoutUser } from '../../features/user/userActions'

export default function InfoCard() {
    const dispatch = useDispatch() 
    const params = useParams();
    const profileID = params.id;
    const [profileUser, setProfileUser] = useState({})
    const [modalOpened, setModalOpened] = useState(false)
    const navigate = useNavigate();
    const { user } = useSelector((state) => state.user.userInfo);
    useEffect(() => {
        // console.log("user",user)
        const fetchProfileUser = async () => {
            if (user._id === profileID) {
                setProfileUser(user)
            }
            else {
                const profileUser = await Api.get(`/user/${profileID}`);
                setProfileUser(profileUser);
            }
        }
        fetchProfileUser();
    },[user])
    const handlelogout = () => {
        navigate("../auth")
        dispatch(logoutUser());
    }
  return (
      <div className='InfoCard'>
          <div className="InfoHead">
              <h4>Profile Info</h4>
              {user._id === profileID  ? (<div>
                  <UilPen height="1.2rem" width="2rem" onClick={() => { setModalOpened(true) }} />
                  <ProfileModal modalOpened={modalOpened} setModalOpened={setModalOpened} data={user} />
              </div>):null}
          </div>
          <div className="info">
              <span><strong>Status  </strong></span>
              <span>{profileUser.status}</span>
          </div>
          <div className="info">
              <span><strong>Lives  </strong></span>
              <span>{ profileUser.livesin}</span>
          </div>
          <div className="info">
              <span><strong>Works at  </strong></span>
              <span>{ profileUser.worksAt}</span>
          </div>
          <button className="button lg-btn" onClick={()=>{handlelogout()}} >Logout</button>
    </div>
  )}

import React,{useState} from 'react'
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import defaultprofile from "../../img/defaultprofile.jpg"
import api from '../../common/api/Api';

export default function Conversation({ data, currentUser, online }) {
 const [userData, setUserData] = useState(null)
 const dispatch = useDispatch()

  useEffect(()=> {

    const userId = data.members.find((id)=>id!==currentUser)
    const getUserData = async ()=> {
      try
      {
        const {data} = await api.get(`user/${userId}`)
         setUserData(data)
        //  dispatch()
      }
      catch(error)
      {
        console.log(error)
      }
    }

    getUserData();
  }, [])

  return (
      <>
    <div className="followers conversation">
        <div>
          {online && <div className="online-dot"></div>}
          <img
            src={userData?.profilePicture? process.env.REACT_APP_PUBLIC_FOLDER + userData.profilePicture : defaultprofile}
            alt="Profile"
            className="followerImg"
            style={{ width: "50px", height: "50px" }}
          />
          <div className="name" style={{fontSize: '0.8rem'}}>
            <span style={{fontWeight:"bold"}} >{userData?.firstname} {userData?.lastname}</span>
            <span style={{color: online?"#51e200":""}}>{online? "Online" : "Offline"}</span>
          </div>
        </div>
      </div>
      <hr style={{ width: "85%", border: "0.1px solid #ececec" }} />
      </>
  )
}

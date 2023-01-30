import React from 'react'
import "./FollowerCard.css"
import User from '../User/User'
import { useSelector } from 'react-redux';
import Api from '../../common/api/Api';
import { useState, useEffect } from 'react';

export default function FollowerCard() {
   const [persons, setPersons] = useState([])
   const { user } = useSelector((state) => state.user.userInfo);
    useEffect(() => {
      const fetchPerson = async () => {
          const { data } = await Api.get("/user/getAllUser")
          setPersons(data);
      }
      fetchPerson()
  },[user])
    
  return (
      <div className='FollowerCard' >
          <h3>People you may know</h3>
          {persons.map((person) => {
              if (person._id !== user._id) {
                //   console.log(person)
              return (
                      <User person = {person} key = {person._id} />
              )}
          })}
      </div>
  )
}

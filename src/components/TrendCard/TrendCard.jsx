import React from 'react'
import {TrendData} from '../../Data/TrendData.js'
import { useState } from 'react'
import "./TrendCard.css"
import ShareModal from '../ShareModal/ShareModal.jsx'


export default function TrendCard() {
     const [modalOpened, setModalOpened] = useState(false)

    return (
        <div className='TrendCard' >
            <h3>Trends For You</h3>
            {TrendData.map((data, id) => {
                return (
                    <div className='trend' key={id}>
                        <span>#{data.name} </span>
                        <span> {data.Shares}k</span>
                    </div>
                )
            })}
            <button className='button r-btn' onClick={() => { setModalOpened(true) }} >Share</button>
            <ShareModal  modalOpened={modalOpened} setModalOpened={setModalOpened}  />
            
        </div>
    )
}

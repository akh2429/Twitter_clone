import React from 'react'
import Post from './Post'
import f from "./Feed.module.css"
import { BsTwitter } from 'react-icons/bs'

export default function FeedTop() {
  const screenwidth = window.innerWidth
  return (
    <div className={f.main}>
      <div className={f.box}>
        <div className={f.first}>
          { screenwidth > 430 ?<h2>Home</h2> : 
          <div className={f.res}>
            <div className={f.left}> <img src="https://tse4.mm.bing.net/th?id=OIP.Ii15573m21uyos5SZQTdrAHaHa&pid=Api&P=0" alt="img" /> </div>
            <div className={f.right}><BsTwitter /></div>
          </div>
          }
        </div>
        <div className={f.second}>
          <div>For You</div>
          <div>Following</div>
        </div>
      </div>
      <Post />
    </div>
  )
}

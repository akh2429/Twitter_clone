import React from 'react'
import n from './Nav.module.css'


export default function Nav() {
  return (
    <nav className={n.main}>
      <div><BiHomeCircle/></div>
      <div><BsSearch/></div>
      <div><GrNotification/></div>
      <div><HiOutlineMail/></div>
    </nav>
  )
}

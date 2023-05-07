import React from 'react'
import n from './Nav.module.css'
import { BiHomeCircle } from 'react-icons/bi'
import { BsSearch } from 'react-icons/bs'
import { GrNotification } from 'react-icons/gr'
import { HiOutlineMail } from 'react-icons/hi'


export default function Nav() {
  return (
    <nav className={n.main}>
      <div className={n.icon}><BiHomeCircle/></div>
      <div className={n.icon}><BsSearch/></div>
      <div className={n.icon}><GrNotification/></div>
      <div className={n.icon}><HiOutlineMail/></div>
    </nav>
  )
}

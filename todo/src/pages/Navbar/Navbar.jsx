import { AiOutlineMenu } from 'react-icons/ai'
import { ImCross } from 'react-icons/im'

import { useState } from 'react'
import './Nav.css'
const Navbar = () => {
    const [toggle,setToggle]=useState(false)

    const showToggle=()=>{
        setToggle(!toggle)
    }
  return (
    <div className='nav-container'>
      <nav>
        <h1>Todo</h1>
        <ul className={`${!toggle ? 'navbar': 'hidden'}`}>
            <li><a className='active' href="">Home</a></li>
            <li><a href="">About</a></li>
            <li><a href="">Blog</a></li>
            <li><a href="">Register</a></li>
        </ul>
        <div className='nav-in'>
         
         <button>GetStarted</button>
            <div onClick={showToggle} className='bx bx-menu' id='menu-icon'>
                {
                    toggle ?<ImCross size={25}/>: <AiOutlineMenu size={25}/> 
                }
            
            
            </div>
          
           
        </div>
      </nav>
    </div>
  )
}

export default Navbar

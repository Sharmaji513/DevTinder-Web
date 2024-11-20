import React from 'react'
import Profile from '../Profile/Profile'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

const NavBar = () => {

 const user =  useSelector((store) => store.user)
 console.log(user);
 
  return (
    <div className="navbar bg-base-300 px-24  ">
    <div className="flex-1">
      <Link to="/" className="btn btn-ghost text-xl"><span className='text-2xl'>🦸🏻</span>devTinder</Link>
    </div>

    <div className="navbar-end">
   {!user && (
          <Link to="/login">
            <button className="btn">Login</button>
          </Link>
        )}

    {user && <div className="form-control">
        Welcome , {user?.firstName.toUpperCase()}
      </div> }  
  
      
  </div>
    <div className="flex-none gap-2">
    
     {user &&  <div className="dropdown dropdown-end">
        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
          <div className="w-10 rounded-full">
            <img
              alt="Tailwind CSS Navbar component"
              src={user?.photoUrl} />
          </div>
        </div>
        <ul
          tabIndex={0}
          className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
          <li>
            <Link to="profile" className="justify-between">
              Profile
              <span className="badge">New</span>
            </Link>
          </li>
          <li><a>Settings</a></li>
          <li><a>Logout</a></li>
        </ul>
      </div>}
     
    </div>
    </div>
  )
}

export default NavBar
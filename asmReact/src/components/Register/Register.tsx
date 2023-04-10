import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Register = ({role}: any) => {
  console.log(role);
  
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    navigate('/')
    location.reload();
  }
  
  if(role == ""){
  return (
    <div className="hidden items-center gap-4 lg:flex">
        <Link
          to={"/signin"}
          className="rounded-lg bg-gray-100 px-5 py-2 text-sm font-medium text-gray-600"
        >
          Log in
        </Link>

        <Link
          to={"/signup"}
          className="rounded-lg bg-blue-600 px-5 py-2 text-sm font-medium text-white"
        >
          Sign up
        </Link>
      </div>
  )
} else if(role == 'member'){
  return (
    <div className="hidden items-center gap-4 lg:flex">
        <button
          onClick={handleLogout}
          className="rounded-lg bg-blue-600 px-5 py-2 text-sm font-medium text-white"
        >
          Log out
        </button>
      </div>
  )
} else if(role == 'admin'){
  return (
    <div className="hidden items-center gap-4 lg:flex">
        <Link
          to={"/admin"}
          className="rounded-lg bg-gray-100 px-5 py-2 text-sm font-medium text-gray-600"
        >
          Admin page
        </Link>

        <button
          onClick={handleLogout}
          className="rounded-lg bg-blue-600 px-5 py-2 text-sm font-medium text-white"
        >
          Log out
        </button>
      </div>
  )
}
return null;
}

export default Register


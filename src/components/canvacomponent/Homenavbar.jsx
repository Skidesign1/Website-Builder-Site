import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
const Homenavbar = () => {

  const navigate=useNavigate()

  return (

    <div>

           <div>Homenavbar</div>
           <button onClick={()=> navigate("/")}   >Go back</button>

    </div>
  
  )
}

export default Homenavbar
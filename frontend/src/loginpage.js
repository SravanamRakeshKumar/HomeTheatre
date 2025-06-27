import { useState } from 'react';
import axios from 'axios';
import { Link ,useNavigate} from 'react-router-dom';
import './loginpage.css';
function Loginpage()   
{

  let [username,setUsername] = useState('');
  let [password,setPassword] = useState('');
  const API_URL = process.env.REACT_APP_API_URL;

  let navigate = useNavigate();

async function Add(event) {
  event.preventDefault();
  try {
  const response = await axios.post(`${API_URL}login`, {
    username:username,
    password:password
  });

  if (response.data.message === "login successful") {
    alert("Login successful!");
    navigate("/home", { state: { username: username} });

  } else {
    alert(response.data.message || "Login failed.");
  }
} catch (error) {
   alert(error.response.data.message || "Something went wrong. Try again.");
}
 
}

  return (
  <>
   <section id="loginpagesection">
      <div id="login">
        <form id="loginpageform" onSubmit={Add}>
            <h1>Hi Welcome Back 👋</h1>
            <input  id="username" type="text" value={username} onChange={(event)=>setUsername(event.target.value)} placeholder="username" required></input>
            <input  id="password" type="password" value={password} onChange={(event)=>setPassword(event.target.value)} placeholder="password" required></input>
            <input  type="submit" value="login"></input>
        </form>
         <p style={{color:"white",zIndex:"20"}}>create a new  account <Link to="/">signup</Link></p>
      </div>

   </section>
    
  </>
  )
}
export default Loginpage;
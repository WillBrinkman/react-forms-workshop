import { useState } from 'react'

export default function SignUpForm({ setToken }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
  
    const handleSubmit = async(e) => {
      e.preventDefault();

      if (username.length < 8) {
        setError('Username must be at least 8 characters long');
        return;
      }
  
      if (password.length < 8) {
        setError('Password must be at least 8 characters long');
        return;
      }

      const userData = {
        username: username,
        password: password
      };
  
      try { 
        const response = await fetch("https://fsa-jwt-practice.herokuapp.com/signup", {
            method: 'POST', 
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData) 
          });
          if (!response.ok) {
            throw new Error(`HTTP error ${response.status}`)
          } else {
            const result = await response.json();
            console.log(result);
            setToken(result.token)
          }
      } catch (error) {
        setError(error.message)
      }
      //console.log("Hello Earthling ✌️👽")
    }
    return ( 
        <>
        <h2>Sign Up!</h2>
        {error && <p>{error}</p>}
        <form onSubmit={handleSubmit}>
            <label>
            Username: <input value={username} onChange={(e) => setUsername(e.target.value)}/>
            </label>
            <label>
            Password: <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
            </label>
            <button>Submit</button>
        </form>
        </>
    );
}
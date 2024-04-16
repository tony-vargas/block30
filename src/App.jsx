import { useState, useEffect } from 'react'
import axios from 'axios'
import bookLogo from './assets/books.png'
import {Routes, Route, Link} from 'react-router-dom'
import Navigations from "./components/Navigations"
import Books from './components/Books'
import Login from './components/Login'
import Register from './components/Register'
import Account from './components/Account'
import SuccessRegi from './components/SuccessRegi'
import Homepage from './components/Homepage'
import SingleBook from './components/SingleBook'
import AboutUs from './components/AboutUs'

function App() {
  const [token, setToken] = useState(null)
  const [user, setUser] = useState({})
  const [books, setBooks] = useState([])
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchBooks = async() => {
      const {data} = await axios.get("https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/books")
      setBooks(data.books)
    }
    fetchBooks()
  }, [])

  

  useEffect(() => {
    const attemptLogin = async() => {
      const loggedInToken = window.localStorage.getItem('token')
      

      if(loggedInToken){
        const response = await axios.get('https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/users/me', {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${loggedInToken}`
          }
        })

        setUser(response.data)
      }else{
        
        throw 'no token'
      }

    }
    
    attemptLogin()
  },[token])

 
  return (
    <>
    <h1 className="homeLink"><img id='logo-image' src={bookLogo}/><Link to='/homepage'>Library App</Link></h1>
    <p className="homeP">Viewing as: { user.firstname ? user.firstname : "Guest" }</p>
    <Navigations user={user}/>
    <Routes>
      <Route path='/homepage' element={<Homepage books={books} token={token} user={user}/>}/>
      <Route path='aboutus' element={<AboutUs />} />
      <Route path='/successReg' element={<SuccessRegi />}/>
      <Route path='/books' element={<Books books={books} error={error} user={user} token={token}/>}/>
      <Route path='/books/:id' element={<SingleBook books={books} user={user} token={token}/>}/>
      <Route path='/login' element={<Login setUser={setUser} setToken={setToken} token={token}/>}/>
      <Route path='/register' element={<Register />}/>
      <Route path='/account' element={<Account user={user} setUser={setUser} setToken={setToken} books={books} token={token}/>}/>
    </Routes>

      
    </>
  )
}

export default App

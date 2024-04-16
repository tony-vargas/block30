
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"


const Account = ({user, setUser, setToken, token, books }) => {
    const navigate = useNavigate()
    const [checkBook, setCheckBook] = useState([])
    const [returnError, setReturnError] = useState([])
    
    const logout = () => {
        window.localStorage.removeItem('token');
        setToken(null)
        setUser({})
        navigate('/')
    }

    useEffect(() => {
        const fetchCheckBook = async() => {
            const loggedInToken = window.localStorage.getItem('token')
            try {
                const response = await axios.get('https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/reservations',
                {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${loggedInToken}`,
                }
            })
            console.log(response)
            setCheckBook(response.data.reservation);
        } catch (error) {
            console.error('Error fetching your checked out books', error)
        }
    }
    fetchCheckBook()
    }, [token])
    
    const handleReturn = async (reservationId) => {
        const loggedInToken = window.localStorage.getItem('token')
        try {
            const response = await axios.delete(
            `https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/reservations/${reservationId}`,
            
            {
                headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${loggedInToken}`
                },
            }
            )
    
            console.log(response.data)
    
            navigate('/books')
        } catch (error) {
            console.error('Error returning your book:', error)
            setReturnError('Please try again in a moment!')
        }
    }
    
    
    if(!user.books){
        return null
    }
    
    return(
        <div>
            <h1 className="accountPage">Account</h1>
            <h3 className="accountPage">User: {user.firstname}</h3>
            <h5 className="accountPage">Email: {user.email}</h5>
            <button onClick={() => {logout()}} className="accountPage">Logout</button>
            <hr/>
            <div>
                <h3 className="accountPage">Checked Out Book List:</h3>
                <ul>
                    {checkBook.map((book) => {
                        <li key={book.id}>
                            <h4>{book.title}</h4>
                            <p>Author: {book.author}</p>
                            <button onClick={() => handleReturn(book.id)}>Return Book</button>
                        </li>
                    })}
                </ul>
            </div>
            
            
            
           
        </div>
    )
}

export default Account
import axios from 'axios'
import { useEffect, useState } from 'react'
import {Link, useParams, useNavigate} from 'react-router-dom'

const SingleBook = ({books, user}) => {
    const [selectBook, setSelectBook] = useState(null)
    const [checkError, setCheckError] = useState(null)
    const nav = useNavigate()

    const params = useParams()
    const bookId = params.id*1
    
    useEffect(() => {
        const book = books.find((book) => book.id === bookId);
        setSelectBook(book);
      }, [books, bookId]);
    // handle statement below, start of function and useEffect ^
      const handleCart = async() => {
            const loggedInToken = window.localStorage.getItem('token')

            try {
                const response = await axios.patch(`https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/books/${bookId}`, {available: false},
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${loggedInToken}`
                      }
                })
                console.log(response.data);
                nav('/account');
            } catch(error) {
                console.error('Error checking out this book', error)
                setCheckError('There is an issue checking out this book.')
            }
        };
    // if statement below, handle statement ^
    if(!selectBook) {
        return (
        <div className='selectBookError'>
            No book found with ID
        </div>
        );
    }
    // return below, if statement ^
        return (
            <div>
                <div>
                <h2 className="selectBookTitle">{selectBook.title}</h2>
                <h4 className="selectBookAuthor">Author: {selectBook.author}</h4>
                <p className="selectBookDesc">Description: {selectBook.description}</p>
                <img src={selectBook.coverimage} alt={selectBook.title} className="selectBookImg"/>
                <p className="selectBookAv">Currently Available: {selectBook.available ? 'Yes' : 'No'}</p>
                </div>
                {user.email && (
                    <div>
                        <button onClick={handleCart} className="checkoutButton">Add book to check out</button>
                        <Link to='/books' className="returnLink">Back to all books!</Link>
                    </div>
                )}
                {checkError && <div className="checkoutError">{checkError}</div>}
            </div>
        );
        // return ^
}

export default SingleBook
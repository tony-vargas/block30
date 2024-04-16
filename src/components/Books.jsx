import {Link} from 'react-router-dom'
import SearchBar from "./SearchBar"


const Books = ({books}) => {
return(
 <div>
    <h2 className="SearchArea">Our Current Book List</h2>
    <p className="SearchArea">Current number of books in our library: {books.length}</p>
    <SearchBar books={books}/>
    <ul className="bookMain">
        {books.map((book) => {
            const stock = book.available ? "Available" : "Unavailable"
            return (
                <li key={book.id} className="book">
                    <Link to={`/books/${book.id}`}>
                    <h3>{book.title}</h3>
                    </Link>
                    <img src={book.coverimage} />
                    <p>{stock}</p>
                </li>
            )
        })}
    </ul>
 </div>
)
}

export default Books
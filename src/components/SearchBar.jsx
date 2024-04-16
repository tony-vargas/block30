import {useState} from 'react'
import {Link} from 'react-router-dom'

const SearchBar = ({books}) => {
    const [term, setTerm] = useState('')

    const filterTerms = books.filter((book) => {
        return book.title.indexOf(term) !== -1
    })

    return (
        <div className="SearchArea">
            <label>
                <h5>Search Books Here:</h5>
                <span>
                    <input type="text" value={term} onChange={(event) => {setTerm(event.target.value)}}/>
                </span>
            </label>
            {term.length > 0 ?
            <div>
                <h3>There are {filterTerms.length} of {books.length} books fitting that search</h3>
                <ul>
                    {filterTerms.map((book) => {
                        return (
                            <li key={book.id}>
                                <Link to={`/books/${book.id}`}>{book.title}</Link>
                            </li>
                        )
                    })}
                </ul>
            </div>
            :null
            }
        </div>
    )
}

export default SearchBar
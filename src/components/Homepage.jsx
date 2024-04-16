import {Link} from 'react-router-dom'

const Homepage = ({user}) => {
    return(
        <div className="homePage">
            <h2>{user.firstname ? `Welcome back, ${user.firstname}!` : 'Welcome to our Library!'}</h2>
            <br />
            <p>Please check out our library selection from the links above.</p>

            <Link to='/books' className='homeToBooks'>To All Books</Link>
        </div>
    )
}

export default Homepage

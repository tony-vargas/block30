import {Link} from 'react-router-dom'

const Homepage = ({user}) => {
    return(
        <div className="homePage">
            <h2>{user.firstname ? `Welcome back, ${user.firstname}!` : 'Welcome to our Library!'}</h2>
            <br />
            <p>"If we could change ourselves, the tendencies in the world would aslo change. As a man changes his own nature, so does the attitude of the world change towards him." - Mahtama Gandhi</p>

            <Link to='/books' className='homeToBooks'>To All Books</Link>
        </div>
    )
}

export default Homepage
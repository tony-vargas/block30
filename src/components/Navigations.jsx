import { Link } from "react-router-dom"

const Navigations = ({user}) => {
    
    
    return (
        <nav>
            <Link to='/homepage' className="navLink">Home</Link>
            <Link to='/books' className="navLink">Books</Link>
            <Link to='/aboutus' className="navLink">About Us</Link>
            {
                user.email ? (
                    <span>
                        <Link to="/account" className="navLink">User</Link>
                    </span>
                
                ) : (
                    
                    <span>
                        <Link to="/login" className="navLink">Login</Link>
                        <Link to='/register' className="navLink">Register</Link>
                    </span>
                )
            }
        </nav>
    )
}

export default Navigations
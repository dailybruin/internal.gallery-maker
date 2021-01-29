import React from 'react'
import { Link } from "react-router-dom"

function Home(props) {
    return (
        <div>
            <div>Home Page</div>
            <div>
                <Link to='/create'>Create</Link>
            </div>
            <div>
                <Link to='/update/1'>Update</Link>
            </div>
            <div>
                <Link to='/tester'>Tester</Link>
            </div>
            <div>
                <Link to='/signup'>Signup</Link>
            </div>
        </div>
    );
}

export default Home
import React from 'react'
import { useAuth } from '../features/auth/hooks/useAuth.js'
import './navbar.scss'

const Navbar = () => {
    const { user, handleLogout } = useAuth()

    return (
        <header className='app-navbar'>
            <div className='app-navbar__brand'>Interview AI</div>
            {user && (
                <div className='app-navbar__right'>
                    <span className='app-navbar__greeting'>Hi, {user.username} 👋</span>
                    <button className='app-navbar__logout' onClick={handleLogout}>
                        Logout
                    </button>
                </div>
            )}
        </header>
    )
}

export default Navbar
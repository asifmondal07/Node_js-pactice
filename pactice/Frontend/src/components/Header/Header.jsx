import React from 'react'
import { Container } from '../index'
import { useNavigate } from 'react-router-dom'

function Header() {
  const navigate = useNavigate()

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Login', path: '/login' },
    { name: 'Signup', path: '/signup' },
  ]

  return (
    <header className='bg-amber-100 shadow-md'>
      <Container>
        <div className='flex justify-between items-center py-4'>
          <h1 className='text-2xl font-bold'>My Blog</h1>
          <nav className='flex space-x-4'>
            {navItems.map((item) => (
              <button
                key={item.name}
                className='text-lg inline-block px-6 py-2 duration-200 hover:bg-blue-100 rounded-full text-gray-700'
                onClick={() => navigate(item.path)}
              >
                {item.name}
              </button>
            ))}
          </nav>
        </div>
      </Container>
    </header>
  )
}

export default Header

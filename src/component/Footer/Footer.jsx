import React from 'react'
import logo from '../../logo.svg'
export default function Footer() {
  return <>
  <footer className='bg-dark text-white text-center py-3 mt-auto' style={{ position: 'fixed', bottom: 0, width: '100%' }}>
    <div className="container">
      <div className="row">
        <div className="col">
          <img src={logo} alt="Logo" width="50" height="50" className="mb-2" />
          <p className="mb-0">Copyright © 2024 Designed by Shimaa. All rights reserved</p>
          <div className="mt-2">
            <a href="https://github.com/adhammenesy" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-github" style={{ fontSize: '30px' }}></i>
            </a>
          </div>
        </div>
      </div>
    </div>
  </footer>
  </>
}

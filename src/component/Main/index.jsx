import React from 'react'
import './index.css'
import svg from './L.svg'
import { Helmet } from 'react-helmet'
import { Link } from 'react-router-dom'
export default function Main() {
    return (
        <div className="container">
            <Helmet>
                <link rel="icon" href="https://th.bing.com/th/id/OIP.Rjaz0qU8IVp6eX2X3KHc5wHaHa?rs=1&pid=ImgDetMain" />
                <title>Movies</title>
            </Helmet>
            <h1 className="fadeIn" style={{ marginTop: '5%', animation: 'fadeIn 1s ease-in-out' }}>Movies</h1>
            <div>
                <div className="right ToLeft" style={{ marginTop: '20%', animation: 'ToLeft 1s ease-in-out' }}>
                    <p className=' lead font-size: 20px'><span style={{ color: '#FFD700' }}>#</span> Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt, quidem?</p>
                    <p className=' lead font-size: 20px'><span style={{ color: '#FFD700' }}>#</span> Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt, quidem?</p>
                    <p className=' lead font-size: 20px'><span style={{ color: '#FFD700' }}>#</span> Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt, quidem?</p>
                    <p className=' lead font-size: 20px'><span style={{ color: '#FFD700' }}>#</span> Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt, quidem?</p>
                    <div className="btn" style={{ marginTop: '20px', marginLeft: '20%' }} >
                        {JSON.parse(localStorage.getItem('isLoggedIn'))?.is ? (
                            <Link to="/home" className='btn btn-primary'>Home</Link>
                        ) : (
                            <Link to="/register" className='btn btn-primary'>Get Started For Free</Link>
                        )}
                    </div>
                </div>
                <div className="left" style={{ animation: 'ToRight 1s ease-in-out' }}>
                    <img className="ToRight" style={{ marginLeft: '70%', marginTop: '-30%' }} src={svg} alt="Movie" />
                </div>
            </div>
        </div>
    )
}
import React, { useEffect, useState } from 'react'
import Link from '../../Functions/CreateApiLink'
import { useNavigate } from 'react-router-dom'
import './Tv.css'
import { Helmet } from 'react-helmet'
export default function Tv() {
  const [tvShows, setTvShows] = useState([]);
  const navigate = useNavigate()
  function getTrendingTvShows() {
    fetch(Link('tv'))
      .then(res => res.json())
      .then(data => setTvShows(data.results))
  }

  useEffect(() => {
    const loggedIn = JSON.parse(localStorage.getItem('isLoggedIn'))
    if (!loggedIn || !loggedIn.is) {
      window.location.href = '/login'
    } else {
      getTrendingTvShows();
    }
  }, [])

  return (
    <div className="container mt-5">
      <Helmet>
        <link rel="icon" href="https://th.bing.com/th/id/OIP.Rjaz0qU8IVp6eX2X3KHc5wHaHa?rs=1&pid=ImgDetMain" />
        <title>TV Shows</title>
      </Helmet>
      <h1 className="text-center mb-4" style={{ animation: 'fadeIn 1s ease-in-out' }}>Trending TV Shows</h1>
      <div className="row" style={{ marginTop: '100px' }}>
        {tvShows.map((tvShow, index) => (
          <div key={tvShow.id} className={` position-relative col-md-${index < 3 ? '4' : '3'} mb-4`}>
            <div onClick={() => navigate(`/tv/detailes/${tvShow.id}`)} className={` tv-show card h-100 ${index === 1 ? 'border border-warning' : ''}`} style={index === 1 ? { transform: 'translateY(-50px)', fontSize: '1.25rem' } : { animation: index % 2 === 0 ? 'ToLeft 1s ease-in-out' : 'ToRight 1s ease-in-out' }}>
              <img src={`https://image.tmdb.org/t/p/w500/${tvShow.poster_path}`} className="card-img-top" alt={tvShow.name} />
              <div className="card-body">
                <h5 className="card-title">{tvShow.name}</h5>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

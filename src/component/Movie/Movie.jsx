import React, { useEffect, useState } from 'react'
import Link from '../../Functions/CreateApiLink'
import { Helmet } from 'react-helmet'
import './Movie.css'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

export default function Movie() {
  const [movies, setMovies] = useState([]);
  const navigate = useNavigate()

  async function getTrendingMovies() {
    try {
      const res = await axios.get(Link('movie'))
      setMovies(res.data.results)
    } catch (error) {
      alert('Request failed with status code', error.response.status)
    }
  }

  useEffect(() => {
    const loggedIn = JSON.parse(localStorage.getItem('isLoggedIn'))
    if (!loggedIn || !loggedIn.is) {
      window.location.href = '/login'
    } else {
      getTrendingMovies();
    }
  }, [])

  return (
    <div className="container mt-5">
      <Helmet>
        <link rel="icon" href="https://th.bing.com/th/id/OIP.Rjaz0qU8IVp6eX2X3KHc5wHaHa?rs=1&pid=ImgDetMain" />
        <title>Movie Page</title>
      </Helmet>
      <h1 className="text-center mb-4" style={{ animation: 'fadeIn 1s ease-in-out' }}>Trending Movies</h1>
      <div className="row" style={{ marginTop: '100px' }}>
        {movies.map((movie, index) => (
          <div key={movie.id} className={` position-relative col-md-${index < 3 ? '4' : '3'} mb-4`}>
            <div onClick={() => navigate(`/movie/detailes/${movie.id}`)} className={` movie card h-100 ${index === 1 ? 'border border-warning' : ''}`} style={index === 1 ? { transform: 'translateY(-50px)', fontSize: '1.25rem' } : { animation: index % 2 === 0 ? 'ToLeft 1s ease-in-out' : 'ToRight 1s ease-in-out' }}>
              <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} className="card-img-top" alt={movie.title} />
              <div className="card-body">
                <h5 className="card-title">{movie.title}</h5>
              </div>
              {movie.vote_average > 7 ? <button className="btn btn-primary position-absolute top-0 end-0 m-2" title={`film vote ${movie.vote_average.toFixed(1)}`}>{movie.vote_average.toFixed(1)}</button> : <button className="btn btn-primary position-absolute top-0 end-0 m-2" title={`film vote ${movie.vote_average}`}>{movie.vote_average}</button>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

//  https://api.themoviedb.org/3/trending/movie/day?api_key=44ee5523e457e74020effc2bddc4592e

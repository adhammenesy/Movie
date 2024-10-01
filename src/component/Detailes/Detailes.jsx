import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Link from '../../Functions/CreateApiLink'
import axios from 'axios'
import './Detailes.css'

export default function Detailes() {
    let { id } = useParams()
    const [movie, setMovie] = useState({})
    const [error, setError] = useState(null)
    const [zoom, setZoom] = useState(false)

    async function getDetailes(id) {
        try {
            const res = await axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=4e44d9029b1270a757cddc766a1bcb63&language=en-US`)
            setMovie(res.data)
            // console.log(res.data)
        } catch (error) {
            setError(error)
        }
    }

    useEffect(() => {
        getDetailes(id)
    }, [id])

    if (error) return <div className='alert alert-danger text-center'>Error: {error.message}</div>
    if (!movie) return <div className='alert alert-warning text-center'>Loading...</div>

    const handleImageClick = () => {
        setZoom(!zoom)
    }

    return (
        <div className="container mt-5">
            <h1 className="text-center mb-4" style={{ animation: 'fadeIn 1s ease-in-out', color: '#ff6347' }}>Details</h1>
            <div className="row">
                <div className="col-md-4">
                    <div className="image-gallery">
                        <img
                            src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                            className={`img-fluid rounded mb-3`}
                            alt={movie.title}
                            style={{
                                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                                borderRadius: '10px',
                                cursor: 'pointer',
                                width: zoom ? '100vw' : 'auto',
                                height: zoom ? '100vh' : 'auto',
                                objectFit: 'cover',
                                transition: 'transform 0.3s ease-in-out, width 0.3s ease-in-out, height 0.3s ease-in-out'
                            }}
                            onClick={handleImageClick}
                        />
                    </div>
                </div>
                <div className="col-md-8">
                    <h2 className="mb-3" style={{ color: '#ff6347' }}>{movie.title}</h2>
                    <p><strong>Overview:</strong> {movie?.overview}</p>
                    <p><strong>Release Date:</strong> {movie?.release_date}</p>
                    <p><strong>Vote Average:</strong> {movie?.vote_average}</p>
                    <p><strong>Vote Count:</strong> {movie?.vote_count}</p>
                    <p><strong>Popularity:</strong> {movie?.popularity}</p>
                    <p><strong>Status:</strong> {movie?.status}</p>
                    <p><strong>Tagline:</strong> {movie?.tagline}</p>
                </div>
            </div>
        </div>
    )
}
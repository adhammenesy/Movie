import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import './Detailes.css'

function DetailesTv() {
    let { id } = useParams()
    const [people, setPeople] = useState({})
    const [error, setError] = useState(null)
    const [zoom, setZoom] = useState(false)

    async function getDetailesTv(id) {
        try {
            const res = await axios.get(`https://api.themoviedb.org/3/person/${id}?api_key=4e44d9029b1270a757cddc766a1bcb63&language=en-US`)
            setPeople(res.data)
        } catch (error) {
            setError(error)
        }
    }

    useEffect(() => {
        getDetailesTv(id)
    }, [id])

    if (error) return <div className='alert alert-danger text-center'>Error: {error.message}</div>
    if (!people) return <div className='alert alert-warning text-center'>Loading...</div>

    const handleImageClick = () => {
        setZoom(!zoom)
    }

    return (
        <div className="container mt-5">
            <h1 className="text-center mb-4" style={{ animation: 'fadeIn 1s ease-in-out', color: '#ff6347' }}>People Details</h1>
            <div className="row">
                <div className="col-md-4">
                    <div className="image-gallery">
                        <img 
                            src={`https://image.tmdb.org/t/p/w500/${people.profile_path}`} 
                            className={`img-fluid rounded mb-3`} 
                            alt={people.name} 
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
                    <h2 className="mb-3" style={{ color: '#ff6347' }}>{people.name}</h2>
                    <p><strong>Overview:</strong> {people?.overview}</p>
                    <p><strong>First Air Date:</strong> {people?.first_air_date}</p>
                    <p><strong>Vote Average:</strong> {people?.vote_average}</p>
                    <p><strong>Vote Count:</strong> {people?.vote_count}</p>
                    <p><strong>Popularity:</strong> {people?.popularity}</p>
                    <p><strong>Status:</strong> {people?.status}</p>
                    <p><strong>Tagline:</strong> {people?.tagline}</p>
                </div>
            </div>
        </div>
    )
}

export default DetailesTv

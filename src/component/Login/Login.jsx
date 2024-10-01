import React, { useState, useEffect } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { Helmet } from 'react-helmet'
import data from '../../Database/Data.json'
import Footer from '../Footer/Footer'
import Navbar from '../Navbar/Navbar'
export default function Login() {
  const [users, setUsers] = useState([])

  useEffect(() => {
    const loggedIn = JSON.parse(localStorage.getItem('isLoggedIn'))
    if (loggedIn && loggedIn.is) {
      window.location.href = '/home'
    } else {
      const storedUsers = localStorage.getItem('data')
      if (storedUsers) {
        setUsers(Array.isArray(storedUsers) ? JSON.parse(storedUsers) : [JSON.parse(storedUsers)])
      } else {
        setUsers(data)
      }
    }
  }, [])

  const validationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string().min(8, 'Must be at least 8 characters').required('Required'),
  })

  return (
    <>
    <Navbar/>
      <Helmet>
        <link rel="icon" href="https://th.bing.com/th/id/OIP.Rjaz0qU8IVp6eX2X3KHc5wHaHa?rs=1&pid=ImgDetMain" />
        <title>Login Page</title>
      </Helmet>
      <div className="container my-5">
        <h2 className='mb-3 text-center'>Login Now</h2>

        <Formik
          initialValues={{ email: '', password: '' }}
          validationSchema={validationSchema}
          onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {
              const user = users.find(user => user.email === values.email && user.password === values.password)
              if (user) {
                window.location.href = '/home'
                localStorage.setItem('isLoggedIn', JSON.stringify({ is: true, user: user }))
              } else {
                alert('Invalid credentials')
              }
              setSubmitting(false)
            }, 400)
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <div className="form-group mb-3">
                <label htmlFor="email" className="mb-3 fw-bolder fs-5">Email</label>
                <Field type="email" id="email" name='email' className="form-control" />
                <ErrorMessage name="email" component="div" className="alert alert-danger" role="alert" />
              </div>
              <div className="form-group mb-3">
                <label htmlFor="password" className="mb-3 fw-bolder fs-5">Password</label>
                <Field type="password" id="password" name='password' className="form-control" />
                <ErrorMessage name="password" component="div" className="alert alert-danger" role="alert" />
              </div>

              <button type="submit" className="btn btn-outline-info">
                {isSubmitting ? 'Logging...' : 'Login'}
              </button>
            </Form>
          )}
        </Formik>
      </div>
      <Footer/>
    </>
  )
}

import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'

export default function Home() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loggedIn = JSON.parse(localStorage.getItem('isLoggedIn'));
    if (!loggedIn || loggedIn.is === false) {
      window.location.href = '/login';
    } else {
      setUser(loggedIn.user);
    }
  }, []);

  if (!user) {
    return null;
  }

  const formik = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string().required('Password is required'),
    age: Yup.number().required('Age is required'),
    phone: Yup.string().required('Phone is required')
  });

  return (
    <>
      <Helmet>
        <link rel="icon" href="https://th.bing.com/th/id/OIP.Rjaz0qU8IVp6eX2X3KHc5wHaHa?rs=1&pid=ImgDetMain" />
        <title>Home Page</title>
      </Helmet>

      <h1 style={{ textAlign: 'center', marginTop: '2%', animation: 'fadeIn 1s ease-in-out' }}>Welcome Back, <span style={{ color: '#FFD700' }}>{user.name}</span></h1>

      <div className="account">
        {/* Edit Account  */}
        <div className="edit-account" style={{ textAlign: 'center', marginTop: '5%', animation: 'fadeIn 1s ease-in-out' }}>
          <button className='btn btn-outline-info' style={{ marginRight: '2%', animation: 'ToLeft 1s ease-in-out' }} data-bs-toggle="modal" data-bs-target="#settingsModal">Settings</button>

          <div className="modal fade bg-dark" id="settingsModal" tabIndex="-1" aria-labelledby="settingsModalLabel" aria-hidden="true">
            <div className="modal-dialog bg-dark">
              <div className="modal-content bg-dark">
                <div className="modal-header">
                  <h5 className="modal-title" id="settingsModalLabel">Settings</h5>
                  <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                  <Formik
                    initialValues={{ name: '', email: '', password: '', age: '', phone: '' }}
                    validationSchema={formik}
                    onSubmit={(values, { setSubmitting }) => {
                      setTimeout(() => {
                        setSubmitting(false);
                        const newData = { ...user, ...values };
                        localStorage.setItem('isLoggedIn', JSON.stringify({ is: true, user: newData }));
                        window.location.href = '/home';
                      }, 400);
                    }}
                  >
                    {({ isSubmitting }) => (
                      <Form className='form-control bg-dark'>
                        <div className="form-group mb-3">
                          <label htmlFor="name" className="mb-3 fw-bolder fs-5">Name</label>
                          <Field type="text" id="name" name='name' className="form-control" />
                          <ErrorMessage name="name" component="div" className="alert alert-danger" role="alert" />
                        </div>
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
                        <div className="form-group mb-3">
                          <label htmlFor="age" className="mb-3 fw-bolder fs-5">Age</label>
                          <Field type="number" id="age" name='age' className="form-control" />
                          <ErrorMessage name="age" component="div" className="alert alert-danger" role="alert" />
                        </div>
                        <div className="form-group mb-3">
                          <label htmlFor="phone" className="mb-3 fw-bolder fs-5">Phone</label>
                          <Field type="text" id="phone" name='phone' className="form-control" />
                          <ErrorMessage name="phone" component="div" className="alert alert-danger" role="alert" />
                        </div>
                        <button style={{ marginRight:`2%` }} type="submit" className="btn btn-outline-info" disabled={isSubmitting}>
                          Save Changes
                        </button>
                        <button type="button" className="btn btn-outline-danger" data-bs-dismiss="modal">Close</button>
                      </Form>
                    )}
                  </Formik>
                </div>
                <div className="modal-footer">
                </div>
              </div>
            </div>
          </div>
          <button className='btn btn-outline-danger' onClick={() => window.location.href = '/logout'} style={{ animation: 'ToRight 1s ease-in-out' }}>Logout</button>
        </div>
      </div>
    </>
  );
}

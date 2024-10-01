import React, { useEffect } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { Helmet } from 'react-helmet'
import data from '../../Database/Data.json'
import Footer from '../Footer/Footer'
import Navbar from '../Navbar/Navbar'
export default function Register() {

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (isLoggedIn) {
      window.location.href = '/home';
    }
  }, []);

  const formik = Yup.object().shape({
    name: Yup.string().required('Required'),
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string().min(8, 'Must be at least 8 characters').required('Required'),
    age: Yup.number().required('Required'),
    phone: Yup.string().required('Required'),
  })

  return <>
  <Navbar/>
  <Helmet>
    <link rel="icon" href="https://th.bing.com/th/id/OIP.Rjaz0qU8IVp6eX2X3KHc5wHaHa?rs=1&pid=ImgDetMain" />
    <title>Register Page</title>
  </Helmet>
    <div className="container my-5">
    <h2 className='mb-3 text-center'>Register Now </h2>

    <Formik
      initialValues={{ name: '', email: '', password: '', age: '', phone: '' }}
      validationSchema={formik}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          // alert(JSON.stringify(values, null, 2));
          setSubmitting(false);
          const newData = { ...data, ...values };
          data = newData
          console.log(data);
          localStorage.setItem('data', JSON.stringify(data));
          window.location.href = '/login'
        }, 400);
      }}
    >
      <Form>
        <div className="form-group mb-3">
          <label htmlFor="name " className="mb-3 fw-bolder fs-5">Name</label> 
          <Field type="text" id="name" name='name' className=" form-control" />
          <ErrorMessage name="name" component="div" className="alert alert-danger" role="alert" />
        </div>

        <div className="form-group mb-3">
          <label htmlFor="email " className="mb-3 fw-bolder fs-5">Email</label> 
          <Field type="email" id="email" name='email' className=" form-control" />
          <ErrorMessage name="email" component="div" className="alert alert-danger" role="alert" />
        </div>
        <div className="form-group mb-3">
          <label htmlFor="password" className="mb-3 fw-bolder fs-5">Password</label>
          <Field type="password" id="password" name='password' className=" form-control" />
          <ErrorMessage name="password" component="div" className="alert alert-danger" role="alert" />
        </div>
        <div className="form-group mb-3">
          <label htmlFor="age" className="mb-3 fw-bolder fs-5">Age</label>
          <Field type="number" id="age" name='age' className=" form-control" />
          <ErrorMessage name="age" component="div" className="alert alert-danger" role="alert" />
        </div>
        <div className="form-group mb-3">
          <label htmlFor="phone" className="mb-3 fw-bolder fs-5">Phone</label>
          <Field type="tel" id="phone" name='phone' className=" form-control" />
          <ErrorMessage name="phone" component="div" className="alert alert-danger" role="alert" />
        </div>

        <button type="submit" className=" btn btn-outline-info">
          {formik.isSubmitting ? 'Registering...' : 'Register'}
        </button>
      </Form>
    </Formik>
  </div>
  <Footer/>
  </>
}

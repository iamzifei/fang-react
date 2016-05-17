import React, {PropTypes} from 'react'
import SignupForm from '../components/SignupForm'
import { reduxForm } from 'redux-form'
import $ from 'jquery'
import { findUserByEmail, signupUser } from '../actions/UserActions'
import request from 'superagent';

export const fields = [ 'email', 'name', 'password', 'confirmPassword' ]

const validate = values => {
  const errors = {}
  if (!values.name) {
    errors.name = 'Required'
  } else if (values.name.length > 15) {
    errors.name = 'Must be 15 characters or less'
  }
  if (!values.email) {
    errors.email = 'Required'
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address'
  }
  if (!values.password) {
    errors.password = 'Required'
  } else if (values.password.length < 6 ) {
    errors.password = 'Password should be at least 6 characters'
  } else if (/\s/.test(values.password)){
    errors.password = 'Password cannot contain white space'
  } else if (values.password !== values.confirmPassword) {
    errors.confirmPassword = 'Confirm password is not equal to password'
  }
  return errors
}

const asyncValidate = (values) =>{
  return new Promise((resolve, reject) =>{
    request.get('/api/find_user/')
      .query({ email : values.email })
      .end((err, res) => {
        if (err) {
          reject({ email: 'An error occurs'})
        }else if(res.body.userFound){
          reject({email : 'Email is taken'})
        }else{
          resolve()
        }
      })
  })
}

const mySubmit = (values, dispatch) => {
  dispatch(signupUser(values))
}

function mapStateToProps(state) {
  return {
    currentUser: state.currentUser,
    isAuthenticated : state.userState.isAuthenticated,
    userFound : state.userState.userFound
  };
}

function mapDispatchToProps(dispatch){
  return {
    mySubmit
  }
}

export default reduxForm({
  form: 'signupForm',
  fields,
  asyncValidate,
  asyncBlurFields: [ 'email' ],
  validate
}, mapStateToProps, mapDispatchToProps)(SignupForm)

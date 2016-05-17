import React, {PropTypes} from 'react'
import Jumbotron from '../components/Jumbotron'
import Navbar from '../components/Navbar'
import LoginForm from '../components/LoginForm'
import $ from 'jquery'
import { reduxForm } from 'redux-form'
import { loginUser } from '../actions/UserActions'

const validate = values => {
  const errors = {}
  if (!values.email) {
    errors.email = 'Required'
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address'
  }
  if (!values.password) {
    errors.password = 'Required'
  } else if (/\s/.test(values.password)){
    errors.password = 'Password cannot contain white space'
  } else if (values.password.length < 6 ) {
    errors.password = 'Password should be at least 6 characters'
  }
  return errors
}

const mySubmit = (values, dispatch) => {
    dispatch(loginUser(values))
}

function mapStateToProps(state) {
  return {
    currentUser: state.userState.currentUser,
    isAuthenticated : state.userState.isAuthenticated,
    loginFailMessage : state.userState.loginFailMessage
   }
}

function mapDispatchToProps(dispatch){
  return{
    mySubmit
  }
}

export default reduxForm({
  form: 'loginForm',
  fields : ['email', 'password' ],
  validate
}, mapStateToProps, mapDispatchToProps)(LoginForm);

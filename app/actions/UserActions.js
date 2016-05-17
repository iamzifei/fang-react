import request from 'superagent';
import toastr from 'toastr'
import { push } from 'react-router-redux'

import {LOGIN_USER, LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT_USER, SIGNUP_USER,
SIGNUP_SUCCESS, SIGNUP_FAIL, USER_NOT_FOUND, USER_FOUND, USER_EXIST_IN_SESSION, USER_NOT_IN_SESSION
} from '../constants/ActionTypes'

export function loginUser(values){
  return (dispatch) =>{
    const userInfo = {
      email : values.email,
      password : values.password
    }
    return request.post('/api/login')
    .query(userInfo)
    .end((err, res) =>{
      if(err){
        console.log(err)
      }else if (res.body.message){
        dispatch(login_fail(res.body.message))
        dispatch(push('/login'))
      }else{
        dispatch(login_success(res.body))
        dispatch(push('/'))
      }
    })
  }
}
function login_success(user){
  saveUserToStorage(user)
  return{
    type : LOGIN_SUCCESS,
    currentUser : {
      email : user.email,
      name : user.name
    }
  }
}
function login_fail(message){
  return {
    type : LOGIN_FAIL,
    loginFailMessage : message
  }
}

export function logoutUser(){
  return (dispatch) =>{
    return request.get('api/logout')
    .end((err, res) =>{
      if(err){
        displayFailMessage(err.response)
      } else{
        removeUserFromStorage()
        dispatch(logoutComplete())
        dispatch(push('/'))
      }
    })
  }
}
function logoutComplete(){
  return{
    type: LOGOUT_USER
  }
}

export function findUserByEmail(email){
  return (dispatch) =>{
    return request.get('/api/find_user/')
      .query({ email })
      .end((err, res) => {
        if (err) {
          displayFailMessage(err.response)
        } else if (!res.body.userFound) {
          dispatch(userNotFound(email))
        } else if (res.body.userFound){
          dispatch(userFound(email))
        }
      })
  }
}
function userNotFound(email){
  return{
    type : USER_NOT_FOUND,
    email : email
  }
}
function userFound(email){
  return{
    type : USER_FOUND,
    email : email
  }
}

export function signupUser(values){
  return (dispatch) =>{
    const newUser = {
      email : values.email,
      name : values.name,
      password : values.password
    }
    return request.post('api/signup_user')
    .accept('application/json')
    .query(newUser)
    .end((err, res) =>{
      if(err){
        displayFailMessage(err.response)
        dispatch(signup_fail())
        dispatch(push('/signup'))
      } else{
        dispatch(loginUser(newUser))
      }
    })
  }
}
function signup_success(currentUser){
  return {
    type : SIGNUP_SUCCESS,
    currentUser : currentUser
  }
}
function signup_fail(){
  return {
    type: SIGNUP_FAIL,
  }
}

function saveUserToStorage(user){
  sessionStorage.isAuthenticated = true
  sessionStorage.currentUserEmail = user.email
  sessionStorage.currentUserName = user.name
}
function removeUserFromStorage(){
  sessionStorage.isAuthenticated = false
  sessionStorage.currentUserEmail = ''
  sessionStorage.currentUserName = ''
}

export function loadUserFromSession(){
  return (dispatch) =>{
    return request.get('api/loadUserFromSession')
    .end((err, res) =>{
      if(err){
        console.log(err)
      } else if (res.body){
        dispatch(login_success(res.body))
      }
    })
  }
}

function displayFailMessage(error){
  toastr.error(error)
}

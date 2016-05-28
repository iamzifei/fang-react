import request from 'superagent';
import toastr from 'toastr'
import { push } from 'react-router-redux'
import 'whatwg-fetch'

import {LOGIN_USER, LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT_USER, SIGNUP_USER,
SIGNUP_SUCCESS, SIGNUP_FAIL, USER_NOT_FOUND, USER_FOUND, USER_EXIST_IN_SESSION, USER_NOT_IN_SESSION
} from '../constants/ActionTypes'

export function loginUser(values){
  return (dispatch) =>{
    const userInfo = {
      email : values.email,
      password : values.password
    }
    fetch('/api/login', {
      method : 'post',
      headers : {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body : JSON.stringify(userInfo)
    })
    .then(function(response){
      return response.json()
    })
    .then(function(json){
      if (json.message){
        dispatch(login_fail(json.message))
        dispatch(push('/login'))
      }else if(json.token){
        saveTokenToStorage(json.token)
        dispatch(login_success(json))
        dispatch(push('/'))
      }else {
        //other error
        console.log(json)
      }
    })
    .catch(function(ex){
      console.log('parsing failed', ex)
    })
  }
}
function login_success(user){
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
    const token = readTokenFromStorage()
    fetch('/api/logout', {
      method : 'post',
      headers : {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body : JSON.stringify({ token })
    })
    .then(function(response){
      return response.json()
    })
    .then((json)=>{
      if(json.success){
        removeTokenFromStorage()
        dispatch(logoutComplete())
        dispatch(push('/'))
      }else{
        //handle err
        console.log(json)
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
    fetch('/api/signup_user', {
      method : 'post',
      headers : {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body : JSON.stringify(newUser)
    })
    .then(res => {
      return res.json()
    })
    .then(json => {
      if(json.currentUser){
        dispatch(signup_success(json.currentUser))
        dispatch(loginUser(newUser))
      }
      else {
        dispatch(signup_fail())
        dispatch(push('/signup'))
      }
    })
  }
}
function signup_success(currentUser){
  return {
    type : SIGNUP_SUCCESS
  }
}
function signup_fail(){
  return {
    type: SIGNUP_FAIL,
  }
}

function saveTokenToStorage(token){
  localStorage.access_token = token
}
function readTokenFromStorage(){
  return localStorage.access_token
}
function removeTokenFromStorage(){
  localStorage.removeItem('access_token')
}

export function loadUserFromToken(){
  return (dispatch) =>{
    var token = readTokenFromStorage()
    if(typeof(token) != 'undefined'){
      fetch('/api/loadUserFromToken', {
        method : 'post',
        headers : {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body : JSON.stringify({ token })
      })
      .then(res =>{
        return res.json()
      })
      .then(json =>{
        if (json.email){
          dispatch(login_success(json))
        }else {
          console.log(json)
        }
      })
    }
  }
}

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response
  } else {
    var error = new Error(response.statusText)
    error.response = response
    throw error
  }
}

function displayFailMessage(error){
  toastr.error(error)
}

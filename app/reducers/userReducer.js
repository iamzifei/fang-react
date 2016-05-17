import {LOGIN_USER, LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT_USER, SIGNUP_USER,
SIGNUP_SUCCESS, SIGNUP_FAIL, USER_NOT_FOUND, USER_FOUND, USER_NOT_IN_SESSION, USER_EXIST_IN_SESSION
} from '../constants/ActionTypes'


export default function(state = {}, action){
  switch(action.type){
    case USER_NOT_IN_SESSION :
      return{
        isAuthenticated: false,
        user : {}
      }
    case USER_EXIST_IN_SESSION:
      return{
        isAuthenticated : action.isAuthenticated,
        currentUser : action.currentUser
      }
    case USER_NOT_FOUND :
      return{
        userFound : false
      }
    case USER_FOUND :
      return {
        userFound : true
      }
    case LOGIN_USER:
      return {}
    case LOGOUT_USER:
      return{
        isAuthenticated: false,
        user : {}
      }
    case LOGIN_SUCCESS:
      return Object.assign({}, state, {
        isAuthenticated: true,
        currentUser : action.currentUser,
        loginFailMessage : ''
      })
    case LOGIN_FAIL:
      return Object.assign({}, state, {
        isAuthenticated: false,
        loginFailMessage : action.loginFailMessage
      })
    case SIGNUP_USER:
      return Object.assign({}, state, {

      })
    case SIGNUP_SUCCESS:
      return Object.assign({}, state, {
        isAuthenticated : true,
        currentUser : action.currentUser
      })
    case SIGNUP_FAIL:
      return Object.assign({}, state, {
        isAuthenticated : false
      })
    default:
      return state;
  }
}

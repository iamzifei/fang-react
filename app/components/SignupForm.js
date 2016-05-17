import React, {PropTypes} from 'react'
import Navbar from '../components/Navbar'
import Jumbotron from '../components/Jumbotron'

export default class SignupForm extends React.Component {

  constructor(props) {
    super(props)
  }

  componentWillMount(){
  }

  componentDidMount() {

  }

  render() {
    const {asyncValidating, fields: { email, name, password, confirmPassword }, resetForm, handleSubmit, submitting } = this.props
    return (
    <div>
      <Navbar pageFlag="home" />
      <Jumbotron />
      <div className="container">
          <div className='col-md-6 col-md-offset-3'>
          <div className='panel panel-default'>
            <div className='panel-heading'>Creating a new account</div>
            <div className='panel-body'>
                  <form onSubmit={handleSubmit(this.props.mySubmit.bind(this))}>
                    <div className={'form-group'}>
                        <label className='control-label'>Email</label>
                        {email.touched && email.error && <div>{email.error}</div>}
                        <input type='text' className='form-control' placeholder="Email" {...email}/>
                        {asyncValidating === 'email' && <i /* spinning cog *//>}
                    </div>
                    <div className={'form-group'}>
                        <label className='control-label'>Name</label>
                        {name.touched && name.error && <div>{name.error}</div>}
                        <input type='text' className='form-control' placeholder="name" {...name}/>
                    </div>
                    <div className={'form-group'}>
                        <label className='control-label'>Password</label>
                        {password.touched && password.error && <div>{password.error}</div>}
                        <input type='password' className='form-control' placeholder="Password" {...password}/>

                    </div>
                    <div className={'form-group'}>
                        <label className='control-label'>Confirm Password</label>
                        {confirmPassword.touched && confirmPassword.error && <div>{confirmPassword.error}</div>}
                        <input type='password' className='form-control' placeholder="Confirm password" {...confirmPassword}/>
                    </div>
                      <button type='submit' className='btn btn-primary'>Signup</button>
                  </form>
                </div>
              </div>
            </div>
          </div>
      </div>
    )
  }
}

import React, {PropTypes} from 'react'
import Jumbotron from '../components/Jumbotron'
import Navbar from '../components/Navbar'

export default class LoginForm extends React.Component {

  constructor(props) {
    super(props)
  }

  componentDidMount() {
  }

  render() {
    const { fields: { email, password }, resetForm, handleSubmit, submitting } = this.props

    return (
      <div>
        <Navbar pageFlag="home" />
        <Jumbotron />

        <div className="container">
            <div className='col-md-6 col-md-offset-3'>
            <div className='panel panel-default'>
              <div className='panel-heading'>Already have a account?</div>
              <div className='panel-body'>
                <form onSubmit={handleSubmit(this.props.mySubmit.bind(this))}>
                  <div className={'form-group'}>
                    <label className='control-label'>Email</label>
                    {email.touched && email.error && <div>{email.error}</div>}
                    <input type='text' className='form-control' placeholder="Email" {...email}/>
                  </div>
                  <div className={'form-group'}>
                    <label className='control-label'>Password</label>
                    {password.touched && password.error && <div>{password.error}</div>}
                    <input type='password' className='form-control' placeholder="Password" {...password}/>
                  </div>
                  {this.props.loginFailMessage ?
                    <div>Login failed, {this.props.loginFailMessage} Please try again.</div>
                    :<div></div>
                  }
                    <button type='submit' className='btn btn-primary'>Login</button>
                </form>
              </div>
            </div>
          </div>
        </div>

      </div>
    )
  }
}

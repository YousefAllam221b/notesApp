import React from 'react';


class LoginButton extends React.Component{

  state = {
    missingInfo: false,
    usernameTaken: false
  }

  username = React.createRef();
  password = React.createRef();

  handleLoginButton = async(e) => {
    e.preventDefault();
    let username = this.username.current.value;
    let password = this.password.current.value;
    if (username === "" || password === "")
      this.state.missingInfo = true
    else 
    {
      this.state.missingInfo = false;
      const data = await this.props.getInfo(username, password);
      if (data) {
        this.state.wrongInfo = false
        this.props.userLogin(username, password, data);
      } else {
        this.state.wrongInfo = true
      }
    }
      
    this.forceUpdate();
  }

  checkUsername = async(username) =>
  {
    const response = await fetch(`http://localhost:5000/register/${username}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
    });
    return await response.json();
  }

  handleRegisterButton = async(e) => {
    e.preventDefault();
    if (this.username.current.value === "" || this.password.current.value === "")
      this.state.missingInfo = true
    else 
    {
      this.state.missingInfo = false
      if(await this.checkUsername(this.username.current.value))
      {
        this.forceUpdate();
        this.state.usernameTaken = true
      } else
      {
        // Register
        this.state.usernameTaken = false
        this.props.userRegister(this.username.current.value, this.password.current.value);
      }
    }
    this.forceUpdate();
  }

  render()
  {
    return (
      <div>
          <form id = 'loginForm' className='d-flex flex-column justify-content-center'>
            <div className='d-flex'>
              <div className='d-flex flex-column'>
                <input
                  type = 'text'
                  ref = {this.username}
                  placeholder = "Enter Username"
                  id = 'usernameInput'
                />
                <input
                  type = 'text'
                  ref = {this.password}
                  placeholder = "Enter Password"
                  id = 'passwordInput'
                />
              </div>
              <div className='d-flex flex-column'>
              <input
                id = 'loginButton'
                type = 'button'
                value = 'Login'
                onClick = {this.handleLoginButton}
              />
              <input
                id = 'registerButton'
                type = 'button'
                value = 'Register'
                onClick = {this.handleRegisterButton}
              />      
            </div>
            
            </div>
            
          </form>
          <div className='d-flex justify-content-center'> 
              {(this.state.missingInfo || this.state.missingInfo) && <div className="invalid-feedback">
                  Please enter Username and Password
              </div>}
              {this.state.usernameTaken && <div className="invalid-feedback">
                Username already taken
              </div>}
              {this.state.wrongInfo && <div className="invalid-feedback">
                Wrong Username or Password
              </div>}
            </div>
          </div>
    );
  }
}

export default LoginButton;

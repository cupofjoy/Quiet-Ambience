import React, { Component } from 'react'
// import { Link } from 'react-router-dom';

export default class RegistrationForm extends Component {
  state = {
    username: "",
    password: "",
    errors: false
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit = (event) => {
    event.preventDefault();
    let config = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(this.state)
    }

    fetch('http://localhost:4000/users', config)
      .then(r => r.json())
      .then(d => {
        // localStorage.setItem('token', d.token);
        // this.props.history.push("/login")
        if (d.errors) {
          this.setState({errors: true, username: "", password: ""})
        } else {
          this.setState({username: "", password: ""})
        }
      })
  }

  render() {
    return (
      <div className="grouped fields" id="registration">
        <h1>Create New User</h1>
        <form onSubmit={this.handleSubmit}>
          {
            this.state.errors ?
              <div class="ui message" style={{opacity: '0.7'}}>
                <div class="header">We had some issues</div>
                  Username taken or missing field <br/>
                  Please try again
              </div>
            :
              null
          }
          <div className="four wide field">
            <div className="ui left icon input">
              <input
                type="text"
                name="username"
                placeholder="Username"
                onChange={this.handleChange}
                value={this.state.username}
                autoComplete="username"
                required
              />
            <i className="user icon"></i>
            </div>
          </div><br/>
        <div className="four wide field">
            <div className="ui left icon input">
              <input
                type="password"
                name="password"
                id="password"
                placeholder="Password"
                onChange={this.handleChange}
                value={this.state.password}
                autoComplete="password"
                required
              /><br/><br/>
            <i className="lock icon"></i>
            </div>
          </div><br/>
        <input type="submit" value="register" className="ui teal small button"/>
        </form><br/><br/><br/>
      {/* <Link className="ui teal mini button" to="/login" > Already a User? Login Here </Link> */}
      </div>
    )
  }
}

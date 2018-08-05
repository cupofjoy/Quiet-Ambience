import React, { Component } from 'react'
import { connect } from 'react-redux'
// import { Link } from 'react-router-dom';
import { Modal, Button } from 'semantic-ui-react'

import RegistrationForm from './RegistrationForm.js'

class LoginForm extends Component {
  state = {
    username: "",
    password: "",
    currentUser: {},
    open: false,
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
      body: JSON.stringify({username: this.state.username, password: this.state.password})
    }

    fetch('http://localhost:4000/sessions', config)
      .then(r => r.json())
      .then(d => {
        if (!d.errors) {
          localStorage.setItem('token', d.token);
          localStorage.setItem('user', d.username)
          this.setState(
            {currentUser: d, username: "", password: ""},
            () => {
              let currentUser = {
                username: this.state.currentUser.username,
                id: this.state.currentUser.id,
                token: this.state.currentUser.token
              }
              let photos = this.state.currentUser.photos
              this.props.addCurrentUser(currentUser, photos)
              this.props.history.push("/collection");
            }
          )
        } else {
          this.setState({errors: true, username: "", password: ""})
        }
      })
    }

  show = size => () => this.setState({size, open: true})
  close = () => this.setState({open: false})

  render() {
    return (
      <div className="grouped fields" id="login">
        <form onSubmit={this.handleSubmit}>
          {
            this.state.errors ?
              <div className="ui form error message" style={{opacity: '0.7', textAlign: 'center'}}>
                <div className="header">We had some issues</div>
                No Account found with that username/password combination<br/>
                Please Try Again
              </div>
            :
              null
          }
          <div className="field">
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
          <div className="field">
            <div className="ui left icon input">
              <input
                type="password"
                name="password"
                id="password"
                placeholder="Password"
                autoComplete="password"
                onChange={this.handleChange}
                value={this.state.password}
                required
              /><br/><br/>
              <i className="lock icon"></i>
            </div>
          </div><br/>
        <input type="submit" value="login" className="ui teal button"/>
        </form><br/><br/><br/>
        {/* <Link to="/registration" className="ui teal tiny button">Or Create New Account</Link> */}
        <Modal
          size={this.state.size}
          open={this.state.open}
          trigger={<Button className="ui teal tiny button" onClick={this.show('tiny')}> Or Create New Account </Button>}
          centered={true}
          dimmer={'inverted'}
        >
          <Modal.Content style={{backgroundColor: '#009999', opacity: '0.6'}}>
            <Button className="ui teal mini button" onClick={this.close}>Close</Button>
            <RegistrationForm className="registrationlogin"/>
          </Modal.Content>
        </Modal>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  // console.log("mapstate", state.currentUser);
  return {
    currentUser: state.currentUser
  };
};

const mapDispatchToProps = (dispatch) => ({
  addCurrentUser: (currentUser, photos) => dispatch({
    type: "ADD_CURRENT_USER",
    payload: {
      currentUser: currentUser,
      photos: photos,
      filteredPhotos: photos
    }
  })
})

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm)

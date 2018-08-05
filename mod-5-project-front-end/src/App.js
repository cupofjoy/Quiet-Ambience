import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Route, withRouter } from 'react-router-dom'
import './App.css'

import NavBar from './components/NavBar.js'
import Collection from './containers/Collection.js'
import LoginForm from './components/LoginForm.js'
import RegistrationForm from './components/RegistrationForm.js'
import WelcomePage from './components/WelcomePage.js'
import PhotoDetail from './components/PhotoDetail.js'
import Favorites from './components/Favorites.js'
import SharedPhotos from './components/SharedPhotos.js'
import Account from './components/Account.js'
import Actions from './actions.js'
import { library } from '@fortawesome/fontawesome-svg-core'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStroopwafel } from '@fortawesome/free-solid-svg-icons'

library.add(faStroopwafel)

class App extends Component {
  state = {
    username: "",
    password: "",
    currentUser: {}
  }

  componentDidMount() {
    if (localStorage.getItem('user')) {
      this.handleRefresh()
    }
  }

  handleRefresh = () => {
    let user = localStorage.getItem('user')
    let token = localStorage.getItem('token')
    let config = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({username: user, token: token})
    }

    fetch('http://localhost:4000/sessions', config)
      .then(r => r.json())
      .then(d => {
        if (!d.errors) {
          localStorage.setItem('token', d.token);
          this.setState(
            {currentUser: d},
            () => {
              let currentUser = {
                username: this.state.currentUser.username,
                id: this.state.currentUser.id,
                token: this.state.currentUser.token
              }
              let photos = this.state.currentUser.photos
              this.props.addCurrentUser(currentUser, photos)
              this.props.history.push("/collection")
            }
          )
        }
      })
  }

  render() {
    return (
      <div className="App">
        <NavBar />
        <div className="content">
          <Route exact path="/" component={ (props) => <WelcomePage {...props} /> }/>
          <Route exact path="/collection" component={ (props) => <Collection {...props} store={this.props.store} /> }/>
          <Route exact path="/registration" component={ (props) => <RegistrationForm {...props} /> }/>
          <Route exact path="/login" component={ (props) => <LoginForm {...props} store={this.props.store} /> }/>
          <Route exact path="/photo" component={ (props) => <PhotoDetail {...props} /> }/>
          <Route exact path="/favorites" component={ (props) => <Favorites {...props} /> }/>
          <Route exact path="/shared" component={ (props) => <SharedPhotos {...props} /> }/>
          <Route exact path="/account" component={ (props) => <Account {...props} /> }/>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.currentUser
  }
}

const mapDispatchToProps = (dispatch) => ({
  addCurrentUser: (currentUser, photos) => dispatch(Actions.addCurrentUser(currentUser, photos))
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));

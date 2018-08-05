import React, { Component, Fragment } from 'react';
import { Link, withRouter } from 'react-router-dom';
import Adapter from '../Adapter';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Actions from '../actions.js'

class NavBar extends Component {
  handleClick = () => {
    this.props.removeCurrentUser()
    localStorage.removeItem('token')
    localStorage.removeItem('user')
  }

  render() {
    return (
      <header className="nav">
        { !Adapter.isLoggedIn() ?
          <Fragment>
            <div className="ui icon large blue menu">
              <Link className="ui inverted item" to="/">
                <i className="home icon"/>
              </Link>
              <div className="right menu">
                {/* <Link className="ui item" to="/registration" ><i className="user outline icon"/> Registration</Link> */}
                <Link className="ui item" to="/login"><i className="sign in alternative icon"/> Login</Link>
              </div>
            </div>
          </Fragment>
            :
          <Fragment>
            <div className="ui large blue menu">
              <Link className="ui basic inverted item" to="/"><i className="home icon"/></Link>
              <Link className="ui basic inverted item" to="/collection"><i className="camera retro icon"/>Personal Collection</Link>
              <Link className="ui basic inverted item" to="/favorites"><i className="heart red icon"></i>Favs</Link>
              <Link className="ui basic inverted item" to="/shared"><i className="images outline icon"></i>Shared Photos</Link>
              <div className="right menu">
                {/* <Link className="ui basic inverted item" to="/account">Account <i className="user icon"/></Link> */}
                <Link className="ui basic inverted item" to="/account">Account <i className="user icon"/></Link>
                <Link className="ui basic inverted item" onClick={ () => {this.handleClick()}} to="/">Logout <i className="log out icon"/></Link>
              </div>
            </div>
          </Fragment>
        }
      </header>
    )
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  removeCurrentUser: () => dispatch(Actions.removeCurrentUser())
}, dispatch)

export default withRouter(connect(null, mapDispatchToProps)(NavBar))

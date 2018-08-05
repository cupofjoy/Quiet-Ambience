import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { Button, Modal, Form, Card, Image } from 'semantic-ui-react'
import Actions from '../actions.js'

class Account extends Component {
  state = {
    username: this.props.currentUser.username,
    password: "",
    open: false,
    photos: []
  }

  calculatedSharedPhotos = () => {
    let count = 0
    for(let i = 0; i < this.props.photos.length; i++) {
      if (this.props.photos[i].shared) {
        count += 1
      }
    }
    return count
  }

  show = size => () => this.setState({size, open: true})
  close = () => this.setState({open: false}, () => {console.log(this.state.open)})

  handleSubmit = (event) => {
    event.preventDefault();
    console.log("account currentUser", this.props.currentUser);
    let URL = `http://localhost:4000/users/${this.props.currentUser.id}`
    // debugger
    let config = {
      method: "PATCH",
      headers: { "Content-Type": "application/json", "Authorization": localStorage.getItem('token') },
      body: JSON.stringify({username: this.state.username, password: this.state.password})
    }

    fetch(URL, config)
      .then(r => r.json())
      .then(d => {
        if (!d.errors) {
          localStorage.setItem('token', d.token);
          localStorage.setItem('user', d.username);
          this.setState(
            {currentUser: d, username: "", password: ""},
            () => {
              let currentUser = {
                username: this.state.currentUser.username,
                id: this.state.currentUser.id,
                token: this.state.currentUser.token
              }
              let photos = this.state.photos
              // debugger
              this.props.addCurrentUser(currentUser, photos)
            }
          )
        }
      })
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    }, () => {console.log("edit username", this.state)})
  }

  mapPhotos = () => {
    let photos = this.props.photos
    let filteredPhotos

    if (photos.length >= 1) {
      filteredPhotos = photos.filter((photo) => {
        return photo.shared === true
      })
    }

    if (filteredPhotos) {
      return filteredPhotos.map((photo) => {
        return this.handlePhotoThumbnail(photo)
      })
    }
  }

  handlePhotoThumbnail = (photo) => {
    return (
      <Card raised={true} centered={true} photo={photo} key={photo.attachment.url} onClick={() => this.handleClick(photo)}>
        <Image
          src={photo.attachment.url}
          centered={true}
          style={{width: '220px', height: '160px'}}
        />
      </Card>
    )
  }

  handleClick = (event, photo) => {
    // let photo = this.props.photo
    debugger
    this.props.addCurrentPhoto(event)
    this.props.history.push('/photo')
  }

  updateUser = () => {
    return (
      <Modal trigger={<Button basic onClick={this.show('mini')}>Edit Username</Button>} open={this.state.open}>
        <Modal.Content>
          <Form onSubmit={this.handleSubmit}>
            <Form.Field inline>
              <label>Username</label><br/>
              <input placeholder="username" value={this.state.username} name="username" onChange={this.handleChange}/><br/>
              <label>Enter password to change username:</label><br/>
              <input placeholder="password" value={this.state.password} name="password" onChange={this.handleChange}/>
            </Form.Field>
            <Button type="submit" className="ui teal mini button">Submit</Button>
          </Form><br/>
          <Button className="ui teal mini button" onClick={this.close}>Close</Button><br/>
        </Modal.Content>
      </Modal>
    )
  }

  render() {
    return (
      <div style={{marginTop: '20px', backgroundColor: '#3cc7ea', minHeight: '1000px'}}>
        <h2 className="ui horizontal divider grey header">My Account</h2> <br/>
        <p>
          Username: {this.props.currentUser.username} </p>
          {this.updateUser()}
          {
            this.props.photos.length ?
              <Fragment>
                <h2 className="ui horizontal divider grey header">Shared Photos</h2> <br/>
                  {/*
                    <p>
                      Number of Photos: {this.props.photos.length}<br/><br/>
                      Number of Shared Photos: {this.calculatedSharedPhotos()}
                    </p>
                    */}
                <Card.Group itemsPerRow={8} centered id='mappedPhotos'>
                  {this.mapPhotos()}
                </Card.Group>
              </Fragment>
            :
              null
          }
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.currentUser,
    photos: state.photos,
    currentPhoto: state.currentPhoto
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addCurrentUser: (currentUser, photos) => dispatch({
      type: "ADD_CURRENT_USER",
      payload: {
        currentUser: currentUser,
        photos: photos,
        filteredPhotos: photos
      }
    }),
    addCurrentPhoto: (photo) => dispatch(Actions.addCurrentPhoto(photo))
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Account));

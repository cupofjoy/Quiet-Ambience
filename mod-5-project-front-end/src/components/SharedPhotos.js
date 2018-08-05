import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { Card, Image, Icon, Button } from 'semantic-ui-react'

class SharedPhotos extends Component {
  state = {
    photos: []
  }

  componentDidMount() {
    this.fetchSharedPhotos()
  }

  fetchSharedPhotos = () => {
    const URL = `http://localhost:4000/shared`

    fetch(URL)
      .then(r => r.json())
      .then(d => {
        this.setState({photos: d})
      })
  }

  handleLikes = (event) => {
    let photoId = event.target.id
    const URL = `http://localhost:4000/shared/${photoId}`

    let config = {
      method: "PATCH",
      headers: {"Content-Type": "application/json"},
    }
    fetch(URL, config)
      .then(r => r.json())
      .then(d => {
        let foundPhoto = this.state.photos.find((shared) => {return shared.id === d.id})
        // console.log("shared photo on click", foundPhoto);
        // debugger
        foundPhoto.likes += 1
        this.setState({
          photos: this.state.photos
        }, () => {
          console.log("shared photos", this.state.photos)
        })
      })
  }

  sharedPhotoCards = (shared) => {
    let photo = shared.photo
    if (photo) {
      return (
        <Card color="teal" className="sharedPhoto" raised={true} centered={true} key={photo.id}>
          <Image
            src={photo.attachment.url}
            centered={true}
            style={{width: '400px', height: '200px'}}
          />
        <Card.Meta>
            <Icon name="paw" /><br/>
            Username: {`${shared.user.username}`}
        </Card.Meta>
        <Card.Content extra>
          <Button basic id={photo.id} onClick={this.handleLikes} fluid>
            <Icon id={photo.id} name="star" label="likes"/>{shared.likes}
          </Button>
        </Card.Content>
        </Card>
      )
    }
  }

  mapShared = () => {
    if (this.state.photos.length >= 1) {
      return this.state.photos.map((shared) => {
        return this.sharedPhotoCards(shared)
      })
    }
  }

  render() {
    return (
      <div style={{background: 'linear-gradient(to bottom, #3cc7ea 0%, #00F1F9 100%)', minHeight: '1000px'}}>
        <h2 className="ui horizontal divider grey header" id="sharedphotocollection">Shared Photos</h2>
        <Card.Group itemsPerRow={5} centered id='mappedPhotos'>
          {this.mapShared()}
        </Card.Group>
      </div>
    )
  }
}

export default connect()(SharedPhotos)

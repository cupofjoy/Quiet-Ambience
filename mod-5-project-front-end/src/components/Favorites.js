import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { Card, Image, Icon } from 'semantic-ui-react'
import Actions from '../actions.js'

class Favorites extends Component {
  handleClick = (photo) => {
    this.props.addCurrentPhoto(photo)
    this.props.history.push('/photo')
  }

  mapFavorites = () => {
    if (this.props.photos) {
      let favorites = this.props.photos.filter((photo) => {
        return photo.favorite
      })

      return favorites.map((photo) => {
        return (
          <Card key={photo.id} raised={true} centered={true} onClick={() => {this.handleClick(photo)}}>
            <Image
              src={photo.attachment.url}
              centered={true}
              style={{width: '400px', height: '200px'}}
            />
            <Card.Content>
              <a>
                <Icon name="tag"/>
                {photo.tags}
              </a>
            </Card.Content>
          </Card>
        )
      })
    }
  }
  render() {
    return (
      <div className="favorites">
        <h2 className="ui horizontal divider grey header">Favorites</h2>
        <Card.Group itemsPerRow={5} centered id='mappedPhotos'>
          {this.mapFavorites()}
        </Card.Group>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    photos: state.photos,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addCurrentPhoto: (photo) => dispatch(Actions.addCurrentPhoto(photo))
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Favorites))

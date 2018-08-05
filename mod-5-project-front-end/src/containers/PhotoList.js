import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import PhotoThumbnail from '../components/PhotoThumbnail.js'
import UploadImage from '../components/UploadImage.js'
import SearchForm from '../components/SearchForm.js'
import { Grid, Segment, Card, List } from 'semantic-ui-react'
import '../App.css'
import Actions from '../actions.js'

class PhotoList extends Component {
  mapPhotos = () => {
    let photos = this.props.photos
    let searchTerm = this.props.searchTerm
    let filteredPhotos

    if (photos.length >= 1) {
      filteredPhotos = photos.filter((photo) => {
        return photo.tags.includes(searchTerm) || photo.name.includes(searchTerm) || photo.expressions.includes(searchTerm)
      })
    }

    if (filteredPhotos) {
      return filteredPhotos.map((photo) => {
        return <PhotoThumbnail photo={photo} key={photo.id} />
      })
    }
  }

  mapTags = () => {
    // console.log("photolist photos", this.props.photos);
    if ((this.props.photos !== [] || this.props.photos.length !== undefined) && this.props.currentUser.id) {
      return (
        <List divided animated relaxed>
          {this.handleTags(this.props.photos, this.props.currentUser)}
        </List>
      )
    } else {
      return null
    }
  }

  handleTags = (photos, currentUser) => {
    if (photos !== undefined) {
      if ((photos.length > 0 ) && currentUser.id) {
        let tags = [];
        for (let i = 0; i < photos.length; i++) {
          let tagsArr = photos[i].tags.split(', ')
          for (let j = 0; j < tagsArr.length; j++) {
            if (!tags.includes(tagsArr[j])) {
              tags.push(tagsArr[j])
            }
          }
        }
        return tags.map((tag) => {
          return (
            <List.Item key={tag}>
              <List.Content onClick={this.handleClick}>
                {tag}
              </List.Content>
            </List.Item>
          )
        })
      }
    }
  }

  handleClick = (event) => {
    let searchTerm = event.target.innerText
    this.props.filterPhotos(searchTerm)
  }

  mapCollection = () => {
    if (this.props.photos !== [] && this.props.currentUser.id && this.props.photos.length >= 1) {
      return (
        <Fragment>
          <div className="collection"><br/>
            <h2 className="ui horizontal divider grey header">Photo Collection</h2> <br/>
            <SearchForm /><br/><br/>
            <Card.Group itemsPerRow={5} centered id='mappedPhotos'>
              {this.mapPhotos()}
            </Card.Group>
          </div>
        </Fragment>
      )
    } else {
      return null
    }
  }

  render() {
    return (
      <Grid columns={2} relaxed className="photolist">
        <Grid.Row stretched centered={true}>
          <Grid.Column width={4} textAlign={"center"} className="gridcolumn">
            <Segment className="tagList" >
              <h3 className="ui horizontal divider teal header">Tags</h3>
              { this.mapTags() }
            </Segment>
          </Grid.Column>
          <Grid.Column stretched verticalAlign={"middle"} centered="true" width={11} className="gridcolumn">
            <Segment id="uploadimage">
              { this.props.currentUser.id ? <UploadImage /> : null }
            </Segment>
            <Segment id="photocollection">
              { this.mapCollection() }
            </Segment>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.currentUser,
    photos: state.photos,
    filteredPhotos: state.filteredPhotos,
    searchTerm: state.searchTerm
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    mapPhotosToState: (photos) => dispatch(Actions.addPhoto(photos)),
    filterPhotos: (searchTerm) => dispatch(Actions.addSearchTerm(searchTerm))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PhotoList)

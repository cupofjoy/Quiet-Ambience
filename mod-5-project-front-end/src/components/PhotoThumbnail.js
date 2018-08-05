import React, { Component } from 'react'
import { connect } from 'react-redux'
import '../App.css'
import { withRouter } from 'react-router-dom'
import { Card, Image } from 'semantic-ui-react'
import Actions from '../actions.js'

class PhotoThumbnail extends Component {
  handleClick = () => {
    let photo = this.props.photo
    console.log("PhotoThumbnail photo", this.props.photo);
    this.props.addCurrentPhoto(photo)
    this.props.history.push('/photo')
  }

  render() {
    return (
      <Card raised={true} centered={true} onClick={this.handleClick}>
        <Image
          src={this.props.photo.attachment.url}
          centered={true}
          style={{width: '220px', height: '150px'}}
        />
      </Card>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    currentPhoto: state.currentPhoto,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addCurrentPhoto: (photo) => dispatch(Actions.addCurrentPhoto(photo))
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PhotoThumbnail))

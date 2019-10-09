import React, { Component } from 'react'
import Dropzone from 'react-dropzone';
import { connect } from 'react-redux'
import Adapter from '../Adapter.js'
import Actions from '../actions.js'
import Config from '../config.js'
import '../App.css'


class UploadImage extends Component {
  readFiles = (acceptedFiles) => {
    acceptedFiles.forEach(file => {
      // debugger
      this.sendImageThroughRecognition(file)
      setTimeout(() => {}, 2000);
    });
  }

  handleSubmit = (event) => {
    event.persist()
    event.preventDefault();

    let photo = event.target[0].files[0]
    console.log("currentUser on submit", this.props.currentUser);

    this.sendImageThroughRecognition(photo)
  }

  fetchUser = () => {
    let URL = `http://localhost:4000/users/${this.props.currentUser.id}`

    fetch(URL)
      .then(r => r.json())
      .then(d => {
        let photos = d.photos
        this.props.addPhoto(photos)
      })
  }

  sendImageThroughRecognition = (photo, formData) => {
    const URL = `https://vision.googleapis.com/v1/images:annotate?key=${Config.API_KEY()}`

    let reader = new FileReader()
    let result
    // debugger
    reader.readAsDataURL(photo)
    reader.onloadend = () => {
      result = reader.result.replace(/^data:image\/(png|jpeg|jpg);base64,/, '')

      let config = Adapter.createFileReader(result)

      fetch(URL, config)
        .then(r => r.json(r))
        .then(d => this.handleData(photo, d))
    }
  }

  handleData = (photo, data) => {
    let results = Adapter.handleData(data)
    let descriptionString = results.descriptionString
    let colorsString = results.colorString
    let faceArr = results.faceResults

    let expressionString = Adapter.handleExpressions(faceArr)

    this.sendImageToController(photo, descriptionString, colorsString, expressionString)
  }

  sendImageToController = (photo, description, colors, expressions) => {
    const URL = 'http://localhost:4000/photos'

    let config = Adapter.createFormData(photo, description, colors, expressions, this.props.currentUser.id)

    fetch(URL, config)
      .then(r => r.json())
      .then(d => this.fetchUser())
  }

  render() {
    return (
      <div className="FileUpload">
        { <Dropzone
            className="dropzone"
            style={ this.dropZoneStyle }
            multiple={true}
            accept="image/png, image/jpeg"
            url="/file/post"
            onDrop={this.readFiles}>
            <p>Drop an image</p>
            <p>or</p>
            <p>click to select a image to upload.</p>
          </Dropzone>
        }
      </div>

    )
  }
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.currentUser,
    photos: state.photos
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addPhoto: (photos) => dispatch(Actions.addPhotos(photos))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UploadImage)

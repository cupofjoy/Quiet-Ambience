import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import Actions from '../actions.js'
import '../App.css'
// import { Button } from 'semantic-ui-react'

class PhotoDetail extends Component {
  state = {
    clicked: false,
    value: "",
    favorited: this.props.currentPhoto.favorite,
    shared: this.props.currentPhoto.shared,
    description: this.props.currentPhoto.name,
    colorClick: false
  }

  componentDidMount() {
    this.setState({
      favorited: this.props.currentPhoto.favorite
    })
  }

  handleClick = () => {
    this.setState({
      clicked: true,
      value: this.props.currentPhoto.tags
    })
  }

  handleChange = (event) => {
    this.setState({
      value: event.target.value
    }, () => console.log("photo detail state", this.state.value))
  }

  handleDescriptionChange = (event) => {
    this.setState({description: event.target.value})
  }

  deletePhoto = (event) => {
    event.preventDefault()
    // let currentPhoto = this.props.currentPhoto
    const URL = `http://localhost:4000/photos/${this.props.currentPhoto.id}`
    let config = {
      method: "DELETE",
      headers: { "Content-Type": "application/json" }
    }

    if (this.props.currentPhoto.shared === true) {
      fetch(URL, config)
        .then(r => r.json())
        .then(d => {
          this.handleDeleteSharedPhoto()
          this.props.deletePhoto(this.props.currentPhoto)
          this.props.history.push("/collection")
        })
    } else {
      fetch(URL, config)
        .then(r => r.json())
        .then(d => {
          this.props.deletePhoto(this.props.currentPhoto)
          this.props.history.push("/collection")
        })
    }
  }

  handleFavorite = () => {
    const URL = `http://localhost:4000/photos/${this.props.currentPhoto.id}`
    let config = {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        favorite: !this.props.currentPhoto.favorite,
        shared: this.props.currentPhoto.shared,
        name: this.props.currentPhoto.name
      })
    }
    fetch(URL, config)
      .then(r => r.json())
      .then( d => {
        this.setState({favorited: !this.state.favorited}, () => {
          this.props.handleFavorite()
        })
      })
  }

  sharePhoto = () => {
    const URL = `http://localhost:4000/photos/${this.props.currentPhoto.id}`
    let config = {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        shared: !this.props.currentPhoto.shared,
        favorite: this.props.currentPhoto.favorite,
        name: this.props.currentPhoto.name
      })
    }
    console.log("sharePhoto currentPhoto", this.props.currentPhoto);
    if (this.state.shared === true) {
      fetch(URL, config)
        .then(r => r.json())
        .then( d => {
          this.setState({shared: !this.state.shared}, () => {
            this.handleDeleteSharedPhoto()
          })
        })
    } else {
      fetch(URL, config)
        .then(r => r.json())
        .then( d => {
          this.setState({shared: !this.state.shared}, () => {
            this.handleSharedPhoto()
          })
        })
    }
  }

  handleSharedPhoto = () => {
    const URL = `http://localhost:4000/shared`

    let config = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        photo: this.props.currentPhoto.id,
        user: this.props.currentUser.id,
      })
    }

    fetch(URL, config)
      .then(r => r.json())
      .then( d => {
        this.props.sharePhoto(d)
      })
  }

  handleDeleteSharedPhoto = () => {
    let currentPhoto = this.props.currentPhoto
    let id = currentPhoto.id
    
    const URL = `http://localhost:4000/shared/${id}`
    console.log("photo detail handle delete share", URL);
    let config = {
      method: "DELETE",
      headers: {"Content-Type": "application/json"}
    }

    fetch(URL, config)
      .then(r => r.json())
      // .then(d => this.props.sharePhoto(d))
  }

  handleSubmit = (event) => {
    event.preventDefault()
    const URL = `http://localhost:4000/photos/${this.props.currentPhoto.id}`
    let config = {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({tags: this.state.value, name: this.state.description, favorite:this.props.currentPhoto.favorite, shared:this.props.currentPhoto.shared})
    }

    fetch(URL, config)
      .then(r => r.json())
      .then(this.setState({clicked: !this.state.clicked}))
      .then(this.props.updatePhoto(this.props.currentPhoto, this.state.value, this.state.description))
  }

  removeCurrentPhoto = () => {
    this.props.removeCurrentPhoto()
    this.props.history.push("/collection")
  }

  renderTags = (tags) => {
    let photo = this.props.currentPhoto
    let tagsArr = photo.tags.split(", ")
    return tagsArr.map((tag) => {
      return <div className="ui tiny teal tag label" key={tag}>{tag}</div>
    })
  }

  handleTags = () => {
    if (this.state.clicked === false) {
      return (
        <div>
          {this.renderTags()}<br/><br/>
          <button
            style={{marginBottom: '20px'}}
            type="button"
            className="ui mini submit teal button"
            onClick={this.handleClick}
          >
            <i className="edit icon"></i>
            Edit Tags and Description
          </button>
          <button
            style={{marginBottom: '20px'}}
            type="button"
            className="ui mini submit teal button"
            onClick={this.handleFavorite}
          >
            <i className="heart red icon"></i>
            { this.state.favorited ? "Unfavorite Photo" : "Favorite Photo" }
          </button>
          <button
            style={{marginBottom: '20px'}}
            type="button"
            className="ui mini submit teal button"
            onClick={this.deletePhoto}
          >
            <i className="trash icon"></i>
            Delete Photo
          </button>
          <button
            style={{marginBottom: '20px'}}
            type="button"
            className="ui mini submit teal button"
            onClick={this.sharePhoto}
          >
            <i className="share icon"></i>
            { this.state.shared ? "Undo Share" : "Share Photo" }
          </button>
          <button
            style={{marginBottom: '20px'}}
            type="button"
            className="ui mini submit teal button"
            onClick={this.removeCurrentPhoto}
          >
            <i className="chevron circle left icon"></i>
            Go Back to Collection
          </button>
        </div>
      )
    } else {
      return (
          <form className="ui form" onSubmit={this.handleSubmit}>
            <br/>
            <label>Description:</label><br/>
            <input style={{width: '300px'}}
              className="ui focus input"
              type="text"
              value={this.state.description}
              onChange={this.handleDescriptionChange}
            /><br/><br/>
            <label>Tags:</label><br/>
            <textarea style={{width: '300px', marginLeft: '10px'}}
              className="ui focus input"
              id="edittags"
              type="text"
              name="edittags"
              value={this.state.value}
              placeholder={this.props.currentPhoto.tags}
              onChange={this.handleChange}
            /><br/>
          <input type="submit" className="ui submit teal button" value="Submit" style={{marginBottom: '10px'}}/>
          </form>
      )
    }
  }

  handleColors = () => {
    let colors = this.props.currentPhoto.colors
    if (colors) {
      let colorsArr = colors.split(", ")
      return colorsArr.map((color) => {
        let colorArr = color.split(" ")
        let rgb = `rgb(${colorArr[0]}, ${colorArr[1]}, ${colorArr[2]})`
        return (
          <p id="colortags" className="ui tag tiny label" key={rgb} style={{backgroundColor: rgb}} onClick={this.handleColorClick}>
            {
              this.state.colorClick ?
                `rgb(${colorArr[0]}, ${colorArr[1]}, ${colorArr[2]})`
              :
                `${colorArr[3]}`
            }
          </p>
        )
      })
    } else {
      return null
    }
  }

  handleColorClick = () => {
    this.setState({colorClick: !this.state.colorClick})
  }

  photoDetail = () => {
    if (this.props.currentPhoto.id) {
      return (
        <Fragment>
          <img
            src={this.props.currentPhoto.attachment.url}
            className="ui centered massive rounded image"
            alt={this.props.currentPhoto.attachment.url}
          /><br/>
          <h5 className="ui horizontal divider header">{this.props.currentPhoto.name}</h5>
          <h5 className="ui horizontal divider header">
            <i className="tint icon"></i>
            Colors
          </h5>
          {this.handleColors()}
          <h5 className="ui horizontal divider header">
            <i className="tags icon"></i>
            Tags
          </h5>
          {this.handleTags()}
        </Fragment>
      )
    } else {
      return null
    }
  }

  render() {
    return (
      <div style={{marginTop: '20px'}}>
        {this.photoDetail()}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  // console.log("mapstate", state.currentUser);
  return {
    currentPhoto: state.currentPhoto,
    currentUser: state.currentUser,
    favorites: state.favorites,
    shared: state.shared
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addPhoto: (photos) => dispatch(Actions.addPhoto(photos)),
    updatePhoto: (photo, value, description) => dispatch(Actions.updatePhoto(photo, value, description)),
    removeCurrentPhoto: () => dispatch(Actions.removeCurrentPhoto()),
    deletePhoto: (photo) => dispatch(Actions.deletePhoto(photo)),
    handleFavorite: () => dispatch(Actions.handleFavorite()),
    sharePhoto: (photo) => dispatch(Actions.sharePhoto(photo)),
    deleteSharedPhoto: (photo) => dispatch(Actions.deleteSharedPhoto(photo))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PhotoDetail)

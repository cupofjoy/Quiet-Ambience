class Actions {
  static addCurrentUser = (currentUser, photos) => {
    return {
      type: "ADD_CURRENT_USER",
      payload: {
        currentUser: currentUser,
        photos: photos,
        filteredPhotos: photos
      }
    }
  }

  static addPhotos = (photos) => {
    return {type: "ADD_PHOTOS", payload: {photos: photos}}
  }

  static removeCurrentUser = () => {
    return {type: "REMOVE_CURRENT_USER"}
  }

  static addPhoto = (photos) => {
    return {
      type: "ADD_PHOTOS",
      payload: {photos: photos}
    }
  }

  static updatePhoto = (photo, value, name) => {
    return {
      type: "UPDATE_PHOTO",
      payload: {photo: photo, tags: value, name: name}
    }
  }

  static deletePhoto = (photo) => {
    return {
      type: "DELETE_PHOTO",
      payload: {photo: photo}
    }
  }

  static removeCurrentPhoto = () => {
    return {type: "REMOVE_CURRENT_PHOTO"}
  }

  static addSearchTerm = (searchTerm) => {
    return {
      type: "ADD_SEARCH_TERM",
      payload: { searchTerm: searchTerm }
    }
  }

  static filterPhotos = () => {
    return {type: "FILTER_PHOTOS"}
  }

  static addCurrentPhoto = (photo) => {
    return {
      type: "ADD_CURRENT_PHOTO",
      payload: {photo: photo}
    }
  }

  static handleFavorite = () => {
    return {
      type: "HANDLE_FAVORITE"
    }
  }

  static sharePhoto = (photo) => {
    // debugger
    return {
      type: "SHARE_PHOTO",
      payload: {photo: photo}
    }
  }

  static removeSearchTerm = () => {
    return {
      type: "REMOVE_SEARCH_TERM"
    }
  }
}

export default Actions;

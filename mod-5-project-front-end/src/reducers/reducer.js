const defaultState = {
  photos: [],
  filteredPhotos: [],
  currentUser: {},
  searchTerm: "",
  currentPhoto: {},
  favorites: [],
  shared: []
}

export default function reducer(state = defaultState, action) {
  switch(action.type) {
    case "ADD_PHOTOS":
      return {
        ...state,
        photos: action.payload.photos
      };
    case "ADD_CURRENT_USER":
      return {
        ...state,
        currentUser: action.payload.currentUser,
        photos: action.payload.photos,
      };
    case "ADD_SEARCH_TERM":
      return {
        ...state,
        searchTerm: action.payload.searchTerm
      }
    case "REMOVE_SEARCH_TERM":
      return {
        ...state,
        searchTerm: ""
      }
    case "FILTER_PHOTOS":
      // debugger
      if (state.searchTerm === "") {
        return {
          ...state,
          filteredPhotos: state.photos
        }
      } else {
        let filtered = state.photos.filter((photo) => {
          return photo.tag.includes(state.searchTerm) || photo.name.includes(state.searchTerm) || photo.expressions.includes(state.searchTerm)
        })
        debugger
        return {
          filteredPhotos: filtered
        }
      }
    case "ADD_CURRENT_PHOTO":
      console.log("reducer ADD_CURRENT_PHOTO", action.payload.photo);
      return {
        ...state,
        currentPhoto: action.payload.photo
      }
    case "REMOVE_CURRENT_USER":
      return {
        photos: [],
        filteredPhotos: [],
        currentUser: {},
        searchTerm: "",
        currentPhoto: {}
      }
    case "UPDATE_PHOTO":
      let foundPhoto = state.photos.find((photo) => {return photo.id === action.payload.photo.id})
      foundPhoto.tags = action.payload.tags
      foundPhoto.name = action.payload.name
      return {
        ...state,
        // currentPhoto: {}
      }
    case "REMOVE_CURRENT_PHOTO":
      return {
        ...state,
        currentPhoto: {}
      }
    case "DELETE_PHOTO":
      let newPhotos = state.photos.filter((photo) => {return photo.id !== action.payload.photo.id})
      return {
        ...state,
        photos: newPhotos,
        currentPhoto: {}
      }
    case "HANDLE_FAVORITE":
      let favoritedPhoto = state.photos.find((photo) => {return photo.id === state.currentPhoto.id})
      favoritedPhoto.favorite = !favoritedPhoto.favorite
      return {
        ...state,
        currentPhoto: {...state.currentPhoto, favorite: !state.currentPhoto.favorite}
      }
    case "SHARE_PHOTO":
      let sharedPhoto = state.photos.find((photo) => {return photo.id === state.currentPhoto.id})
      sharedPhoto.shared = !sharedPhoto.shared
      return {
        ...state,
        currentPhoto: {...state.currentPhoto, shared: !state.currentPhoto.shared},
      }
    default:
      return state;
  }
}

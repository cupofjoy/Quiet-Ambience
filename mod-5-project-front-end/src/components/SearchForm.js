import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import Actions from '../actions.js'

class SearchForm extends Component {
  render() {
    return (
      <Fragment>
        <form className="ui icon input">
          <input className="ui transparent input" type="text" placeholder="search photo tags" value={this.props.searchTerm} onChange={this.props.addSearchTerm}/>
          <i className="search icon"></i>
        </form>
        <button className="ui teal button" onClick={this.props.removeSearchTerm}>Clear Search</button>
      </Fragment>
    )
  }
}

const mapStateToProps = state => {
  return {
    searchTerm: state.searchTerm
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addSearchTerm: (event) => dispatch(Actions.addSearchTerm(event.target.value)),
    filterPhotos: (event) => dispatch(Actions.filterPhotos()),
    removeSearchTerm: (event) => dispatch(Actions.removeSearchTerm())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchForm)

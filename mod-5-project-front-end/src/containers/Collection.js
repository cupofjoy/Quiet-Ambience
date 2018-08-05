import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import PhotoList from './PhotoList.js'

class Collection extends Component {
  render() {
    return (
      <div style={{paddingTop: "20px"}}>
        <PhotoList className="photolist"/>
      </div>
    )
  }
}

export default withRouter(connect()(Collection))

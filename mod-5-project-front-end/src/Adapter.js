import { List } from 'semantic-ui-react'
import React from 'react'

class Adapter {
  static isLoggedIn() {
    return !!localStorage.getItem('token')
  }

  static logout() {
    localStorage.removeItem('token')
  }

  static API_KEY() {
    return 'AIzaSyDszVLjHQ-ODwwcptfIVWYh5L4l6BVL0bg'
  }

  static createFormData = (photo, description, colors, expressions, userId) => {
    // debugger
    let formData = new FormData()
    formData.append("user", userId)
    formData.append("tags", description)
    formData.append("colors", colors)
    formData.append("attachment", photo)
    formData.append("name", photo.name)
    formData.append("expressions", expressions)


    let config = {
      method: "POST",
      body: formData
    }

    return config
  }

  static handleExpressions = (expressions) => {
    let expressionString = ""

    if(expressions) {
      if (expressions.anger.length > 0) {
        expressionString += "anger "
      }

      if (expressions.joy.length > 0) {
        expressionString += "happy joy "
      }

      if (expressions.sorrow.length > 0) {
        expressionString += "sad sorrow "
      }

      let array = expressionString.split(" ")
      let newArr = []
      for(let i = 0; i < array.length; i++) {
        if (array[i] !== "") {
          // debugger
          newArr.push(array[i])
        }
      }

      return newArr.join(" ")
    }
  }

  static createFileReader = (result) => {
    let body = {
      "requests":[
        {
          "features":[
            {"type":"LABEL_DETECTION"},
            {"type":"FACE_DETECTION"},
            {"type":"IMAGE_PROPERTIES"}
          ],
          "image":{
            // "source":{"imageUri": imageURL}
            "content": result
          }
        }
      ]
    }

    return {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8"
      },
      // mode: "cors",
      body: JSON.stringify(body)
    }
  }

  static handleData = (data) => {
    debugger
    let resultsArr = data.responses[0].labelAnnotations
    let colorsArr = data.responses[0].imagePropertiesAnnotation.dominantColors.colors
    let faceObj
    let anger = []
    let joy = []
    let sorrow = []
    // debugger
    if (data.responses[0].faceAnnotations) {
      let array = data.responses[0].faceAnnotations
      for (let i = 0; i < array.length; i++) {
        if (array[i].angerLikelihood === "VERY_LIKELY") {
          anger.push(array[i])
        }

        if (array[i].joyLikelihood === "VERY_LIKELY") {
          joy.push(array[i])
        }

        if (array[i].sorrowLikelihood === "VERY_LIKELY") {
          sorrow.push(array[i])
        }
      }

      faceObj = {anger: anger, joy: joy, sorrow: sorrow}
    }


    let descriptions = resultsArr.map((r) => {
      return r.description
    })
    let colors = colorsArr.map((color) => {
      // debugger
      let percentage = `${color.score * 100}`

      return `${color.color.red} ${color.color.green} ${color.color.blue} ${percentage.slice(0,4)}%`
    })

    let descriptionString = ""
    for(let i=0; i < descriptions.length; i++) {
      if (i < (descriptions.length-1)) {
        descriptionString += (descriptions[i] + ", ")
      } else {
        descriptionString += descriptions[i]
      }
    }

    let colorsString = ""
    for(let i=0; i < colors.length; i++) {
      if (i < (colors.length-1)) {
        colorsString += (colors[i] + ", ")
      } else {
        colorsString += colors[i]
      }
    }
    return {descriptionString: descriptionString, colorString: colorsString, faceResults: faceObj}
  }

  static mapTags = (photos, currentUser) => {
    if (photos.length > 0 && currentUser.id) {
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

export default Adapter;

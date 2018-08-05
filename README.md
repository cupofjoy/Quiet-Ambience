# Quiet-Ambience
For photograph collection management. Will automatically tag all photos with relevant tags to search and filter through. Can handle multiple image uploads.

## Getting Started
These instructions will get you a copy of the project running on your local system for testing.

### Prerequisites
You will need a Google Cloud Vision API Key in order to get the program to tag your photographs. Please refer to the Google documentation [here](https://cloud.google.com/vision/docs/before-you-begin) for more information to get started. Once you have the API key, please add it to the project file in [here](https://github.com/cupofjoy/Quiet-Ambience/blob/master/mod-5-project-front-end/src/config.js).

### Installation
After forking and cloning the project, open the terminal and change directory into the backend folder, then start server:
```
cd mod-5-project-back-end
rails s -p 4000
```

And then open new terminal and start the front-end server:
```
cd mod-5-project-front-end
npm start
```

This will load the welcome page. You can log in or register to sign in. It will then redirect you to the main page to upload your photograph collection.

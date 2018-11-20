import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios'
import Cropper from 'react-cropper'
import firebase from 'firebase'
import FirebaseKEY from '../secrets'

class App extends Component {
  // constructor () {
  //   super()
  //   this.handleClick=this.handleClick.bind(this)
  // }

  // handleClick (e) {
  //   e.preventDefault(); // submit button
  //   const reader = new FileReader()
  //   reader.onload = (e) => {
  //     let rawData = reader.result
  //   }
  //   let file = document.getElementById('file').files[0];
  //   console.log("heeei", file)
  //   let readfile = reader.toDataURL(file)
    
  //   console.log("HIIIIT", readfile)
  //   axios.post('http://localhost:3001', readfile)
    
  constructor(props) {
		super(props)
		this.state = {
			src: '',
			cropResult: null
		}
		this.onChange = this.onChange.bind(this)
		this.saveToBucket = this.saveToBucket.bind(this)
		// this.rotateLeft = this.rotateLeft.bind(this)
    // this.rotateRight = this.rotateRight.bind(this)


// Initialize Firebase
// TODO: Replace with your project's customized code snippet
const config = {
  apiKey: FirebaseKEY,
  authDomain: 'comic-server.firebaseapp.com',
  databaseURL: 'https://comic-server.firebaseio.com',
  storageBucket: 'comic-server.appspot.com',
};
firebase.initializeApp(config);

// Create a child reference
// const imagesRef = storageRef.child('images'); // imagesRef now points to 'images'

// Child references can also take paths delimited by '/'
// const boomRef = storageRef.child('images/boom.svg');
// spaceRef now points to "images/space.jpg"
// imagesRef still points to "images"


	}

	onChange(e) {
    e.preventDefault()
		let files
		if (e.dataTransfer) {
			files = e.dataTransfer.files
		} else if (e.target) {
			files = e.target.files
    }
    console.log('strawberry files', files)
    const reader = new FileReader()
		reader.onload = (ee) => {
      console.log('pineapple', ee.target.result)
			this.setState({ src: files[0]/*reader.result*/ })
		}
    reader.readAsDataURL(files[0])
    console.log('banana files', files[0])
	}

	async saveToBucket(e) {
		// if (this.state.src) {
		// 	await this.setState({
		// 		cropResult: this.cropper
		// 			.getCroppedCanvas({ maxWidth: 800, maxHeight: 800 })
		// 			.toDataURL('image/jpeg', 0.75)
		// 	})
    e.preventDefault()
			let request = {
				data: this.state.src
      }

      // Get a reference to the storage service, which is used to create references in your storage bucket
const storage = firebase.storage();

// Create a storage reference from our storage service
const storageRef = storage.ref();

      storageRef.child('apple.mov').put(request.data).then(() => 'it worked :D').catch(() => 'darn :(')
      
// 			  try {
//           console.log("SRC: ", typeof request);
// console.log(request);
//           axios.post('http://localhost:3001', request)
//         } catch (err) {
//           console.log(err)
//         }
		}
	
    

  // }
  render() {
    console.log("state", this.state.src)
    return (
      <div className="App">
      <form method='post' action='fileupload'>
      <input type='file' id='file' name='file' onChange={this.onChange} />
      <button type='submit' onClick={this.saveToBucket}>Submit</button>
      </form>
        {/* <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header> */}
      </div>
    );
  }
}

export default App;

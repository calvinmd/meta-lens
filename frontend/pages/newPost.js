import postStyles from '../styles/NewPost.module.css'
import { useState } from 'react';
import { create } from '../../backend/models/User';


const newPost = () => {
  const [ selectedImage, setSelectedImage ] = useState('');
  const [ imageName, setImageName ] = useState('');
  const [ content, setContent ] = useState('');
  const [ cid, setCID ] = useState('');
  const [ postID, setPostID ] = useState('');

  const handleChange = event => {
    event.preventDefault();
    setImageName(event.target.files[0].name)
    setSelectedImage(event.target.files[0]);
  }

  const handleSubmit = async (event) => {
    event.preventDefault(); //important

    if(selectedImage == '') { return; } //implement toast here that says "Content Missing!"
    let formData = new FormData();
    formData.append('file', selectedImage);
    formData.append('imageName', imageName);
    formData.append('postContent', content);

    const submitResponse = await fetch('/api/collective/upload', {
      method: 'POST',
      body: formData,
    })
    .then(response => response.json())
      .then(jsondata => console.log(jsondata))
      .catch(function (error) {
          console.log(error)
    })
    const response = await submitResponse.json();
    
    setCID(response.data[0].cid);
    setPostID(response.data[0].id);

    createPost();
    
  }

  // const createPost = async () => { //TODO
  //   let config = {
  //     "postID": CID,
  //     "postCID": postID,
  //     "postContent": content,
  //     "userID": '2'
  //   }

  //   const post = fetch('/api/post', {
  //     method: 'POST',
  //     headers: {
  //       'Accept': 'application/json',
  //       'Content-Type': 'application/json'
  //     },
  //     form: JSON.stringify(config)
  //   })
  //   .then(response => response.json())
  //   .then(jsondata => console.log(jsondata))
  //   .catch(function (error) {
  //       console.log(error)
  //   })
    
  // }

  return (
    <div className = {postStyles.card}>
        <h1>New Post</h1>
        <form>
            <input id="name" placeholder='Text' type="text" onChange={(event) => setContent(event.target.value)} required/>
            <br />
            <input
              onChange={handleChange}
              accept=".jpg, .png, .jpeg"
              type="file"
              required>
            </input>
            <br />
            <button onClick={handleSubmit}>
                Submit
            </button>
        </form>
    </div>
  )
}

export default newPost
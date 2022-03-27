import postStyles from '../styles/NewPost.module.css'
import { useState, useContext } from 'react';
import { AddressContext } from '../contexts/AddressContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const newPost = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageName, setImageName] = useState('');
  const [content, setContent] = useState('');
  const { getAddress } = useContext(AddressContext)
  const address = getAddress()

  const handleChange = event => {
    event.preventDefault();
    setImageName(event.target.files[0].name)
    setSelectedImage(event.target.files[0]);
  }

  const handleSubmit = async (event) => {
    event.preventDefault(); //important

    if (selectedImage == null) { return; } //implement toast here that says "Content Missing!"
    let formData = new FormData();
    formData.append('file', selectedImage);
    formData.append('imageName', imageName);
    formData.append('postContent', content);

    let reqOptions = {
      method: "POST",
      body: formData,
      redirect: 'follow'
    }

    fetch('/api/collective/upload', reqOptions)
      .then(response => response.text())
      .then(function (data) {
        let imageInfo = JSON.parse(data);

        let config = {
          "postID": imageInfo.imageData.id,
          "postCID": imageInfo.imageData.cid,
          "postContent": content,
          "userID": address //this should be the wallet address from global context 
        }

        let requestObj = {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(config)
        }

        return fetch('/api/post', requestObj);
      }).then(response => response.json())
      .then(function (postData) {
        console.log("post:", postData) //add toast here that says Post Added! Take the user back to this list of posts 
        toast.success(`Post Added `, {
          position: "bottom-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: false,
          draggable: false,
          progress: undefined,
        });
      })
      .catch(error => {
        console.log('error', error)
        toast.error('Error', {
          position: "bottom-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: false,
          progress: undefined,
        });
      });
  }

  return (
    <>    <div className={postStyles.card}>
      <h1>New Post</h1>
      <form>
        <input id="name" placeholder='Text' type="text" onChange={(event) => setContent(event.target.value)} required />
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
      <ToastContainer style={{ width: "500px" }} />
    </>


  )
}

export default newPost
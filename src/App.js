import {useRef, useState, useEffect} from 'react';
import './App.css';
import {uploadFile} from './services/api';



function App() {

  const [file, setFile] = useState('');
  const [result, setResult] = useState('');

  const fileInputRef = useRef();
 
  const logo = 'https://awsimages.detik.net.id/community/media/visual/2024/01/25/satoru-gojo_169.webp?w=700&q=90'

  useEffect(() => {
    const getImage= async () => {
      if(file){
        const data = new FormData();
        data.append("name", file.name);
        data.append("file", file);

        let response = await uploadFile(data);
        setResult(response.path);
      }
    }
    getImage();
  }, [file])

  const onUploadClick = () => {
    fileInputRef.current.click();
  }

  console.log(file);

  return (
    <div className="container">
      <div className='img'><img src={logo} alt="banner"/></div>
      <div className='wrapper'>
        <h1>Create a Link</h1>
        <p>Upload and Share the Download Link</p>

        <button onClick={() => onUploadClick()}>Upload</button>
        <input type="file"
          ref={fileInputRef}
          style={{display: 'none'}}
          onChange={(e) => setFile(e.target.files[0])}
        />

        <a href={result} target='_blank'>{result}</a>

      </div>
    </div>
  );
}

export default App;

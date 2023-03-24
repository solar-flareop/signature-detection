import { useState } from "react";
import "./App.css";
import axios from "axios";
import SignCard from "./components/SignCard";

function App() {
  const [postPhoto, setpostPhoto] = useState("");
  const [signNo, setSignNo] = useState(0);
  const [signImages, setSignImages] = useState({});
  const url = "http://localhost:5000/detect";

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(url, { photo: postPhoto });
      console.log("data-is", data);
      if (data.data.success) {
        setSignNo(Object.keys(data.data.Signs).length);
        setSignImages(data.data.Signs);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    const base64 = await convertToBase64(file);
    console.log(base64);
    setpostPhoto(base64);
  };

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <label htmlFor="file-upload">
          <img src={postPhoto} alt="" />
        </label>

        <input
          type="file"
          lable="Image"
          name="photo"
          id="file-upload"
          accept=".jpeg, .png, .jpg"
          onChange={(e) => handleFileUpload(e)}
        />

        <button type="submit">Submit</button>

        <h4>No of signs: {signNo}</h4>

        <div>
          {signImages &&
            Object.entries(signImages).map(([key, value]) => (
              <SignCard key={key} value={value} />
            ))}
        </div>
      </form>
    </div>
  );
}

export default App;

function convertToBase64(file) {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      resolve(fileReader.result);
    };
    fileReader.onerror = (error) => {
      reject(error);
    };
  });
}

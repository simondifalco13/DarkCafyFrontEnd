import React from 'react';
import logo from './logo.svg';
import './App.css';
import { WebCamDisplay } from './components/WebcamDisplay';
import { FormEsp } from './components/Register/FormEsp';
import ResponsiveAppBar from './components/ResponsiveAppBar';
import { BrowserRouter as Router,Routes, Route } from 'react-router-dom';
import { Welcome } from './components/Welcome';
import { User } from './models/User';
import { FormRegister } from './components/Register/FormRegister';
import { FormFace } from './components/Register/FormFace';
import GlobalComposite from './components/Teams/GlobalComposite';






function App() {
  const [user,setUser]=React.useState<User>({
    id : "",
    tagId: "",
    tagName: "",
    firstname: "",
    lastname: "",
    mail: "",
    favouriteCoffee: "",
    password:"",
    pictures: []
  });
  return (
    <div className="App">
          <Router>
            <Routes>
              <Route path="/cafy" element={<WebCamDisplay />} />
              <Route path="/" element={<Welcome />} />
              <Route path="/home" element={<Welcome />} />
              <Route path="/admin/esp" element={<FormEsp />} />
              <Route path="/register" element={<FormRegister user={user} setUser={setUser} />}/>
              <Route path="/register/face" element={<FormFace user={user} setUser={setUser} />}/>
              <Route path="/call" element={<GlobalComposite/>}/>
            </Routes>
          </Router>
    </div>
    
  );
}



const constraints = {
  audio: false,
  video:{
      width:640, height : 360
  }
};

async function init() {
  try {
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      //handleSuccess(stream);
  } catch (e) {
     console.log(e);
  }
}


function drawInCanvas(cnv : any,vid :any){
  var context = cnv.getContext('2d');
  context.drawImage(vid, 0, 0, 640, 360);
}

function getImageInBase64(cnv : any){
   var imageBase64=cnv.toDataURL('image/jpeg');
  imageBase64 = imageBase64.replace("data:image/jpeg;base64,", "");
  return imageBase64;
}




export default App;

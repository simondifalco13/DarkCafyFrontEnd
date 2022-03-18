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

import { GroupCallLocator, GroupLocator, TeamsMeetingLinkLocator } from '@azure/communication-calling';
import { CallUser } from './models/CallUser';
import GlobalComposite from './components/CallComponents/GlobalComposite';

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
  //const groupId= (): GroupLocator => ({ groupId: "7662bd00-a3a0-11ec-971a-6f00e64f58ff"});
  const [callUser,setCallUser] = React.useState<CallUser>({
    userId: "",
    credentials:undefined,
    displayName:""
  });

  const [groupId,setGroupId]=React.useState<GroupLocator>({groupId: ""});
  
  return (
    <div className="App">
          <Router basename={process.env.PUBLIC_URL}>
            <Routes>
              <Route path="/cafy" element={<WebCamDisplay user={callUser} setCallUser={setCallUser} setGroupId={setGroupId}/>} />
              <Route path="/" element={<Welcome />} />
              <Route path="/home" element={<Welcome />} />
              <Route path="/admin/esp" element={<FormEsp />} />
              <Route path="/register" element={<FormRegister user={user} setUser={setUser} />}/>
              <Route path="/register/face" element={<FormFace user={user} setUser={setUser} />}/>
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
  } catch (e) {
     console.log(e);
  }
}





export default App;

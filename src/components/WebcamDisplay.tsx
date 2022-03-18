import React from "react";
import { useRef } from "react";
import Webcam from "react-webcam";
import Button from '@mui/material/Button';
import CoffeeIcon from '@mui/icons-material/Coffee';
import ResponsiveAppBar from "./ResponsiveAppBar";
import {useNavigate } from "react-router-dom";
import {CallUser} from "../models/CallUser";
import { fetchTokenResponse } from "./CallComponents/Utils";
import { GroupCallLocator } from '@azure/communication-calling';
import { Box, Grid } from "@mui/material";
import GlobalComposite from "./CallComponents/GlobalComposite";
import { maxWidth, width } from "@mui/system";
const { AzureCommunicationTokenCredential } = require('@azure/communication-common');


interface CallUserProps{
  user : CallUser;
  setCallUser :(user : CallUser) => void;
  setGroupId :(groupId : GroupCallLocator) => void;
}

export const WebCamDisplay = (props : CallUserProps) => {
  const navigate=useNavigate();
  const webcam = useRef<Webcam>(null);
  const [imgSrc, setImgSrc] = React.useState(null);
  const [isTaken, setIsTaken] = React.useState(false);
  const [phrase,SetPhrase]=React.useState("Hello do you want a coffee ? ");
  const [needRegister, setNeedRegister]=React.useState(false);
  const [showCall,setShowCall]=React.useState(false);
  const [groupId,setGroupIdLocal]=React.useState({groupId :' '});
  const [callRunning, setCallRunning]=React.useState(false);

  async function Request(img:string) {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json',
      'Access-Control-Allow-Origin':'*',
      "Cross-Origin":"*",
      "Access-Control-Allow-Credentials": "true",
      "Access-Control-Allow-Methods": "*"
    },
      body: "\""+img+"\""
    };


    const response = await fetch('https://localhost:44392/api/user', requestOptions);
    try {
      const data = await response.json();
      var responseAndStatus=data.response;
      var user=data.user;
      if(user===null){
        if(responseAndStatus.statusMessage==="unregistered"){
            setNeedRegister(true);
            setIsTaken(false);
            SetPhrase("You are not registered to cafy, please register");
        }
        if(responseAndStatus.statusMessage==="no face"){
          setIsTaken(false);
          SetPhrase("No face detected, think to take of your mask or to put it under your mouth temporarly");
      }
      }
      switch(responseAndStatus.statusMessage){
        case "success":
          if(user.firstname!==null && user.lastname!==null && user.favouriteCoffee!==null){
            var fav=user.favouriteCoffee;
            var name=user.firstname+" "+user.lastname;
            SetPhrase("Hello "+name+" ,your favourite "+capitalize(fav)+" is going to be prepared");
            var { token, userId }= await fetchTokenResponse();
            var credential = new AzureCommunicationTokenCredential(token)
            var recognizedUser : CallUser={
              displayName: name,
              userId: userId,
              credentials: credential
            };
            props.setCallUser(recognizedUser);
            setTimeout(()=>{
              SetPhrase("Hello do you want a coffee ? ");
              
            },4000);
            if(!callRunning){
              startCallTeams();
            }
          }
          break;
        
        case "false": 
          SetPhrase("An error occured , try again. If it persists, please contact the admin");
          break;

        case "unfindable":
          SetPhrase("Please verify that the engine is on");
          break;
        
        case "unconnectible":
          SetPhrase("The engine has a problem : contact the admin");
          break;

        case "unreachable":
          SetPhrase("Impossible to connect to the engine");
          break;

        case "failed":
          SetPhrase("Error while connecting to the engine");
          break;
      }
    } catch (error) {
      console.log(error);
      setIsTaken(false);
      SetPhrase("No face detected, think to take of your mask or to put it under your mouth temporarly");
    }

  }

  function capitalize(s : string)
  {
      return s[0].toUpperCase() + s.slice(1);
  }

  async function startCallTeams(){
    const requestOptionsMeeting = {
      method: 'GET'
    };
    const responseMeeting = await fetch('https://localhost:44392/api/meeting/id', requestOptionsMeeting);
    const meetingJson=await responseMeeting.json();
    var meetingId=meetingJson.meetingId;
    if(meetingId!=="" && meetingId!==null){
      props.setGroupId({groupId: meetingId});
      setGroupIdLocal({groupId: meetingId});
    }
    setCallRunning(true);
    setShowCall(true);
    setIsTaken(false);
  }


  const capture = React.useCallback(() => {
    if(webcam.current?.stream!=null){
      if(webcam.current!=null){
        setIsTaken(true);
        const imageSrc = webcam.current.getScreenshot() ;
        var base64=getBase64WithoutHeaders(imageSrc);
        SetPhrase("Loading...");
        Request(base64);
       
      }else{
        SetPhrase("Your camera has not been authorized.");
      }
    }else{
      SetPhrase("Your camera has not been authorized.");
    }
  }, [webcam, setImgSrc]);

    
  function setImageSrc(src :any){
    setImgSrc(src);
  }

  function getBase64WithoutHeaders(base64 : any){
    return base64.replace("data:image/jpeg;base64,", "");
  }

  return (
    <>
      <ResponsiveAppBar/>
      <Grid container spacing={2} justifyContent="center">
        <Grid item xs={12} md={12}>
          <h2>{phrase}<CoffeeIcon fontSize="large"/></h2>
        </Grid>
        {needRegister && 
          (
            <Grid item xs={12} md={12}>
              <Button variant="contained" onClick={()=>navigate("/register")}>Register</Button>
            </Grid>
          )
        }
        <Grid item xs={12} md={6}>
          <Webcam audio={false} ref={webcam} screenshotFormat="image/jpeg" height={"420"} />
            {imgSrc && (
              <img
                src={imgSrc}
              />
            )}
        </Grid>
        {showCall && (
            <Grid item xs={12} md={6}>
                <GlobalComposite groupId={groupId} user={props.user} setCallRunning={setCallRunning}/>
          </Grid>
        )}
        
        
        {!isTaken && (
          <Grid item xs={12} md={12}>
              <Button variant="contained" onClick={capture}>Take a coffee</Button>
          </Grid>
          )
        }
       
      </Grid>
      <br/>
    </>
  );
};
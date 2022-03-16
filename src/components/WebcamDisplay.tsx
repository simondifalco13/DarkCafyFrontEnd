import React from "react";
import { useRef } from "react";
import Webcam from "react-webcam";
import Button from '@mui/material/Button';
import CoffeeIcon from '@mui/icons-material/Coffee';
import ResponsiveAppBar from "./ResponsiveAppBar";
import { useNavigate } from "react-router-dom";

export const WebCamDisplay = () => {
  const webcam = useRef<Webcam>(null);
  const [imgSrc, setImgSrc] = React.useState(null);
  const [isTaken, setIsTaken] = React.useState(false);
  const [phrase,SetPhrase]=React.useState("Hello do you want a coffee ? ");
  const navigate = useNavigate();

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

    console.log(requestOptions);
    const response = await fetch('https://localhost:44392/api/user', requestOptions);
    try {
      const data = await response.json();
      if(data.firstname!=null && data.lastname!=null && data.favouriteCoffee!=null){
        var fav=data.favouriteCoffee;
        var name=data.firstname+" "+data.lastname;
        SetPhrase("Hello "+name+" ,your favourite "+capitalize(fav)+" is going to be prepared");
        //return true;
      }else{
        SetPhrase("You are not registerd to cafy ! ");
        //return false;
      }
    } catch (error) {
      console.log(error);
      SetPhrase("No face detected, think to take of your mask or to put it under your mouth temporarly");
      //return false;
    }

  }

  function capitalize(s : string)
{
    return s[0].toUpperCase() + s.slice(1);
}

  const capture = React.useCallback(() => {
    if(webcam.current?.stream!=null){
      if(webcam.current!=null){
        const imageSrc = webcam.current.getScreenshot() ;
        var base64=getBase64WithoutHeaders(imageSrc);
        SetPhrase("Loading...");
        //Request(base64);
        // var result=await Request(base64);
        // if(result){
        //    //SI REQUEST RENVOIT TRUE
        //   setIsTaken(true);
        // }
        //AFFICHER BOUTONS OPTIONNELS
      }else{
        SetPhrase("Your camera has not been authorized.");
      }
    }else{
      SetPhrase("Your camera has not been authorized.");
    }
    navigate("/startcall");
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
      <h2>{phrase}<CoffeeIcon fontSize="large"/></h2>
      <Webcam audio={false} ref={webcam} screenshotFormat="image/jpeg" height={"420"} />
      <br/>
      {!isTaken && 
        <Button variant="contained" onClick={capture}>Take a coffee</Button>
      }
      {isTaken && 
        <Button variant="contained" >Reserve a room</Button>
      }
      {imgSrc && (
        <img
          src={imgSrc}
        />
      )}
    </>
  );
};
import React from "react";
import { useRef } from "react";
import Webcam from "react-webcam";
import Button from '@mui/material/Button';
import CoffeeIcon from '@mui/icons-material/Coffee';
import ResponsiveAppBar from "../ResponsiveAppBar";
import { User } from "../../models/User";
import { useNavigate } from "react-router-dom";
import { Grid } from "@mui/material";
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';
import SentimentNeutralIcon from '@mui/icons-material/SentimentNeutral';

const imagesUnsplashFaces: any=[
  "https://media.istockphoto.com/photos/waist-up-portrait-of-lady-in-neutral-background-picture-id492654062?b=1&k=20&m=492654062&s=170667a&w=0&h=56MBsBFnUpg7Y-gsLEV5LGe-Hkqfyt2s_NHpIEygqY8=",
  "https://images.unsplash.com/photo-1506277886164-e25aa3f4ef7f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8ODR8fGhhcHB5fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
  "https://media.istockphoto.com/photos/sad-depressed-tired-lonely-divorced-ill-mother-mature-woman-feeling-picture-id1328351657?b=1&k=20&m=1328351657&s=170667a&w=0&h=vThvHV7iyrhVksc_R_Khv06kyVI2MugievdUco8Sr58=",
  "https://media.istockphoto.com/photos/happiness-picture-id882495390?b=1&k=20&m=882495390&s=170667a&w=0&h=5hN0rq_6PDbE4kgTBajj5afEeDildz_qHLcF5Cu9x2E=",
  "https://images.unsplash.com/photo-1606459249576-f00b2e5e0917?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8MXwxNjIwOTQ3fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
]

interface BasicFormProps{
  user: User,
  setUser: (user:User)=> void
}



export const FormFace = (props:BasicFormProps) => {
  const webcam = useRef<Webcam>(null);
  const navigate=useNavigate();
  const [imgSrc, setImgSrc] = React.useState(null);
  const [phrase,SetPhrase]=React.useState("Hello we will take pics of you");
  const [state,setState]=React.useState(1);
  const [imageState,setImageState]=React.useState(0);
  
  async function Request(user:User) {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json',
        'Access-Control-Allow-Origin':'*',
        "Cross-Origin":"*",
        "Access-Control-Allow-Credentials": "true",
        "Access-Control-Allow-Methods": "*"
      },
      body: JSON.stringify(user)
    };
    //console.log(requestOptions);
    const response = await fetch('https://localhost:44392/api/user/register', requestOptions);
    const data = await response.json();
    console.log(data);
    if(data.status=="success"){
      console.log("success");
      SetPhrase("Perfect, you can test Cafy :-) ");
      setTimeout(()=>{
        navigate('/cafy');
      },200);
    }else{
      SetPhrase("PROBLEM  = "+data.status+" CODE "+data.statusMessage);
    }
    //SetPhrase(response);
  }

  function capitalize(s : string)
{
    return s[0].toUpperCase() + s.slice(1);
}


  const capture= React.useCallback(() => {
    if(webcam.current?.stream!=null){
      if(webcam.current!=null){
        const imageSrc =  webcam.current!=null? webcam.current.getScreenshot() :null;
        var base64=getBase64WithoutHeaders(imageSrc);
        var user=props.user;
        if(user.pictures.length==0){
          user.pictures=new Array();
        }
        user.pictures.push(base64);
        props.setUser(user);
      }else{
        SetPhrase("Your camera has not been authorized.");
      }
    }else{
      SetPhrase("Your camera has not been authorized.");
    }
  }, [webcam]);

  function captureWithTimeout(amount:number,timeoutStep:number,phrase:string,currentState:number){
    SetPhrase("Get ready : "+(timeoutStep/1000)+" seconds left");
    setTimeout(()=>{
      for(let i=0;i<amount;i++){
        setTimeout(()=>{
          capture();
          if(i==9){
            SetPhrase(phrase);
          }
        },200)
        clearTimeout();
      }
      setImageState(currentState);
      currentState++;
      setState(currentState);
    },timeoutStep);
  }

  function captureTotal (){
    if(props.user.firstname=="" || props.user.lastname=="" 
      || props.user.favouriteCoffee=="" || props.user.mail==""
    ){
      navigate("/register");
    }
    if(webcam.current?.stream!=null){
      console.log("State "+state);
      switch(state){
        case 1:
          SetPhrase("Be neutral");
          captureWithTimeout(20,5000,"Smile",state);
          break;
        case 2:
          captureWithTimeout(20,5000,"Make a sad face",state);
          break;

        case 3:
            captureWithTimeout(20,5000,"Smile with your mouth open",state);
            break;
        
        case 4 :
            captureWithTimeout(20,5000,"With your eyebrows upper",state);
            break;
        case 5 :
            captureWithTimeout(20,5000,"Thank you that's perfetct ",state);
            Request(props.user);
            console.log("PICS :"+props.user.pictures.length);
            SetPhrase("Loading...");
            break;

      }
    }else{
      SetPhrase("Your camera has not been authorized.");
    }
      
  }
  

  function getBase64WithoutHeaders(base64 : any){
    return base64.replace("data:image/jpeg;base64,", "");
  }

  return (
    <>
      <ResponsiveAppBar/>
      <h2>{phrase}<CoffeeIcon fontSize="large"/></h2>

      <Grid container spacing={2} justifyContent="center">
        {state<6 && (<Grid item xs={12} md={6}>
          <img src={imagesUnsplashFaces[imageState]} height={"420"} />
        </Grid>)}
        <Grid item xs={12} md={6}>
          <Webcam audio={false} ref={webcam} screenshotFormat="image/jpeg" height={"420"}/>
        </Grid>
      </Grid>
      
      <br/>
      {state<6 &&
        <Button variant="contained" onClick={captureTotal}>Start shooting</Button>
      }
    </>
  );
};
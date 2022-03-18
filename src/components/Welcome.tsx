import React from "react";
import ResponsiveAppBar from "./ResponsiveAppBar";
import CoffeeMakerIcon from '@mui/icons-material/CoffeeMaker';
import "../css/welcome.css";
import { Button, Grid } from "@mui/material";
import { Navigate, useNavigate } from "react-router-dom";
import PresentationCard from "./Cards/PresentationCard";
import BasicPresentation from "../models/BasicPresentation";
import Presentation from "./Presentation";

interface BasicPresentationProps{
    firstname:String,
    lastname:String,
    mail:String,
    img : String,
    linkedin: String,
    github: String,
    description : String
}


export const Welcome=()=>{
    const navigate=useNavigate();
    function handleRegister():void{
       navigate('/register');
       
    }

    function handleCafy():void{
        navigate('/cafy');
     }

    
    return(
        <>
            <ResponsiveAppBar/>
            <Grid container  spacing={2} justifyContent="center">
                <Grid item xs={12} >
                    <h2>Welcome to Dark Cafy</h2>
                </Grid>
                <Grid item xs={12} md={4}>
                    <h3>Goal</h3>
                    <p> For our internship the M.I.C gave us
                        one of the best challenge : a coffee machine with facial recognition.
                    </p>
                    <img src="./images/mic.jpg" height="200px" />
                </Grid>
                <Grid item xs={12} md={4}>
                    <h3>Engine</h3>
                    <p> Delonghi Dynamica Plus ECAM370.95.T<CoffeeMakerIcon/></p>
                    <img src="./images/delonghi.jpg" height="200px"/>
                </Grid>
                <Grid item xs={12} md={4}>
                    <h3>How to ?</h3>
                    <ol>
                        <li>Register to our services : <Button onClick={handleRegister}>Register</Button></li>
                        <li>Try Dark Cafy : <Button onClick={handleCafy}>Cafy</Button></li>
                    </ol>
                </Grid>
                <Grid item xs={12} md={4}>
                    <h2>Who we are ?</h2>
                </Grid>
                {/*PRESENTATION*/}
                <Presentation/>
            </Grid>
        </>
    );
};

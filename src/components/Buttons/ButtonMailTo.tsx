import React from "react";
import { Link } from "react-router-dom";
import MailIcon from '@mui/icons-material/Mail';
import '../../css/presentationCards.css'

interface MailToProps{
    mailto:String
}

const ButtonMailto = ( props:MailToProps ) => {
    return (
        <a href={"mailto:"+props.mailto}><MailIcon className="mail" fontSize="large"/></a>
    );
};

export default ButtonMailto;
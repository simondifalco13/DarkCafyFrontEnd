import { CallAdapter } from '@azure/communication-react';
import { useEffect, useState } from 'react';
import { setSourceMapRange } from 'typescript';
import {User} from '../models/User';
const { AzureCommunicationTokenCredential } = require('@azure/communication-common');

interface CompositeProps{
    user : User;
    setUser : (user : User) => void //(params => return type)
}

export const CompositeExample = (props : CompositeProps) => {

    //const groupId = uuidv4()
    //console.log(groupId)
    const displayName = props.user.firstname+" "+props.user.lastname;
    const [callAdapter, setCallAdapter] = useState<CallAdapter>();

    useEffect( () =>{
        //maybe it's their first time making a call in that case we need to create a userid and token
        // and if  not we need to create a token for a specified userId
        fetch('https://generateatoken.azurewebsites.net/api/HttpTrigger1?code=w6MBbowsPjrXAi7GjonagoRclOb/hmou6ap8OzUNcboa2mq3d6xQKw==')
        .then(response => response.json())
        .then(data => {
            //console.log(data.value.item2.token);
            const credential = new AzureCommunicationTokenCredential(data.value.item2.token)
            //console.log(typeof credential)
            let newUser : User = props.user;
            console.log(newUser.firstname);
            // props.setUser({
            //     credential : credential;
            // });
        })
    })
    return(<div>
        Hello
    </div>)
}
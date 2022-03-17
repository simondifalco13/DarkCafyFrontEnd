import { CallAdapter, CallComposite, createAzureCommunicationCallAdapter, createStatefulCallClient } from '@azure/communication-react';
import { useEffect, useState } from 'react';
import {User} from '../models/User';
import {CommunicationTokenCredential} from '@azure/communication-common';
const { AzureCommunicationTokenCredential } = require('@azure/communication-common');

interface ComposableProps{
    user : User;
    setUser : (user : User) => void //(params => return type)
}

export const ComposableExample = (props :ComposableProps) =>{

    // const groupId = "https://teams.microsoft.com/l/meetup-join/19:E-XOvhOVxxLLvu3Drxe4m3IjiEfZZpZAPC7PL9XFqpg1@thread.tacv2/1647421849134?context=%7B%22Tid%22:%22fa911c00-bd75-4a67-b3b4-d78886d7b3ca%22,%22Oid%22:%2214495241-621f-4101-9bbf-19681330def3%22%7D" //teamsmeetinglink
    // const displayName = props.user.firstname+" "+props.user.lastname;
    // const [callAdapter, setCallAdapter] = useState<CallAdapter>();
    // const [statefulCallClient, setStatefulCallClient] = useState<StatefulCallClient>();
    // const [callAgent, setCallAgent] = useState<CallAgent>();
    // const [call, setCall] = useState<Call>();

    // useEffect( () =>{
    //     //maybe it's their first time making a call in that case we need to create a userid and token
    //     // and if  not we need to create a token for a specified userId

    //     //maybe it's the first call of the day, in that case, we need to start a call, if not we take the link in db
    //     fetch('https://generateatoken.azurewebsites.net/api/HttpTrigger1?code=w6MBbowsPjrXAi7GjonagoRclOb/hmou6ap8OzUNcboa2mq3d6xQKw==')
    //     .then(response => response.json())
    //     .then(data => {
    //         //console.log(data.value)
    //         const credential = new AzureCommunicationTokenCredential(data.value.item2.token)
    //         let newUser : User = props.user;
    //         newUser.userId=data.value.item1.id;
    //         newUser.credential=credential;
    //         props.setUser(newUser);
    //         console.log(props.user);
    //     })
    // }, [])

    // useEffect(()=> {
    //     const createState = async(user: User) : Promise<void> => {
    //         setStatefulCallClient(createStatefulCallClient({user.userId}))
    //     }
    //     //createState(user);
    // },[props.user])

    return <>
    </>
}
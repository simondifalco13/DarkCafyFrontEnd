import { CallAdapter, CallComposite, createAzureCommunicationCallAdapter } from '@azure/communication-react';
import { useEffect, useState } from 'react';
import {User} from '../models/User';
import {CommunicationTokenCredential} from '@azure/communication-common';


const { AzureCommunicationTokenCredential } = require('@azure/communication-common');


interface CompositeProps{
    user : User;
    setUser : (user : User) => void //(params => return type)
}

interface UserCredential{
    userId : string,
    token : any
}
//1ere personne qui commence un call, créér un call la seconde le rejoint
export const CompositeExample = (props : CompositeProps) => {

    //const groupId = "https://teams.microsoft.com/l/meetup-join/19:E-XOvhOVxxLLvu3Drxe4m3IjiEfZZpZAPC7PL9XFqpg1@thread.tacv2/1647421849134?context=%7B%22Tid%22:%22fa911c00-bd75-4a67-b3b4-d78886d7b3ca%22,%22Oid%22:%2214495241-621f-4101-9bbf-19681330def3%22%7D" //teamsmeetinglink
    const groupId = '3d0018d6-74bb-4769-b7bc-a937e7a2d74d';
    const displayName = props.user.firstname+" "+props.user.lastname;
    const [callAdapter, setCallAdapter] = useState<CallAdapter>();
    const [userCredential, setUserCredential] = useState<UserCredential>({userId : "", token : undefined});

    useEffect( () =>{
        console.log("first useEffect")
        //maybe it's their first time making a call in that case we need to create a userid and token
        // and if  not we need to create a token for a specified userId
        fetch('https://generateatoken.azurewebsites.net/api/HttpTrigger1?code=w6MBbowsPjrXAi7GjonagoRclOb/hmou6ap8OzUNcboa2mq3d6xQKw==')
        .then(response => response.json())
        .then(data => {
            console.log(data.value)
            const credential = new AzureCommunicationTokenCredential(data.value.item2.token)
            // let newUser : User = props.user;
            // newUser.userId=data.value.item1.id;
            // newUser.credential=credential;
            // props.setUser(newUser);
            // console.log(props.user);
            //let newUserCredential.token : UserCredential.token = credential;
            userCredential.userId= data.value.item1.id;
            userCredential.token = credential
            //setUserCredential(data.value.item1.id,credential);
            console.log(userCredential);
        })
    }, [])


    useEffect(() => {
        if(userCredential.token!==undefined){
            console.log("second useEffect");
            const createAdapter = async (user:  UserCredential): Promise<void> => {
        console.log("cr "+user.token)

                setCallAdapter(
                    await createAzureCommunicationCallAdapter({
                        //console.log("cr"+defineduser.credential)
                        userId : {communicationUserId : props.user.userId},
                        displayName,
                        credential : user.token,
                        locator: {groupId} //teamsmeetinglink or uuid
                    })
                );
                console.log("cr2 "+typeof user.token)
            };
            //console.log
            createAdapter(userCredential);
        }
    },[userCredential]);
    return(<div style={{height: '100vh'}}>
        {callAdapter && <CallComposite adapter={callAdapter}/>}
    </div>)
}
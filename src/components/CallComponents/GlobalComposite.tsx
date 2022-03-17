import { CallAdapter, CallComposite, createAzureCommunicationCallAdapter } from '@azure/communication-react';
import { GroupCallLocator, GroupLocator, TeamsMeetingLinkLocator } from '@azure/communication-calling';
import { useEffect, useState } from 'react';
import {CallUser} from '../../models/CallUser';
import { fetchTokenResponse } from './Utils';
import { useNavigate } from 'react-router-dom';
//import {CommunicationTokenCredential} from '@azure/communication-common';


const { AzureCommunicationTokenCredential } = require('@azure/communication-common');

interface CompositeProps{
    user : CallUser;
    groupId: GroupCallLocator;
}
//1ere personne qui commence un call, créér un call la seconde le rejoint
const GlobalComposite = (props : CompositeProps) => {
    const navigate=useNavigate();
    const displayName = props.user.displayName;
    const [callAdapter, setCallAdapter] = useState<CallAdapter>();
    const [callLocator, setCallLocator] = useState<GroupLocator | TeamsMeetingLinkLocator>(props.groupId);
    const [user,setUser]=useState<CallUser>();

    useEffect(() => {
        window.addEventListener("popstate", (event) => {
          if(callAdapter!=undefined){
            console.log("HERE");
            if(user?.userId!==undefined){
                callAdapter.removeParticipant(user?.userId);
            }
            navigate("/cafy");
          }
        });
      }, [callAdapter]);

    useEffect( () =>{
        //maybe it's their first time making a call in that case we need to create a userid and token
        // and if  not we need to create a token for a specified userId
        fetch('https://localhost:44392/api/AzureCommunicationIdentity')
        .then(response => response.json())
        .then(data => {
            //console.log(data.value)
            const token = data.accessToken.token;
            var userId=data.user.id;
            const credential = new AzureCommunicationTokenCredential(token)
            let newUser : CallUser = props.user;
            newUser.userId=userId;
            newUser.credentials=credential;
            setUser(newUser);
        })
    }, [])

    useEffect(() => {
        (async () =>{
            if(user!==undefined){
                const createAdapter = await createAzureCommunicationCallAdapter({
                    userId : {communicationUserId : props.user.userId},
                    displayName,
                    credential : user.credentials,
                    locator: callLocator 
                });
                createAdapter.on('callEnded', () => {
                    navigate("/cafy");
                });
                setCallAdapter(createAdapter);
            }
        })();
        
    },[user]);


    console.log(user?.userId);
    return(<div style={{height: '100vh'}}>
        {callAdapter && <CallComposite adapter={callAdapter} />}
    </div>)
}

export default GlobalComposite;
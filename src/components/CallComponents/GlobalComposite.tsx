import { CallAdapter, CallComposite, createAzureCommunicationCallAdapter } from '@azure/communication-react';
import { GroupCallLocator, GroupLocator, TeamsMeetingLinkLocator } from '@azure/communication-calling';
import { useEffect, useState } from 'react';
import {CallUser} from '../../models/CallUser';
import { fetchTokenResponse } from './Utils';
import { useNavigate } from 'react-router-dom';
//import {CommunicationTokenCredential} from '@azure/communication-common';


const { AzureCommunicationTokenCredential } = require('@azure/communication-common');

function refreshPage() {
    window.location.reload();
}

interface CompositeProps{
    user : CallUser;
    groupId: GroupCallLocator;
    setCallRunning :(callRunning : boolean) => void;
}
//1ere personne qui commence un call, créér un call la seconde le rejoint
const GlobalComposite  = (props : CompositeProps)  => {
    const navigate=useNavigate();
    const displayName = props.user.displayName;
    const [callAdapter, setCallAdapter] = useState<CallAdapter>();
    const [callLocator, setCallLocator] = useState<GroupLocator | TeamsMeetingLinkLocator>(props.groupId);
    const [user,setUser]=useState<CallUser>();
    

    useEffect(() => {
        window.addEventListener("popstate", (event) => {
          event.preventDefault();
          if(callAdapter!=undefined){
            if(user?.userId!==undefined){
                callAdapter.removeParticipant(user.userId);
                props.setCallRunning(false);
            }
            callAdapter.leaveCall();
            callAdapter.dispose();

            window.location.href="/cafy";
          }
        });
      }, [callAdapter]);

    useEffect( () =>{
        fetch('https://localhost:44392/api/AzureCommunicationIdentity')
        .then(response => response.json())
        .then(data => {
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
            if(user!==undefined ){
                setCallAdapter(callAdapter);
                const createAdapter = await createAzureCommunicationCallAdapter({
                    userId : {communicationUserId : props.user.userId},
                    displayName,
                    credential : user.credentials,
                    locator: callLocator 
                });
                createAdapter.on('callEnded', () => {
                    props.setCallRunning(false);
                    if(user?.userId!==undefined){
                        createAdapter.removeParticipant(user?.userId);
                    }
                    window.location.href="/cafy";
                });
                setCallAdapter(createAdapter);
                callAdapter?.on('callEnded', () => {
                    props.setCallRunning(false);
                    if(user?.userId!==undefined){
                        createAdapter.removeParticipant(user?.userId);
                    }
                    window.location.href="/cafy";
                });
            }
        })();
        
    },[user]);

    return(<div style={{height: '60vh'}}>
        {callAdapter && <CallComposite adapter={callAdapter} />}
    </div>)
}

export default GlobalComposite;
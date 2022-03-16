import {User} from '../models/User';
import {CompositeExample} from './CompositeExample';

interface StartCallProps{
    user : User;
    setUser : (user : User) => void;
}

export const StartCall = (props :StartCallProps) => {
return (
    //possibilité de définir un pseudo ? 
    <div>
        Teams
        <p>{props.user.firstname}</p>
        <CompositeExample user={props.user} setUser={props.setUser}/>
    </div>
);
}
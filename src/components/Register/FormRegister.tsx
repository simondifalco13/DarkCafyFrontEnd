import React from "react";
import ResponsiveAppBar from "../ResponsiveAppBar";
import { useForm, SubmitHandler } from "react-hook-form";
import ReactSelect from "react-select";
import { useNavigate } from "react-router-dom";
import InputLabel from '@mui/material/InputLabel';

import "../../css/form.css";
import { User } from "../../models/User";
import { Autocomplete, Box, FormControl, MenuItem, Select } from "@mui/material";
import { InputSharp } from "@mui/icons-material";
import { setSourceMapRange } from "typescript";
import { Navigate } from "react-router-dom";

type Inputs = {
   firstname:string,
   lastname:string,
   mail:string,
   coffee:string
};

interface BasicFormProps{
    user: User,
    setUser: (user:User)=> void
}


export const FormRegister=(props:BasicFormProps)=>{

    const navigate=useNavigate();
    const { register, handleSubmit, watch, setValue,formState: { errors } } = useForm<Inputs>();
    const onSubmit: SubmitHandler<Inputs> = data => Validate(data,props.user,props.setUser);
    const [coffee, setCoffee] = React.useState('');

    async function Request() {
        const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json',
          'Access-Control-Allow-Origin':'*',
          "Cross-Origin":"*",
          "Access-Control-Allow-Credentials": "true",
          "Access-Control-Allow-Methods": "*"
        },
          body: ""
        };
        const response = await fetch('https://localhost:44392/api/user/esp', requestOptions);
      }

    function Validate(data:Inputs,user:User,setUser:(u:User)=> void){
        user.favouriteCoffee=coffee;
        user.firstname=data.firstname;
        user.lastname=data.lastname;
        user.mail=data.mail;
        setUser(user);
        navigate('/register/face');
    }

    return (
        <>
            <ResponsiveAppBar/>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label htmlFor="firstname">Firstname </label>
                    <input placeholder="John"{...register("firstname", { required: true })} />
                    {errors.firstname && <span className="error">This field is required</span>}
                </div>           
                <div>
                    <label htmlFor="lastname">Lastname </label>
                    <input placeholder="Doe"{...register("lastname", { required: true })} />
                    {errors.lastname && <span className="error">This field is required</span>}
                </div>
                <div>
                    <label htmlFor="mail">Mail </label>
                    <input placeholder="example.e@host.com"{...register("mail", { required: true })} />
                    {errors.mail && <span className="error">This field is required</span>}
                </div>
                <div className="divSelect">
                    <Box sx={{ minWidth: 300 }}>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Coffee</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={coffee}
                                label="Coffee"
                                onChange={(e) => setCoffee(e.target.value as string)}
                            >
                                <MenuItem value={"doppio"}>Doppio</MenuItem>
                                <MenuItem value={"coffee"}>Coffee (simple)</MenuItem>
                                <MenuItem value={"long"}>Long</MenuItem>
                                <MenuItem value={"americano"}>Americano</MenuItem>
                                <MenuItem value={"double_espresso"}>Double Espresso</MenuItem>
                                <MenuItem value={"espresso"}>Espresso</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>
                </div>         

                <input type="submit" value={"Validate"} />
            </form>
        </>
    );
    
};
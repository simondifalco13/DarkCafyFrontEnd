import React from "react";
import ResponsiveAppBar from "../ResponsiveAppBar";
import { useForm, SubmitHandler } from "react-hook-form";
import "../../css/form.css";
import { User } from "../../models/User";

type Inputs = {
    ipAddr: string,
};




export const FormEsp=()=>{

    const { register, handleSubmit, watch, formState: { errors } } = useForm<Inputs>();
    const onSubmit: SubmitHandler<Inputs> = data => Request(data.ipAddr);
    console.log(watch("ipAddr")) // watch input value by passing the name of it

    async function Request(ipAddr:string) {
        const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json',
          'Access-Control-Allow-Origin':'*',
          "Cross-Origin":"*",
          "Access-Control-Allow-Credentials": "true",
          "Access-Control-Allow-Methods": "*"
        },
          body: "\""+ipAddr+"\""
        };
        const response = await fetch('https://localhost:44392/api/user/esp', requestOptions);
      }

    return (
        <>
            <ResponsiveAppBar/>
            <p>For the configuration of your Dark Cafy, please enter the IP address of your ESP32 
                (configured with the following code ...) 
            </p>
            <form onSubmit={handleSubmit(onSubmit)}>
                <label htmlFor="ipAddr">Esp ip </label>
                <input placeholder="ex : 127.0.0.1"{...register("ipAddr", { required: true })} />
                {errors.ipAddr && <span className="error">This field is required</span>}
                
                <input type="submit" value={"Validate"}/>
            </form>
        </>
    );
    
};


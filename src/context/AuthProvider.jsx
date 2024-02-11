import React from 'react'
import { createContext, useEffect, useState } from 'react'
import { Global } from '../helpers/Global';

//necesito acceder a esto
const AuthContext = createContext();


//este contexto servira para compartir la autenticacion en toda la aplicacion cuando te loguees
//este provider se ejecutara cada vez que le pase un children
export const AuthProvider = ({children}) => {
    
    const [auth, setAuth] =  useState({});
    //pantalla de carga
    const [loading, setLoading] =  useState(true);

    useEffect(()=>{
        authUser();
    },[]);

    const authUser = async()=>{
        //sacar datos usuario identificado del localstorange
        const token = localStorage.getItem("token");
        const user = localStorage.getItem("user");

        //comprobar si tengo el token y el user
        if(!token || !user){
            setLoading(false);
            return false;
        }

        //transformar los datos a un objeto javascript
        const userObj = JSON.parse(user);
        const userId = userObj.id;
        console.log(userId);

        //peticion ajax al backend que compruebe el token y
        //que me devuelva todos los datos del usuario
        const request = await fetch(Global.urlApiWeb + "user/profile/" + userId, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": token
            }
        });
        const data = await request.json();      

        //setear el estado de auth
        setAuth(data.user);    

        setLoading(false);

        console.log(auth);
    }

    return ( 
        <AuthContext.Provider
            value={{
                auth,
                setAuth,
                loading
            }}
        >

            {/*componente hijo que cargara*/}
            {children}
        </AuthContext.Provider>  
    )
}



export default AuthContext;
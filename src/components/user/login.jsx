import React,  {useState, useEffect} from 'react'
import { Global } from '../../helpers/Global';
import useAuth from '../../hooks/useAuth';
import { useForm } from '../../hooks/useForm'
import { BrowserRouter, Routes, Route, Link, useNavigate } from 'react-router-dom';
import eyLogo from '../../assets/img/ey-logo.png'

export const Login = () => {
    //Hook form
    const { form, changed } = useForm({});
    //Saved - setSaved
    const [saved, setSaved] = useState("not_sended");

    //Hook Auth
    const {auth,setAuth} = useAuth();

    const navigate = useNavigate();

    

    const loginUser = async (e) => {
        e.preventDefault();
        //datos del formulario
        let userToLogin = form;
        console.log(form);
        //peticion al backend
        const request = await fetch(Global.urlApiWeb + "user/login", {
          method: "POST",
          body: JSON.stringify(userToLogin),
          headers: {
            "Content-Type": "application/json"
          }    
        });
        //Esperamos la data
        const data = await request.json();
        console.log(data);
    
        //Respuesta valida del backend
        if (data.status === "success") {
          //persistir los datos en el navegador y en todo el proyecto
          //guardamos el token y el usuario en el localStorage de la pagina
          localStorage.setItem("token", data.token);
          localStorage.setItem("user", JSON.stringify(data.user));
          
          setSaved("success");
          //set datos en el auth
          setAuth(data.user);

            //redireccion
            setTimeout(() => {
                navigate('/diligencia');
            }, 2000);
            
    
    
        } else {
          setSaved("error");
        }
    
    }


     
    return (
        <>
            <div className="login-container">  
            <h1 className='login-container-parrafo'>EY PREMIADA POR UNIVERSUM COMO EL MEJOR LUGAR PARA TRABAJAR</h1>
            {saved === "success" && (
                <div className="green-text">Usuario Identificado Correctamente</div>
                )}

                {saved === "error" && (
                <div className="red-text">No se pudo Identificar el usuario</div>
                )}


                <div className="row">
                    <div className='imagen-centrada'>
                        <img className='img-logo' src={eyLogo} alt="Descripción de la imagen" />
                    </div>

                    <form className="col s12" onSubmit={loginUser}>

                        <div className="input-field col s12">
                            <label htmlFor="email">Email</label>
                            <input type="email" name="email" onChange={changed}></input>
                        </div>

                        <div className="input-field col s12">
                            <label htmlFor="password">Password</label>
                            <input type="password" name="password" onChange={changed}></input>
                        </div> 

                        <input type="submit" className="btn waves-effect waves-light" value="LOGIN"></input>          
                    </form>
                    {/*
                    <div class="row">                        
                        <div class="col s6">
                            <button class="btn waves-effect waves-light" type="submit" name="action">Register
                            <i class="material-icons right">person_add</i>
                            </button>
                        </div>
                    </div>
                    */}
                </div>
            </div>
        </>
    )
}
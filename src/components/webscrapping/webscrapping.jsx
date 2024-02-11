import React,  {useState, useEffect} from 'react';
import M from 'materialize-css';
import { Global } from '../../helpers/Global';
import {SerializeForm} from '../../helpers/SerializeForm'
import useAuth from '../../hooks/useAuth';
import { useForm } from '../../hooks/useForm'
import { BrowserRouter, Routes, Route, Link, useNavigate, NavLink, Navigate } from 'react-router-dom';
import moment from 'moment';
import { v4 as uuidv4 } from 'uuid'; 


export const Webscrapping = () => {
     //Hook form
     const { form, changed } = useForm({});

     //Hook Auth
    const {auth, setAuth} = useAuth();

    

    const [ofac, setOfac] = useState([]);
    const [offshore, setOffshore] = useState([]);
    const [worldbank, setWorldbank] = useState([]);

    useEffect(() => {
        getList();
    }, [4000]); 

    const getList = async () => { 
        const request = await fetch(Global.urlApiWeb + "user/listado", {
            method: "POST",
            headers: {
                "accept": "text/plain",
                "Authorization": localStorage.getItem("token") 
            }
        });
        let data = await request.json();
        
        let temporalworldBank = [];
        let temporalOffshore = [];
        let temporalOfac = [];

        data.worldBank.forEach(element => {
            element.data.forEach(item => {
                temporalworldBank.push(item);
            });
        });


        data.offshore.forEach(element => {
            element.data.forEach(item => {
                temporalOffshore.push(item);
            });
        });


        data.ofac.forEach(element => {
            element.data.forEach(item => {
                temporalOfac.push(item);
            });
        });

        setOfac(temporalOfac);
        setWorldbank(temporalworldBank);
        setOffshore(temporalOffshore);   
        //ARRAY POR LOS TEMPORALES
        console.log(Array.isArray(ofac));


    }

    const addOfac = async (e) => {
        e.preventDefault();
        let search = form;
        console.log(form);
        //peticion al backend
        const request = await fetch(Global.urlApiWeb + "user/saveOFAC", {
          method: "POST",
          body: JSON.stringify(search),
          headers: {
            "Content-Type": "application/json",            
            "Authorization": localStorage.getItem("token") 
          }    
        });
        let data = await request.json();
        if(data.status == "success"){
            console.log("exitoso busqueda");
            getList();
        }        
    }

    const addWorldBank = async (e) => {
        e.preventDefault();
        let search = form;
        console.log(form);
        //peticion al backend
        const request = await fetch(Global.urlApiWeb + "user/saveWorldBank", {
          method: "POST",
          body: JSON.stringify(search),
          headers: {
            "Content-Type": "application/json",            
            "Authorization": localStorage.getItem("token") 
          }    
        });
        let data = await request.json();
        if(data.status == "success"){
            console.log("exitoso busqueda");
            getList();
        }        
    }


    const addOFFSHORE = async (e) => {
        e.preventDefault();
        let search = form;
        console.log(form);
        //peticion al backend
        const request = await fetch(Global.urlApiWeb + "user/saveOffshore", {
          method: "POST",
          body: JSON.stringify(search),
          headers: {
            "Content-Type": "application/json",            
            "Authorization": localStorage.getItem("token") 
          }    
        });
        let data = await request.json();
        if(data.status == "success"){
            console.log("exitoso busqueda");
            getList();
        }        
    }


  

    return (
        <>
        {auth.id ? 
        <>
            <nav>
                <div className="nav-wrapper">
                <span className="app-title">Aplicacion para la gestion de diligencia</span>
                </div>
            </nav>
            <div className="row menu-opciones">
                <div className="col s3">
                    <ul className="tabs menu-opciones-ul">
                        <li>
                            <NavLink to="/diligencia">DILIGENCIA</NavLink>
                        </li>
                        <li>
                            <NavLink to="/webscrapping">WEB SCRAPPING</NavLink>
                        </li>
                    </ul>
                </div>
            </div>

            <div className="container body-deligencia">        

            <h4 className='titulo-diligencia'>WEB SCRAPPING OFAC</h4>

            <div className="header-crud buscar-datos">  
            <form className="webscrapping-ofac-search" onSubmit={addOfac}>
                <input type="text" id="search" name="search" placeholder="Search..." onChange={changed}/>
                <input type="submit" value="Buscar Datos" className="btn waves-light search-btn" id="search-btn" />
            </form>              
            </div>
           
            <table className="striped">
                <thead>
                <tr>
                    <th>FirmName</th>
                    <th>Address</th>
                    <th>Type</th>
                    <th>Program</th>
                    <th>List</th>
                    <th>Score</th>
                </tr>
                </thead>
                <tbody id="table-body"> 

                {ofac.map(of => (
                    <tr key={uuidv4()}> 
                        <td>{of.FirmName}</td>
                        <td>{of.Address}</td>
                        <td>{of.Type}</td>
                        <td>{of.Program}</td>
                        <td>{of.List}</td>   
                        <td>{of.Score}</td>                        
                    </tr>
                ))}               
                </tbody>
            </table> 
           
            </div>
          

            <div className="container body-deligencia">        

            <h4 className='titulo-diligencia'>WEB SCRAPPING OFFSHORE</h4>

            <div className="header-crud buscar-datos">                
                <form className="webscrapping-ofac-search" onSubmit={addOFFSHORE}>
                    <input type="text" id="search" name="search" placeholder="Search..." onChange={changed}/>
                    <input type="submit" value="Buscar Datos" className="btn waves-light search-btn" id="search-btn" />
                </form> 
            </div>
           
            <table className="striped">
                <thead>
                <tr>
                    <th>Entity</th>
                    <th>Jurisdiction</th>
                    <th>LinkedTo</th>
                    <th>DataFrom</th>
                </tr>
                </thead>
                <tbody id="table-body">  

                {offshore.map(off => (
                    <tr key={uuidv4()}> 
                        <td>{off.Entity}</td>
                        <td>{off.Jurisdiction}</td>
                        <td>{off.LinkedTo}</td>
                        <td>{off.DataFrom}</td>                       
                    </tr>
                ))}               
                </tbody>
            </table> 
           
            </div>


            <div className="container body-deligencia">        

                <h4 className='titulo-diligencia'>WEB SCRAPPING WORLDBANK</h4>

                <div className="header-crud buscar-datos">                
                    <form className="webscrapping-ofac-search" onSubmit={addWorldBank}>
                        <input type="text" id="search" name="search" placeholder="Search..." onChange={changed}/>
                        <input type="submit" value="Buscar Datos" className="btn waves-light search-btn" id="search-btn" />
                    </form> 
                </div>

                <table className="striped">
                    <thead>
                    <tr>
                        <th>FirmName</th>
                        <th>Address</th>
                        <th>Country</th>
                        <th>FromDate</th>
                        <th>ToDate</th>
                        <th>Grounds</th>
                    </tr>
                    </thead>
                    <tbody id="table-body">  

                    {worldbank.map(world => (
                        <tr key={uuidv4()}> 
                            <td>{world.FirmName}</td>
                            <td>{world.Address}</td>
                            <td>{world.Country}</td>
                            <td>{world.FromDate}</td>
                            <td>{world.ToDate}</td>   
                            <td>{world.Grounds}</td>                         
                        </tr>
                    ))}               
                    </tbody>
                </table> 

            </div>
            </>
            : <Navigate to="/login"></Navigate> 
            }
            
        </>
    )
}
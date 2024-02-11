import React,  {useState, useEffect} from 'react';
import M from 'materialize-css';
import { Global } from '../../helpers/Global';
import {SerializeForm} from '../../helpers/SerializeForm'
import useAuth from '../../hooks/useAuth';
import { useForm } from '../../hooks/useForm'
import { BrowserRouter, Routes, Route, Link, useNavigate, NavLink, Navigate  } from 'react-router-dom';
import moment from 'moment';

export const Deligencia = () => {   

    //Hook form
    const { form, changed } = useForm({});
    //Saved - setSaved
    const [saved, setSaved] = useState("not_sended");
    //Hook Auth
    const {auth, setAuth} = useAuth();

    const navigate = useNavigate();

    const [deligencia, setDeligencia] = useState({});

    const [deligencias, setDeligencias] = useState([]);



    useEffect(() => {
        getDeligencia();
        // Inicializa los modales de Materialize
        const elemsModal = document.querySelectorAll('.modal');       
        M.Modal.init(elemsModal);
    }, []); 

  
    const addDeligencia = async (e) => {
        e.preventDefault();
        let datosDeligencia = form;
        console.log(form);
        //peticion al backend
        const request = await fetch(Global.urlApiDeli + "Proveedors", {
            method: "POST",
            body: JSON.stringify(datosDeligencia),
            headers: {
                "Content-Type": "application/json"  
            }
        });
        if(request.ok){
            const request = await fetch(Global.urlApiDeli + "Proveedors", {
                method: "GET",
                headers: {
                    "accept": "text/plain" 
                }
            });
            if(request.ok){
                let data = await request.json();        
                setDeligencias(data); 
            }
            const modalInstance = M.Modal.getInstance(document.querySelector('#modal-add'));
            modalInstance.close();
        }
    }

    const getDeligencia = async () => { 
        const request = await fetch(Global.urlApiDeli + "Proveedors", {
            method: "GET",
            headers: {
                "accept": "text/plain" 
            }
        });
        if(request.ok){
            let data = await request.json();        
            setDeligencias(data);         
        }          
    }

    const deleteDeligencia = async (deliId) =>{
        const request = await fetch(Global.urlApiDeli + "Proveedors/" +deliId,{
            method: "DELETE",
            headers: {                
                "Content-Type": "application/json",
            }
        })
        if(request.ok)
        {
            getDeligencia();
        }
    }

    const getOneDeligencia = async (deliId) => {
        const request = await fetch(Global.urlApiDeli + "Proveedors/"+deliId);
        if(request.ok){
            let data = await request.json();
            console.log(data);
            setDeligencia(data);
        }
    }

    const EditOneDeligencia = async (e,deliId) => {
        e.preventDefault();
        //recoger datos del formulario
        let deliActualizada = SerializeForm(e.target);
        console.log(deliActualizada);
        
        const request = await fetch(Global.urlApiDeli + "Proveedors/"+deliId, {
            method: "PUT",
            body: JSON.stringify(deliActualizada),
            headers: {
                "Content-Type": "application/json",
            }
        });
        if(request.ok){
            console.log("actualizado");
            const request = await fetch(Global.urlApiDeli + "Proveedors", {
                method: "GET",
                headers: {
                    "accept": "text/plain" 
                }
            });
            if(request.ok){
                let data = await request.json();        
                setDeligencias(data); 
            }
            const modalInstance = M.Modal.getInstance(document.querySelector('#modal-edit'));
            modalInstance.close();
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

            <h4 className='titulo-diligencia'>CONTROL DE DILIGENCIAS</h4>

            <div className="header-crud">
                <button className="btn waves-light modal-trigger" data-target="modal-add">Add New</button>
            </div>
           
            <table className="striped">
                <thead>
                <tr>
                    <th>Razón</th>
                    <th>Nombre</th>
                    <th>Identificación</th>
                    <th>Teléfono</th>
                    <th>Correo</th>
                    <th>Sitio</th>
                    <th>Dirección</th>
                    <th>País</th>
                    <th>Facturación</th>
                    <th>Última Edición</th>
                    <th>Action</th>
                </tr>
                </thead>
                <tbody id="table-body">  

                {deligencias.map(deli => (
                    <tr key={deli.id}> 
                        <td>{deli.razonSocial}</td>
                        <td>{deli.nombreComercial}</td>
                        <td>{deli.identificacionTributaria}</td>
                        <td>{deli.numeroTelefonico}</td>
                        <td>{deli.correoElectronico}</td>
                        <td><a href="{deli.sitioWeb}">{deli.sitioWeb}</a></td>
                        <td>{deli.direccionFisica}</td>
                        <td>{deli.pais}</td>
                        <td>{deli.facturacionAnual}</td>
                        <td>{new Date(deli.fechaUltimaEdicion).toLocaleDateString()}</td>
                        <td className="action-btns">
                            <button className="btn-small waves-light blue modal-trigger" onClick={()=>getOneDeligencia(deli.id)} data-target="modal-edit">Edit</button>
                            <button className="btn-small waves-light red" onClick={() => deleteDeligencia(deli.id)}>Delete</button>
                            <button className="btn-small waves-light read-btn modal-trigger" onClick={()=>getOneDeligencia(deli.id)} data-target="modal-profile">Read</button>
                        </td>
                    </tr>
                ))}               
                </tbody>
            </table> 
           
        </div>

        <div id="modal-add" className="modal">
            <div className="modal-content">
            <h4>Ingrese Diligencia</h4>
            <form id="add-form" onSubmit={addDeligencia}>
                <div className="input-field">
                <input type="text" id="razon-add" name="razonSocial" required onChange={changed}/>
                <label htmlFor="razon-add">Razón Social</label>
                </div>
                <div className="input-field">
                <input type="text" id="nombre-add" name="nombreComercial" required onChange={changed}/>
                <label htmlFor="nombre-add">Nombre Comercial</label>
                </div>
                <div className="input-field">
                <input type="number" id="identificacion-add" name="identificacionTributaria" required onChange={changed}/>
                <label htmlFor="identificacion-add">Identificación Tributaria</label>
                </div>
                <div className="input-field">
                <input type="tel" id="telefono-add" name="numeroTelefonico" required onChange={changed}/>
                <label htmlFor="telefono-add">Número Telefónico</label>
                </div>
                <div className="input-field">
                <input type="email" id="correo-add" name="correoElectronico"  required onChange={changed}/>
                <label htmlFor="correo-add">Correo Electrónico</label>
                </div>
                <div className="input-field">
                <input type="text" id="sitio-add" name="sitioWeb" required onChange={changed}/>
                <label htmlFor="sitio-add">Sitio Web</label>
                </div>
                <div className="input-field">
                <input type="text" id="direccion-add" name="direccionFisica" required onChange={changed}/>
                <label htmlFor="direccion-add">Dirección Física</label>
                </div>
                <div className="input-field">
                <input type="text" id="pais-add" name="pais" required onChange={changed}/>
                <label htmlFor="pais-add">País</label>
                </div>
                <div className="input-field">
                <input type="number" id="facturacion-add" name="facturacionAnual" required onChange={changed}/>
                <label htmlFor="facturacion-add">Facturación Anual (USD)</label>
                </div>
                <div className="input-field">
                <input type="date" id="fecha-add" name="fechaUltimaEdicion" required onChange={changed}/>
                <label htmlFor="fecha-add">Fecha de Última Edición</label>
                </div>
                <button className="btn waves-effect waves-light" type="submit">Registrar Deligencia</button>
            </form>
            </div>
        </div>

        <div id="modal-edit" className="modal">
            <div className="modal-content">
            <h4>Editar Diligencia</h4>
            <form id="edit-form" onSubmit={(e) => EditOneDeligencia(e, deligencia.id)}>
                <input type="hidden" name="id" value={deligencia.id} />
                <div className="input-field">
                <input type="text" id="razon-edit" required name="razonSocial" defaultValue={deligencia.razonSocial} onChange={changed}/>
                <label htmlFor="razon-edit" className={deligencia.razonSocial ? 'active' : ''}>Razón Social</label>
                </div>
                <div className="input-field">
                <input type="text" id="nombre-edit" required name="nombreComercial" defaultValue={deligencia.nombreComercial} onChange={changed}/>
                <label htmlFor="nombre-edit" className={deligencia.nombreComercial ? 'active' : ''}>Nombre Comercial</label>
                </div>
                <div className="input-field">
                <input type="number" id="identificacion-edit" name="identificacionTributaria" required defaultValue={deligencia.identificacionTributaria} onChange={changed}/>
                <label htmlFor="identificacion-edit" className={deligencia.identificacionTributaria ? 'active' : ''}>Identificación Tributaria</label>
                </div>
                <div className="input-field">
                <input type="tel" id="telefono-edit" required name="numeroTelefonico" defaultValue={deligencia.numeroTelefonico} onChange={changed}/>
                <label htmlFor="telefono-edit" className={deligencia.numeroTelefonico ? 'active' : ''}>Número Telefónico</label>
                </div>
                <div className="input-field">
                <input type="email" id="correo-edit" required name="correoElectronico" defaultValue={deligencia.correoElectronico} onChange={changed}/>
                <label htmlFor="correo-edit" className={deligencia.correoElectronico ? 'active' : ''}>Correo Electrónico</label>
                </div>
                <div className="input-field">
                <input type="text" id="sitio-edit" required name="sitioWeb" defaultValue={deligencia.sitioWeb} onChange={changed}/>
                <label htmlFor="sitio-edit" className={deligencia.sitioWeb ? 'active' : ''}>Sitio Web</label>
                </div>
                <div className="input-field">
                <input type="text" id="direccion-edit" required name="direccionFisica" defaultValue={deligencia.direccionFisica} onChange={changed}/>
                <label htmlFor="direccion-edit"  className={deligencia.direccionFisica ? 'active' : ''}>Dirección Física</label>
                </div>
                <div className="input-field">
                <input type="text" id="pais-edit" required name="pais" defaultValue={deligencia.pais} onChange={changed}/>
                <label htmlFor="pais-edit" className={deligencia.pais ? 'active' : ''}>País</label>
                </div>
                <div className="input-field">
                <input type="number" id="facturacion-edit" required name="facturacionAnual" defaultValue={deligencia.facturacionAnual} onChange={changed}/>
                <label htmlFor="facturacion-edit" className={deligencia.facturacionAnual ? 'active' : ''}>Facturación Anual (USD)</label>
                </div>
                <div className="input-field">
                <input type="date" id="fecha-edit" className="datepicker" required  name="fechaUltimaEdicion" defaultValue={new Date(deligencia.fechaUltimaEdicion).toLocaleDateString()} onChange={changed}/>
                <label htmlFor="fecha-edit" className={deligencia.fechaUltimaEdicion ? 'active' : ''}>Fecha de Última Edición</label>
                </div>
                <button className="btn waves-light" type="submit">Guardar Cambios</button>
            </form>
            </div>
        </div>


        <div id="modal-profile" className="modal">
            <div className="modal-content">
                <h4 className="center-align" style={{ marginBottom: '20px', fontSize: '24px', fontWeight: 'bold', color: '#333', letterSpacing: '4px' }}>Detalles de la Diligencia</h4>
                <div className="row">
                    <div className="col s12">
                        <div className="card blue-grey darken-1">
                            <div className="card-content white-text">
                                <p><strong>Razón Social:</strong> {deligencia.razonSocial}</p>
                                <p><strong>Nombre Comercial:</strong> {deligencia.nombreComercial}</p>
                                <p><strong>Identificación Tributaria:</strong> {deligencia.identificacionTributaria}</p>
                                <p><strong>Número Telefónico:</strong> {deligencia.numeroTelefonico}</p>
                                <p><strong>Correo Electrónico:</strong> {deligencia.correoElectronico}</p>
                                <p><strong>Sitio Web:</strong> {deligencia.sitioWeb}</p>
                                <p><strong>Dirección Física:</strong> {deligencia.direccionFisica}</p>
                                <p><strong>País:</strong> {deligencia.pais}</p>
                                <p><strong>Facturación Anual (USD):</strong> {deligencia.facturacionAnual}</p>
                                <p><strong>Fecha de Última Edición:</strong> {new Date(deligencia.fechaUltimaEdicion).toLocaleDateString()}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
        : <Navigate to="/login"></Navigate>
        }
        </>
      )
}
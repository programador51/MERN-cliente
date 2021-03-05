import React,{useContext, useEffect} from 'react';
import Sidebar from '../layout/Sidebar';
import Barra from '../layout/Barra';
import FormTarea from '../tareas/FormTarea';
import ListadoTarea from '../tareas/ListadoTarea';
import AuthContext from '../../context/autenticacion/authContext';

const Proyectos = () => {

    /* Extraer la infomracion de autenticacion */
    const authToken = useContext(AuthContext);
    const {usuarioAutenticado} = authToken;

    useEffect(()=>{
        usuarioAutenticado();
    },[]);

    return (
        <div className="contenedor-app">
            <Sidebar/>
            <div className="seccion-principal">
                
                <Barra/>
                
                <main>
                    <FormTarea/>
                    <div className="contenedor-tareas">
                        <ListadoTarea/>
                    </div>
                </main>
            </div>
        </div>
    );
}
 
export default Proyectos;
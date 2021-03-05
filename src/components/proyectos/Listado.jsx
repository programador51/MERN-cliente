import React, { useContext, useEffect } from 'react';
import Proyecto from './Proyecto';
import proyectoContext from '../../context/proyectos/proyectoContext';
import AlertaContext from '../../context/alertas/alertaContext';

const Listado = () => {

    /* Extrar proyectos de state inicial */
    const {mensaje,proyectos,obtenerProyectos} = useContext(proyectoContext);
    const {alerta,mostrarAlerta} = useContext(AlertaContext);

    /* Obtener proyectos cuando carga el proyecto */
    useEffect(()=>{
        if(mensaje){
            console.log('error');
            mostrarAlerta(mensaje.msg,mensaje.categoria)
        }

        obtenerProyectos();
        // eslint-disable-next-line
    },[mensaje]);

    /* Revisar si proyectos tiene contenido */
    if(proyectos.lenght===0)return null;

    return ( 
        <ul className="listado-proyectos">

            {alerta ? <div className={`alerta ${alerta.categoria}`}>{alerta.msg}</div> : null}

            {proyectos.map(proyecto=>(
                <Proyecto 
                key = {proyecto._id}
                proyecto={proyecto}/>
            ))}
        </ul>
    );
}
 
export default Listado;
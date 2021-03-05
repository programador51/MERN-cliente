import React, { useReducer } from 'react';
import proyectoContext from './proyectoContext';
import proyectoReducer from './proyectoReducer';
import clienteAxios from '../../config/axios';
//import { v4 as uuidv4 } from 'uuid';

/* El archivo se llamada index.js , por eso no se le pone
el nombre, lo leer por default */
import {
    FORMULARIO_PROYECTO,
    OBTENER_PROYECTOS,
    AGREGAR_PROYECTO,
    PROYECTO_ERROR,
    VALIDAR_FORMULARIO,
    PROYECTO_ACTUAL,
    ELIMINAR_PROYECTO
} from '../../types';

const ProyectoState = props => {



    const initialState = {
        formulario: false,
        proyectos: [],
        errorFormulario: false,
        proyecto:null,
        mensaje:null
    }

    //dispatch
    /* Funciones despachadoras a ejecutar para actualizar
    el state 
    
    1. Parametro : Funcion reducer
    2. Parametro : Estado inicial
    */
    const [state, dispatch] = useReducer(proyectoReducer, initialState);

    /* Serie de funciones para el CRUD */
    const mostrarFormulario = () => {
        dispatch({
            type: FORMULARIO_PROYECTO
        })
    }

    /* Obtener los proyectos */
    const obtenerProyectos = async () => {
        try {
            const resultado = await clienteAxios.get('api/proyectos');

            dispatch({
                type: OBTENER_PROYECTOS,
                payload: resultado.data.proyectos
            })
        } catch (error) {
            const alerta = {
                msg:'Hubo un error',
                categoria:'alerta-error'
            }
            dispatch({
                type:PROYECTO_ERROR,
                payload:alerta
            })
        }
    }

    /* Elimina un proyecto */
    const eliminarProyecto = async proyectoId => {

        try {
            await clienteAxios.delete(`api/proyectos/${proyectoId}`);
            dispatch({
                type:ELIMINAR_PROYECTO,
                payload:proyectoId
            })
        } catch (error) {
            const alerta = {
                msg:'Hubo un error',
                categoria:'alerta-error'
            }
            dispatch({
                type:PROYECTO_ERROR,
                payload:alerta
            })
        }
    }


    /* Agregar nuevo proyecto */
    const agregarProyecto = async proyecto => {
        //proyecto.id = uuidv4();

        // dispatch({
        //     type:AGREGAR_PROYECTO,
        //     payload:proyecto
        // })

        try {
            const resultado = await clienteAxios.post('/api/proyectos',proyecto);
            
            dispatch({
                type:AGREGAR_PROYECTO,
                payload:resultado.data
            })

        } catch (error) {
            const alerta = {
                msg:'Hubo un error',
                categoria:'alerta-error'
            }
            dispatch({
                type:PROYECTO_ERROR,
                payload:alerta
            })
        }
    }

    /* Validar el fomrulario por errores */
    const mostrarError = () =>{
        dispatch({
            type:VALIDAR_FORMULARIO
        })
    }

    /* Selecciona el proyecto que el usuario presione */
    const proyectoActual = proyectoId => {
        dispatch({
            type:PROYECTO_ACTUAL,
            payload:proyectoId
        })
    }

    const value = {
        formulario: state.formulario,
        proyectos: state.proyectos,
        errorFormulario: state.errorFormulario,
        proyecto:state.proyecto,
        mensaje:state.mensaje,
        mostrarFormulario,
        obtenerProyectos,
        agregarProyecto,
        mostrarError,
        proyectoActual,
        eliminarProyecto
    }

    //Serie de funciones para el crud
    return (
        <proyectoContext.Provider value={value}>
            {props.children}
        </proyectoContext.Provider>
    )
}

export default ProyectoState;
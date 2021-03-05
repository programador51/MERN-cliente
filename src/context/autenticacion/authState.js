import React,{useReducer} from 'react';
import AuthContext from './authContext';
import AuthReducer from './authReducer';

import clienteAxios from '../../config/axios';
import tokenAuth from '../../config/token';

import {
    REGISTRO_EXITOSO,
    REGISTRO_ERROR,
    OBTENER_USUARIO,
    LOGIN_EXITOSO,
    LOGIN_ERROR,
    CERRAR_SESION
} from '../../types';

const AuthState = props => {
    const initialState = {
        token:localStorage.getItem('token'),
        autenticado:null,
        usuario:null,
        mensaje:null,
        cargando:true
    }

    const [state,dispatch] = useReducer(AuthReducer,initialState)

    //FUNCIONES PARA AUTENTIFICAR USUARIO EN FRONT-END
    
    const registrarUsuario = async datos => {
        try {
            const respuesta = await clienteAxios.post('/api/usuarios',datos);
            console.log(respuesta.data);

            dispatch({
                type:REGISTRO_EXITOSO,
                payload:respuesta.data
            });

            usuarioAutenticado();
        } catch (e) {
            //console.log(e.response.data.msg);

            const alerta = {
                msg:e.response.data.msg,
                categoria: 'alerta-error'
            }

            dispatch({
                type:REGISTRO_ERROR,
                payload:alerta
            })
        }
    }

    /* Retorna el usuario autenticado */
    const usuarioAutenticado = async() =>{
        const token = localStorage.getItem('token');

        if(token){
            /* TODO: Funcion para enviar el token por headers */
            tokenAuth(token);
        }

        try {
            const respuesta = await clienteAxios.get('/api/auth');
            console.log(respuesta);
            dispatch({
                type:OBTENER_USUARIO,
                payload:respuesta.data
            })
        } catch (error) {
            console.log(error);
            dispatch({
                type:LOGIN_ERROR
            })
        }
    }

    /* Cuando el usuario inicia sesion */
    const iniciarSesion = async datos => {
        try {
            const respuesta = await clienteAxios.post('/api/auth',datos);
            dispatch({
                type:LOGIN_EXITOSO,
                payload:respuesta.data
            });
            usuarioAutenticado();

        } catch (error) {
            const alerta = {
                msg:error.response.data.msg,
                categoria: 'alerta-error'
            }

            dispatch({
                type:LOGIN_ERROR,
                payload:alerta
            })
        }
    }

    // Para cerrar sesion
    const cerrarSesion = () => {
        dispatch({
            type:CERRAR_SESION
        })
    }

    const values = {
        token:state.token,
        autenticado:state.autenticado,
        usuario:state.usuario,
        mensaje:state.mensaje,
        cargando:state.cargando,
        registrarUsuario,
        iniciarSesion,
        usuarioAutenticado,
        cerrarSesion
    }

    return (
        <AuthContext.Provider value={values}>
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthState;
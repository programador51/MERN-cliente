import React,{useEffect,useContext} from 'react';
import AuthContext from '../../context/autenticacion/authContext';

const Barra = () => {
    /* Extraer la infomracion de autenticacion */
    const authToken = useContext(AuthContext);
    const {usuario,usuarioAutenticado, cerrarSesion} = authToken;

    useEffect(()=>{
        usuarioAutenticado();
        // eslint-disable-next-line
    },[]);

    return (  
        <header className="app-header">
            {usuario ? <p className="nombre-usuario">Hola <span>{usuario.usuario.nombre}</span></p> : null}
            <nav className="nav-principal">
                <button
                    className="btn bn-blank cerrar-sesion"
                    onClick={()=>cerrarSesion()}>
                    Cerrar Sesión
                </button>
            </nav>
        </header>
    );
}
 
export default Barra;
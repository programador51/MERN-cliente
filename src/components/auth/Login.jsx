import React,{useState,useContext,useEffect} from 'react';
import {Link} from 'react-router-dom';
import AlertaContext from '../../context/alertas/alertaContext';
import AuthContext from '../../context/autenticacion/authContext';

const Login = (props) => {
    /* CONTEXTS */
    const alertaContext = useContext(AlertaContext);
    const {alerta,mostrarAlerta} = alertaContext;

    const authContext = useContext(AuthContext);
    const {iniciarSesion,mensaje,autenticado} = authContext
    
    ///////////////////////////////////////////////////////////////////////
    
    //Iniciar sesion - estado
    const [usuario,setUsuario] = useState({
        email:'',
        password:''
    });

    const {email,password} = usuario;

    const onChange = (e) => {
        setUsuario({
            ...usuario,
            [e.target.name] : e.target.value
        })
    };

    ///////////////////////////////////////////////////////////////////////
    /* En caso de que el password o usuario no exista */
    useEffect(()=>{
        if(autenticado){
            props.history.push('/proyectos');
        }
        if(mensaje){
            mostrarAlerta(mensaje.msg,mensaje.categoria);
        }
        // eslint-disable-next-line
    },[mensaje,autenticado,props.history])

    ///////////////////////////////////////////////////////////////////

    //Cuando el usuario necesita iniciar sesion
    const onSubmit = e => {
        e.preventDefault();

        //Validar campos llenos
        if(email.trim()===''||password.trim()===''){
            mostrarAlerta('Todos los campos son obligatorios','alerta-error');
            return;
        }

        //Pasarlo al action
        iniciarSesion({email,password});
    }

    const reset = () => {
        let formDOM = document.getElementById('formCrearCuenta');
        formDOM.reset();
    }
    
    return ( 
        <div className="form-usuario">
            {alerta ? <div className={`alerta ${alerta.categoria}`}>{alerta.msg}</div> : null}
            <div className="contenedor-form sombra-dark">
                <h1>Iniciar sesion</h1>

                <form onSubmit={onSubmit} id="formCrearCuenta">
                    <div className="campo-form">
                        <label htmlFor="email">Email</label>
                        <input type="email"
                        id="email"
                        name="email"
                        placeholder="Ingresa tu email"
                        value={email}
                        onChange={onChange}/>
                    </div>

                    <div className="campo-form">
                        <label htmlFor="password">Password</label>
                        <input type="password"
                        id="password"
                        name="password"
                        placeholder="Ingresa tu password"
                        value = {password}
                        onChange={onChange}/>
                    </div>

                    <div className="campo-form">
                        <input type="submit"
                        className="btn btn-primario btn-block"
                        value="Iniciar Sesion"/>
                    </div>
                </form>

                <Link to={'/nueva-cuenta'} 
                className="enlace-cuenta"
                onChange={reset}>
                    Obtener Cuenta
                </Link>

            </div>
        </div>
    );
}
 
export default Login;
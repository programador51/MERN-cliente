import React,{useState,useContext,useEffect} from 'react';
import {Link} from 'react-router-dom';
import AlertaContext from '../../context/alertas/alertaContext';
import AuthContext from '../../context/autenticacion/authContext';

const NuevaCuenta = (props) => {
    /* CONTEXTS */
    const alertaContext = useContext(AlertaContext);
    const {alerta,mostrarAlerta} = alertaContext;

    const authContext = useContext(AuthContext);
    const {registrarUsuario,mensaje,autenticado} = authContext
    
    ///////////////////////////////////////////////////////////////////////
    /* En caso de que el usuario se haya autentificado o registrado o sea un registro
    duplicado */
    useEffect(()=>{
        if(autenticado){
            props.history.push('/proyectos');
        }
        if(mensaje){
            mostrarAlerta(mensaje.msg,mensaje.categoria);
        }
        // eslint-disable-next-line
    },[mensaje,autenticado,props.history])


    //////////////////////////////////////////////////////////////////////

    //Iniciar sesion - estado
    const [usuario,setUsuario] = useState({
        nombre:'',
        email:'',
        password:'',
        confirmar:''
    });

    const {nombre,email,password,confirmar} = usuario;

    const onChange = (e) => {
        setUsuario({
            ...usuario,
            [e.target.name] : e.target.value
        })
    }

    //Cuando el usuario necesita iniciar sesion
    const onSubmit = e => {
        e.preventDefault();

        //Validar campos llenos
        if(nombre.trim()===''||email.trim()===''||password.trim()===''||confirmar.trim()===''){
            mostrarAlerta('Todos los campos son obligatorios','alerta-error');
            return;
        }

        //Password minimo de 6 caracteres
        if(password.length<6){
            mostrarAlerta('La contraseña debe ser de al menos 6 caracteres','alerta-error');
            return;
        }

        //Password sean iguales
        if(password!==confirmar){
            mostrarAlerta('Las contraseñas no coinciden','alerta-error');
            return;
        }

        //Pasarlo al action
        registrarUsuario({
            nombre,
            email,
            password
        });
    }

    const reset = () => {
        let formDOM = document.getElementById('formCrearCuenta');
        formDOM.reset();
    }
    
    return ( 
        <div className="form-usuario">
            {alerta ? <div className={`alerta ${alerta.categoria}`}>{alerta.msg}</div> : null}
            <div className="contenedor-form sombra-dark">
                <h1>Crear una cuenta</h1>

                <form onSubmit={onSubmit} id="formCrearCuenta">

                    <div className="campo-form">
                        <label htmlFor="nombre">Nombre</label>
                        <input type="text"
                        id="nombre"
                        name="nombre"
                        placeholder="Ingresa tu nombre"
                        value={nombre}
                        onChange={onChange}/>
                    </div>

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
                        <label htmlFor="confirmar">Confirmar password</label>
                        <input type="password"
                        id="confirmar"
                        name="confirmar"
                        placeholder="Repite tu password"
                        value = {confirmar}
                        onChange={onChange}/>
                    </div>

                    <div className="campo-form">
                        <input type="submit"
                        className="btn btn-primario btn-block"
                        value="Registrar"/>
                    </div>
                </form>

                <Link to={'/'} 
                className="enlace-cuenta"
                onChange={reset}>
                    Regresar a "Iniciar Sesion"
                </Link>

            </div>
        </div>
    );
}
 
export default NuevaCuenta;
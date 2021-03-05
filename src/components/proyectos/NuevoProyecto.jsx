import React,{Fragment,useState,useContext} from 'react';
import proyectoContext from '../../context/proyectos/proyectoContext';

const NuevoProyecto = () => {

    const proyectosContext = useContext(proyectoContext);
    const {formulario,mostrarFormulario,agregarProyecto
    ,mostrarError,errorFormulario} = proyectosContext;

    //State del proyecto
    const [proyecto,setProyecto] = useState({
        nombre:''
    });

    //Extraer nombre del proyecto
    const {nombre} = proyecto; 

    //Leer los contenidos del nombre input
    const onChangeProyecto = e => {
        setProyecto({
            ...proyecto,
            [e.target.name] : e.target.value
        });
    }

    //Cuando el usuario envia el proyecto
    const onSubmitProyecto = e => {
        e.preventDefault();

        //Validar proyecto
        if(nombre===''){
            mostrarError();
            return
        }

        //Agregar al state
        agregarProyecto(proyecto)


        //Reiniciar el input
        setProyecto({
            nombre:''
        })
    }
    /* Al clickear el formulario */
    const onClickFormulario = () => {
        mostrarFormulario(true);
    }

    return ( 
        <Fragment>
            <button
            type="button"
            className="btn btn-block btn-primario"
            onClick={onClickFormulario}>
                Nuevo Proyecto
            </button>

            {formulario ? 
            <form className="formulario-nuevo-proyecto"
            onSubmit = {onSubmitProyecto}>
                <input 
                type="text"
                className="input-text"
                placeholder="Nombre del proyecto"
                name="nombre"
                value={nombre}
                onChange={onChangeProyecto}/>

                <input 
                type="submit"
                className="btn btn-block btn-primario"
                value="Agregar proyecto"/>
            </form>
            : null }

            {errorFormulario ? 
            <p className="mensaje error">El nombre es obligatorio</p>
            : null}
        </Fragment>
    )
}
 
export default NuevoProyecto;
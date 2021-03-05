import React,{useContext,useState,useEffect} from 'react';
import proyectoContext from '../../context/proyectos/proyectoContext';
import TareaContext from '../../context/tareas/tareasContext';

const FormTarea = () => {
    /* Contexts */
    const {tareaseleccionada,actualizarTarea,
        agregarTarea,validarTarea,errortarea,
        limpiarTarea,obtenerTareas} = useContext(TareaContext);
    
    /* State componente */
    const [tarea,setTarea] = useState({
        nombre:''
    });

    //useEffect
    /* Detecta si hay una tarea seleccionada */
    useEffect(()=>{
        if(tareaseleccionada!==null){
            setTarea(tareaseleccionada);
        }else{
            setTarea({
                nombre:''
            })
        }
    },[tareaseleccionada])

    /* Extraer si un proyecto esta activo */
    const {proyecto} = useContext(proyectoContext);

    if(!proyecto) return null;
    /* console.log(proyecto[0].id); */

    const [proyectoActual] = proyecto;

    /* Extraer nombre proyecto */
    const {nombre} = tarea;

    /* Leer los valores del formulario */
    const handleChange = e =>{
        setTarea({
            ...tarea,
            [e.target.name]:e.target.value
        });
    }

    const onSubmit = e =>{
        e.preventDefault();

        //Validar
        if(nombre.trim()===''){
            validarTarea();
            return;
        }

        /* Si es edicion o nueva tarea */
        if(tareaseleccionada===null){
            //Pasar la validacion
        
            tarea.proyecto = proyectoActual._id;

            agregarTarea(tarea);
        }else{
            /* Actualizar tarea existente */
            actualizarTarea(tarea);

            /* Elimina tarea seleccionada del state */
            limpiarTarea();
        }

        //Obtener y filtrar las tareas del proyecto actual
        obtenerTareas(proyectoActual.id);

        //Reiniciar tarea
        setTarea({
            nombre:''
        });
    }

    if(!proyecto) return null

    return (  
        <div className="formulario">
            <form 
            onSubmit = {onSubmit}>
                <div className="contenedor-input">
                    <input type="text" className="input-text"
                    placeholder="Nombre tarea"
                    name="nombre"
                    value={nombre}
                    onChange={handleChange}/>
                </div>
                <div className="contenedor-input">
                    <input type="submit" 
                    className="btn btn-primario btn-submit btn-block"
                    placeholder="Nombre tarea"
                    value={tareaseleccionada ? 'Editar tarea' : 'Agregar tarea'}
                    />
                </div>
            </form>
            {errortarea ? <p className="mensaje error">
                El nombre de la tarea es obligatorio
            </p> : null}
        </div>
    );
}
 
export default FormTarea;
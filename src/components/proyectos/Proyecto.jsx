import React,{useContext} from 'react';
import proyectoContext from '../../context/proyectos/proyectoContext';
import TareaContext from '../../context/tareas/tareasContext';

const Proyecto = ({proyecto}) => {
    /* Obtener el state de proyectos */
    const {proyectoActual} = useContext(proyectoContext);

    /* Obtener la funcion del context de tarea */
    const {obtenerTareas} = useContext(TareaContext);

    /* Funcion para agregar el proyecto actual */
    const seleccionarProyecto = id => {
        proyectoActual(id); //Fijar un proyecto actual
        obtenerTareas(id); //Filtrar tareas cuando se de click
    }

    return ( 
        <li>
            <button
            type="button"
            className="btn btn-blank"
            onClick={()=>seleccionarProyecto(proyecto._id)}>
                {proyecto.nombre}
            </button>
        </li>
    );
}
 
export default Proyecto;
import React,{useContext} from 'react';
import TareaContext from '../../context/tareas/tareasContext';
import proyectoContext from '../../context/proyectos/proyectoContext';

const Tarea = ({tarea}) => {
    //CONTEXT
    const {eliminarTarea,obtenerTareas,actualizarTarea,
        guardarTareaActual} = useContext(TareaContext);
    const {proyecto} = useContext(proyectoContext);
    
    //FUNCIONES
    const [proyectoActual] = proyecto;

    /* Al presionar eliminar */
    const eliminar = id => {
        eliminarTarea(id,proyectoActual._id)
        obtenerTareas(proyecto[0].id);
    }  

    /* Modifica el estado de las tareas */
    const cambiarEstado = tarea => {
        if(tarea.estado){
            tarea.estado = false;
        }else{
            tarea.estado = true;
        }
        actualizarTarea(tarea);
    }

    /* Agrega una tarea actual cuando el usuario desea editar */
    const seleccionarTarea = tarea => {
        guardarTareaActual(tarea);
    }

    return (  
        <li className="tarea sombra">
            <p>{tarea.nombre}</p>
            <div className="estado">
                {tarea.estado ? 
                    <button
                        type="button"
                        className="completo"
                        onClick={()=>cambiarEstado(tarea)}
                        >Completo
                    </button>
                :
                    <button
                        type="button"
                        className="incompleto"
                        onClick={()=>cambiarEstado(tarea)}
                        >Incompleto
                    </button>
                }
            </div>
        
            <div className="acciones">
                <button
                    type="button"
                    className="btn btn-primario"
                    onClick={()=>seleccionarTarea(tarea)}>
                        Editar
                </button>

                <button
                    type="button"
                    className="btn btn-secundario"
                    onClick={()=>eliminar(tarea._id)}>
                        Eliminar
                </button>
            </div>
        </li>
    );
}
 
export default Tarea;
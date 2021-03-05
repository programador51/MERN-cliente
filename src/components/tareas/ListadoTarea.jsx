import React,{Fragment,useContext,useRef} from 'react';
import Tarea from '../tareas/Tarea';
import proyectoContext from '../../context/proyectos/proyectoContext';
import TareaContext from '../../context/tareas/tareasContext';
import {CSSTransition,TransitionGroup} from 'react-transition-group';

const ListadoTarea = () => {
    const nodeRef = useRef(null);

    /* Contexts */
    const {proyecto,eliminarProyecto} = useContext(proyectoContext);
    const {tareasproyecto} = useContext(TareaContext);

    if(proyecto===null){
        return <h2>Selecciona una tarea</h2>
    }

    /* Obtener proyecto actual */
    const [proyectoActual] = proyecto;

    const onClickEliminar = () =>{
        eliminarProyecto(proyectoActual._id)
    }

    return (  
        <Fragment>
            <h2>Proyecto: {proyectoActual.nombre}</h2>
            <ul className="listado-tareas">
                {tareasproyecto.length===0 ? 
                <li className="tarea">
                    <p>No hay tareas</p>
                </li>
                :
                <TransitionGroup>
                    {tareasproyecto.map(tarea => (
                        <CSSTransition 
                            nodeRef={nodeRef}
                            key = {tarea._id}
                            timeout={200}
                            classNames="tarea"
                            >
                            <Tarea
                            tarea={tarea}
                            />
                        </CSSTransition>
                    ))}
                </TransitionGroup>
                }
            </ul>

            <button
                type="button"
                className="btn btn-eliminar"
                onClick={onClickEliminar}>
                    Eliminar Proyecto &times;
            </button>
        </Fragment>
    );
}
 
export default ListadoTarea;
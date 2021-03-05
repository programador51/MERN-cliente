//state
/* estado del componente antes de realizar
algun cambio */

//action
/* un objeto que tiene dos atributos 
    - type: 
    es el nombre del evento que cambiara
    nuestro estado

    - payload
    es informacion extra que se puede enviar
    en la actualizacion del estado (opcional)
*/
import {FORMULARIO_PROYECTO,OBTENER_PROYECTOS,
    AGREGAR_PROYECTO,
    VALIDAR_FORMULARIO,
    PROYECTO_ACTUAL,
    PROYECTO_ERROR,
    ELIMINAR_PROYECTO} from '../../types';
// eslint-disable-next-line
export default (state,action) => {
    switch(action.type) {
        case FORMULARIO_PROYECTO:
            return{
                ...state,
                formulario:true
            }

        case OBTENER_PROYECTOS:
            return{
                ...state,
                proyectos:action.payload
            }

        case AGREGAR_PROYECTO:
            return{
                ...state,
                proyectos:[...state.proyectos,action.payload],
                formulario:false,
                errorFormulario:false
            }

        case VALIDAR_FORMULARIO:
            return {
                ...state,
                errorFormulario:true
            }
        
        case PROYECTO_ACTUAL:
            return {
                ...state,
                proyecto:state.proyectos.filter(proyecto=>proyecto._id===action.payload)
            }
        

        case ELIMINAR_PROYECTO:
            return {
                ...state,
                proyectos:state.proyectos.filter(proyecto=>proyecto._id!==action.payload),
                proyecto:null

            }


        case PROYECTO_ERROR:
            return{
                ...state,
                mensaje:action.payload
            }
        default:
            return state;
    }
}
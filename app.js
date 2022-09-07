import colors from "colors";
import { guardarBD, leerDB } from "./helpers/interaccionDB.js";
import { inquirerMenu, pausa, leerInput, listadoTareasBorrar, confirmar, mostrarListadoChecklist } from './helpers/inquirer.js';
import { Tarea } from "./models/tarea.js";
import { Tareas } from "./models/tareas.js";

const main = async () => {
    let opt = '';
    const tareas = new Tareas();
    const tareasDB = leerDB();

    if(tareasDB) {
        tareas.cargarTareasFromArray( tareasDB );
    }

    do {
        opt = await inquirerMenu();

        switch (opt) {
            case '1': // Añadir nueva tarea
                const desc = await leerInput('Descripcion:');
                tareas.crearTarea(desc);
            break;
            
            case '2': // Listar todas las tareas
                console.log();
                tareas.listadoCompleto();
                console.log();
            break;

            case '3': // Listar las tareas completadas
                console.log();
                tareas.listarPendientesCompletas();
                console.log();
            break;

            case '4': // Listar las tareas pendientes
                console.log();
                tareas.listarPendientesCompletas(false);
                console.log();
            break;

            case '5': // Completar | Pendiente
                const ids = await mostrarListadoChecklist( tareas.listadoArr );
                tareas.toggleCompletadas(ids);
            break;

            case '6':
                const id = await listadoTareasBorrar( tareas.listadoArr );
                if(id !== '0') {
                    const conf = await confirmar('¿Estas seguro de que desea borrar?');
                    if(conf) {
                        tareas.borrarTarea(id);
                        console.log('Tarea borrada correctamente');
                    }
                }
            break;
        
            default:
                break;
        }

        guardarBD( tareas.listadoArr );
        
        if (opt !== '0') await pausa();     // Si es 0 sale de la app sin mostrar el otro mensaje
    } while (opt !== '0');
}

main();
import colors from "colors";
import { guardarBD, leerDB } from "./helpers/interaccionDB.js";
import { inquirerMenu, pausa, leerInput, listadoTareasBorrar, confirmar } from './helpers/inquirer.js';
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
            case '1':
                const desc = await leerInput('Descripcion:');
                tareas.crearTarea(desc);
            break;
            
            case '2':
                console.log();
                //console.log(tareas.listadoArr);
                tareas.listadoCompleto();
                console.log();
            break;

            case '3':
                //console.log(tareas.listadoArr);
                console.log();
                tareas.listarPendientesCompletas();
                console.log();
            break;

            case '4':
                //console.log(tareas.listadoArr);
                console.log();
                tareas.listarPendientesCompletas(false);
                console.log();
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
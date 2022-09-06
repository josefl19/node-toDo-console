import colors from "colors";
import { guardarBD, leerDB } from "./helpers/interaccionDB.js";
import { inquirerMenu, pausa, leerInput } from './helpers/inquirer.js';
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
                //console.log(tareas.listadoArr);
                tareas.listadoCompleto();
            break;
        
            default:
                break;
        }

        //guardarBD( tareas.listadoArr );
        
        if (opt !== '0') await pausa();     // Si es 0 sale de la app sin mostrar el otro mensaje
    } while (opt !== '0');
}

main();
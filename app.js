import colors from "colors";
import { inquirerMenu, pausa, leerInput } from './helpers/inquirer.js';
import { Tarea } from "./models/tarea.js";
import { Tareas } from "./models/tareas.js";

const main = async () => {
    let opt = '';
    const tareas = new Tareas;

    do {
        opt = await inquirerMenu();

        switch (opt) {
            case '1':
                const desc = await leerInput('Descripcion:');
                tareas.crearTarea(desc);
            break;
            
            case '2':
                console.log(tareas._listado);
            break;
        
            default:
                break;
        }
        if (opt !== '0') await pausa();     // Si es 0 sale de la app sin mostrar el otro mensaje
    } while (opt !== '0');
}

main();
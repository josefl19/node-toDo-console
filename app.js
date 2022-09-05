import colors from "colors";
import { inquirerMenu, pausa } from './helpers/inquirer.js';

const main = async () => {
    let opt = '';

    do {
        opt = await inquirerMenu();
        console.log({ opt })

        await pausa();
        //if (opt !== '0') await pausa();     // Si es 0 sale de la app sin mostrar el otro mensaje
    } while (opt !== '0');
}

main();
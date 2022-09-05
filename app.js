require('colors');
const { mostrarMenu, pausa } = require('./helpers/messages');

const main = async () => {
    let opt = '';

    do {
        opt = await mostrarMenu();
        console.log({ opt })
        if (opt !== '0') await pausa();     // Si es 0 sale de la app sin mostrar el otro mensaje
    } while (opt !== '0');
}

main();
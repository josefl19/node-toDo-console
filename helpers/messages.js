const { resolve } = require('path');

require('colors');

const mostrarMenu = () => {
    /* Se crea retorna una promesa sin usar async ya que la opción se retorna en el callback
        de readline.question y de colocar ahí un return solo indicaría un return de esa función
        y no de toda la promesa (resolve).
    */
    return new Promise( (resolve) => {
        console.clear();
        console.log('============================'.blue);
        console.log('   Selecciona una opción   '.bold.blue);
        console.log('============================\n'.blue);
    
        console.log(`${ '1.'.green } Crear tarea`);
        console.log(`${ '2.'.green } Listar tareas`);
        console.log(`${ '3.'.green } Listar tareas completadas`);
        console.log(`${ '4.'.green } Listar tareas pendienes`);
        console.log(`${ '5.'.green } Completar tarea(s)`);
        console.log(`${ '6.'.green } Borrar tarea`);
        console.log(`${ '0.'.green } Salir\n`);
    
        // Creacion de la interfaz al usuario
        const readline = require('readline').createInterface({
            input: process.stdin,
            output: process.stdout
        });
    
        // Mostrar mensaje al usuario
        readline.question('Seleccione una opcion: ', (opt) => {
            readline.close();
            resolve(opt);
        });
    });
}

const pausa = () => {
    return new Promise( (resolve) => {
        const readline = require('readline').createInterface({
            input: process.stdin,
            output: process.stdout
        });
    
        readline.question(`Presione ${ 'ENTER'.bold.green } para continuar`, (opt) => {
            readline.close();
            resolve();
        });
    });
}

module.exports = {
    mostrarMenu,
    pausa
}
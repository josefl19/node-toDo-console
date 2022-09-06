import inquirer from 'inquirer';
import colors from "colors";

const preguntas = [
    {
        type: 'list',
        name: 'opcion',
        message: '¿Qué desea hacer?',
        choices: [
            {
                value: '1',
                name: '1. Crear tarea'
            },
            {
                value: '2',
                name: '2. Listar tareas'
            },
            {
                value: '3',
                name: '3. Listar tareas completas'
            },
            {
                value: '4',
                name: '4. Listar tareas pendientes'
            },
            {
                value: '5',
                name: '5. Completar tarea(s)'
            },
            {
                value: '6',
                name: '6. Borrar tarea'
            },
            {
                value: '0',
                name: '0. Salir'
            }
        ]
    }
];

const inquirerMenu = async() => {
    console.log('============================'.blue);
    console.log('   Selecciona una opción   '.bold.blue);
    console.log('============================\n'.blue);

    const { opcion } = await inquirer.prompt(preguntas);

    return opcion;
}

const pausa = async() => {
    await inquirer.prompt([
        {
            type: 'input',
            name: 'enter',
            message: `\nPresione ${ 'ENTER'.bold.green } para continuar`
        }
    ]);
}

const leerInput = async( message ) => {
    const question = [{
        type: 'input',
        name: 'desc',
        message,
        validate( value ) {
            if(value.length === 0) {
                return 'Por favor ingrese un valor'
            }
            return true;
        }
    }];

    const { desc } = await inquirer.prompt(question);
    return desc;
}

export {
    inquirerMenu,
    pausa,
    leerInput
}
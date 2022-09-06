import fs from 'fs';

const archivo = './db/data.json';

const guardarBD = ( data ) => {
    fs.writeFileSync( archivo, JSON.stringify(data) );
}

const leerDB = () => {
    if(!fs.existsSync(archivo)) {
        return null
    }

    const info = fs.readFileSync( archivo, {encoding: 'utf-8'});        // Encoding para evitar retornar los bytes
    const data = JSON.parse(info);
    //console.log(data);

    return data;
}

export {
    guardarBD,
    leerDB
}
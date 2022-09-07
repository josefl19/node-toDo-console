import { Tarea } from "./tarea.js";

class Tareas {
    _listado = {};

    constructor() {
        this._listado = {};
    }

    get listadoArr() {
        const listado = [];
        Object.keys(this._listado).forEach( key => {
            listado.push(this._listado[key])
        })

        return listado;
    }

    crearTarea( desc = '' ) {
        const tarea = new Tarea(desc);
        this._listado[tarea.id] = tarea;
    }

    cargarTareasFromArray ( tareas = [] ) {
        tareas.forEach( (tarea) => {
            this._listado[tarea.id] = tarea;
        });
    }

    listadoCompleto() {
        this.listadoArr.forEach( (tarea, i) => {
            const idx = `${i + 1}`.green;
            const { desc, completadoEn } = tarea;
            const estado = ( completadoEn ) ? 'Completada'.green : 'Pendiente'.red;

            console.log(`${ idx } ${ desc } :: ${ estado }`);
        });
    }

    listarPendientesCompletas( completadas = true ) { 
        let tasks = [];
        if(completadas) {
            tasks = this.listadoArr.filter((tarea) => tarea.completadoEn != null);
        } else {
            tasks = this.listadoArr.filter((tarea) => tarea.completadoEn == null);
        }

        tasks.forEach( (tarea, i) => {
            const idx = `${i + 1}`.green;
            const { desc, completadoEn } = tarea;
            const estado = ( completadoEn ) ? `${completadoEn}`.green : 'Pendiente'.red;

            console.log(`${ idx } ${ desc } :: ${ estado }`);
        });
    }

    borrarTarea( id = '' ) {
        if(this._listado[id]) {
            delete this._listado[id];
        }
    }

    toggleCompletadas( ids = []) {
        ids.forEach( id => {
            if( !this._listado[id].completadoEn ) {
                this._listado[id].completadoEn = new Date().toISOString();
            }
        });

        this.listadoArr.forEach((tarea) => {
            if( !ids.includes(tarea.id) ) {
                this._listado[tarea.id].completadoEn = null;
            }
        });
    }
}

export { Tareas }
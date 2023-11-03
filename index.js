

const readlineSync = require('readline-sync');

const chalk = require('chalk');

const express = require('express');

const app = express();

const PORT = 3000;

const listaDeTareas = [];

function agregarTarea(indicador, descripcion) {
    const tarea = {
        indicador: indicador,
        descripcion: descripcion,
        completada: false
    };
    listaDeTareas.push(tarea);
}

function eliminarTarea(indicador) {
    const indice = listaDeTareas.findIndex(tarea => tarea.indicador === indicador);
    if (indice !== -1) {
    listaDeTareas.splice(indice, 1);
    }
}

function completarTarea(indicador) {
    const indice = listaDeTareas.findIndex(tarea => tarea.indicador === indicador);

    listaDeTareas[indice].completada = true;
}

function imprimirTareas() {
    console.log('Lista de tareas:');
    for(let i = 0; i < listaDeTareas.length; i++) {
        const tarea = listaDeTareas[i];
        if (tarea.completada) {
            console.log(chalk.green(`✓ ${tarea.indicador} - ${tarea.descripcion}`));
        } else {
            console.log(chalk.red(`✗ ${tarea.indicador} - ${tarea.descripcion}`));
        }
    }
} 

app.get('/tasks', (req, res) => {
    res.json(listaDeTareas);
});

app.listen(PORT, () => {
    console.log(`La aplicación está escuchando en el puerto ${PORT}`);
});

function iniciar() {
    while (true) {
        const respuesta = readlineSync.question('¿Qué quieres hacer?\n 1. Agregar tarea\n 2. Eliminar tarea\n 3. Completar tarea\n 4. Mostrar tareas\n 5. Salir\n');
        
        switch (respuesta) {
            case '1':
                const indicador = readlineSync.question('Cual es el indicador de esta tarea? ');
                const descripcion = readlineSync.question('Describe la tarea: ');
                agregarTarea(indicador, descripcion);
                break;
            case '2':
                const tareaParaEliminar = readlineSync.question('Cual es el indicador de la tarea que desea eliminar? ');
                eliminarTarea(tareaParaEliminar);
                break;
            case '3':
                const tareaCompletada = readlineSync.question('Cual es el indicador que desea marcar como completada? ');
                completarTarea(tareaCompletada);
                break;
            case '4':
                imprimirTareas();
                break;
            case '5':
                return;
            default:
                console.log('Opción no válida');
        }
    }
}

iniciar();

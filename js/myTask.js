/**
 * Created by Carmen on 25/04/2016.
 */

//objeto literal con las tareas
var misTareas = {

    //propiades
    tareas : [],

    //metodos

    /**
     *funcion que va a añadir una tarea en la posicion que le pasemos por parametros
     * @param -- task objeto Tarea
     * 			pos -- posicion que queremos pasar
     * 			valores pos: P-->para ponerlo al principio
     * 					pos: F--> para ponerlo al final
     * 					pos: {int}--> entero con la posicion del array (desde 0)
     *
     */

    //TODO COMPROBAR LOS INDICES AL AÑADIR EN POSICION, QUE NO SE PUEDA AÑADIR SI NO HAY EN POSICION O QUE SE CREEN EL RESTO A NULL¿?
    addTarea : function(task, pos) {

        //pregunto si es P
        if (pos == 'P') {
            // unshift al principio del array
            this.tareas.unshift(task);
            //si es F
        } else if (pos == 'F') {
            //push al final del array
            this.tareas.push(task);
        } else if (isFinite(pos)) {
            this.tareas.splice(pos, 0, task);
        }
        return false;
    },

    //funcion para eliminar tareas -- paso la posicion del array que quiero eliminar
    removeTarea : function(pos) {
        this.tareas.splice(pos, 1, task);
        return false;
    },

    numTareas : function() {
        return this.tareas.length;
    },

    //funcion para sacar el mensaje del numero de tareas
    showMensajeNumTareas : function(nodo) {

        var cadena = '';

        if (misTareas.numTareas() == 0) {
            //si no hay ninguna tarea en el array, muestro este mensaje
            cadena += '<h4>Actualmente no hay tareas registradas</h4>';
        } else {
            //mensaje que voy poniendo dependiendo del numero de tareas
            cadena += '<h4>Tienes ' + this.numTareas() + ' tareas por hacer</h4>';

        }

        //lo incustro en el nodo que paso por parametro
        nodo.innerHTML = cadena;
        return false;

    },
    showTarea : function(posicion) {
        var cadena = '';

        if (misTareas.numTareas() != 0) {
            cadena = "<h2>Tarea  " + (posicion + 1) + "</h2>";
            cadena += "<p>Descrición: " + this.tareas[posicion].texto + "</p>";
            cadena += "<p>Fecha creación: " + this.tareas[posicion].fecha + "</p>";
        }
        return cadena;

    },

    ///////TODO NO SE HACE BIEN EL SORT, SE CAMBIA EN CADA CLICK, CAMBIAR EL NODO DEL TOTAL DE TAREAS

    showTareasAscendente : function(nodo) {

        //ordeno ascedente el array
        this.tareas = this.tareas.sort(function(a, b) {
            return a > b;
        });

        // creo una cadena para concatenar todas las tareas del array
        var cadena = '';
        for (var i = 0; i < this.tareas.length; i++) {
            //por cada posicion del array llamo al showTarea
            cadena += this.showTarea(i);
        };
        //pongo el nodo vacio para que no se vayan acumulando las tareas previas
        nodo.innerHTML = "";
        //lo incustro en el nodo
        nodo.innerHTML = cadena;
        return false;

    },
    showTareasDescendente : function(nodo) {

        /*//ordeno descendente el array
         this.tareas.sort(function(a, b) {
         return b - a;
         });*/

        this.tareas.sort();
        this.tareas.reverse();

        // creo una cadena para concatenar todas las tareas del array
        var cadena = '';
        for (var i = 0; i < this.tareas.length; i++) {
            //por cada posicion del array llamo al showTarea
            cadena += this.showTarea(i);
        };
        //pongo el nodo vacio para que no se vayan acumulando las tareas previas
        nodo.innerHTML = "";
        //lo incustro en el nodo
        nodo.innerHTML = cadena;
        return false;

    },
    showAll : function(nodo) {

        // creo una cadena para concatenar todas las tareas del array
        var cadena = '';

        for (var i = 0; i < this.tareas.length; i++) {
            //por cada posicion del array llamo al showTarea
            cadena += this.showTarea(i);
        };
        //pongo el nodo vacio para que no se vayan acumulando las tareas previas
        nodo.innerHTML = "";

        //lo incustro en el nodo
        nodo.innerHTML = cadena;
        return false;

    },
    removePos : function(posicion) {
        this.tareas.splice(posicion, 1);
        return false;

    },
    removeAll : function() {
        this.tareas = [];
    }
};

var Tarea = function(description) {
    /* body... */
    this.texto = description;
    this.fecha = new Date().toDateString();
};

function init() {

    //capturo los nodos donde muestro la informacion
    var nodoInformacion = document.getElementById('informacion');
    var nodoTareas = document.getElementById('tareas');

    //boton añadir Principio
    var btnAddBegin = document.getElementById('addBegin');

    //evento click del boton añadir
    btnAddBegin.onclick = function() {

        //capturo el value del input del formulario
        var tareaCapturada = document.getElementById('tarea').value;

        //construyo el objeto tarea con los datos capturados
        var t = new Tarea(tareaCapturada);
        //llamo al metodo addTarea para añadirlo al objeto misTareas
        misTareas.addTarea(t, 'P');
        misTareas.showAll(nodoTareas);
        misTareas.showMensajeNumTareas(nodoInformacion);

    };
    //boton añadir final
    var btnAddEnd = document.getElementById('addEnd');

    //evento click del boton añadir
    btnAddEnd.onclick = function() {

        //capturo el value del input del formulario
        var tareaCapturada = document.getElementById('tarea').value;

        //construyo el objeto tarea con los datos capturados
        var t = new Tarea(tareaCapturada);
        //llamo al metodo addTarea para añadirlo al objeto misTareas
        misTareas.addTarea(t, 'F');
        misTareas.showAll(nodoTareas);
        misTareas.showMensajeNumTareas(nodoInformacion);

    };
    //////BOTON POSICION FALLA CUANDO NO HAY REGISTROS?? -- NO GUARDA EN LA POSICION

    //boton añadir en una posicion
    var btnAddPos = document.getElementById('addPos');

    //evento click del boton añadir
    btnAddPos.onclick = function() {
        //capturo los datos del formulario
        var tareaCapturada = document.getElementById('tarea').value;
        var nodoInformacion = document.getElementById('informacion');

        //capturo la posicion donde quiero ponerlo en el array
        var posicionCapturada = document.getElementById('posicion').value;
        posicionCapturada = parseInt(posicionCapturada);

        //construyo el objeto tarea con los datos capturados
        var t = new Tarea(tareaCapturada);
        //llamo al metodo addTarea para añadirlo al objeto misTareas
        misTareas.addTarea(t, posicionCapturada);
        misTareas.showAll(nodoInformacion);

    };

    //boton mostrar Registro
    var btnShowPos = document.getElementById('showPos');
    //evento click del boton mostrar
    btnShowPos.onclick = function() {

        //capturo el nodo donde quiero mostrar la informacion
        var nodoInformacion = document.getElementById('informacion');
        //capturo la posicion del registro que quiero ver del array
        var posicionCapturada = document.getElementById('posicion').value;
        posicionCapturada = parseInt(posicionCapturada);
        // llamo al metodo de showTarea para mostrar un registro especifico y lo pongo en el nodo de las tareas
        nodoTareas.innerHTML = misTareas.showTarea(posicionCapturada);
    };

    //boton mostrar Registros Ascendentes
    var btnShowAsc = document.getElementById('showAsc');
    //evento click del boton mostrar
    btnShowAsc.onclick = function() {
        //capturo el nodo donde quiero mostrar la informacion
        var nodoInformacion = document.getElementById('informacion');
        // llamo al metodo de showTareaAscendente
        misTareas.showTareasAscendente(nodoTareas);
    };

    //boton mostrar Registros Descendentes
    var btnShowDes = document.getElementById('showDes');
    //evento click del boton mostrar
    btnShowDes.onclick = function() {
        //capturo el nodo donde quiero mostrar la informacion
        var nodoInformacion = document.getElementById('informacion');
        // llamo al metodo de showTareaAscendente
        misTareas.showTareasDescendente(nodoTareas);
    };

    //boton mostrar Todos
    var btnShowAll = document.getElementById('showAll');
    //evento click del boton mostrar
    btnShowAll.onclick = function() {

        //capturo el nodo donde quiero mostrar la informacion
        var nodoInformacion = document.getElementById('informacion');
        // llamo al metodo de showTarea para mostrar un registro especifico
        misTareas.showAll(nodoTareas);
    };

    var btnRemovePos = document.getElementById('removePos');
    btnRemovePos.onclick = function() {
        //capturo la posicion del registro que quiero ver del array
        var posicionCapturada = document.getElementById('posicion').value;
        posicionCapturada = parseInt(posicionCapturada);
        misTareas.removePos(posicionCapturada);
        misTareas.showAll(nodoTareas);
        misTareas.showMensajeNumTareas(nodoInformacion);

    };

    var btnRemoveAll = document.getElementById('removeAll');
    btnRemoveAll.onclick = function() {
        misTareas.removeAll();
        misTareas.showAll(nodoTareas);
        misTareas.showMensajeNumTareas(nodoInformacion);
    };
}

window.onload = init;

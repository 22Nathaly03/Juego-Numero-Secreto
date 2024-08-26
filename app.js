let numeroSecreto = 0;
let intentos = 0;
let listaNumerosSorteados = [];
// Se hace con el const porque no se modifica en ningun momento la variable 
const numeroMaximo = 10;
const maxIntentos = 5;

function asignarTextoElemento(selector, texto) {
    let elementoHTML = document.querySelector(selector);
    if (elementoHTML) {
        elementoHTML.innerHTML = texto;
    } else {
        console.error(`No se encontró el elemento con el selector: ${selector}`);
    }
}

function verificarIntento() {
    let numeroDeUsuario = parseInt(document.getElementById('valorUsuario').value);

    if (intentos >= maxIntentos) {
        asignarTextoElemento('.texto__parrafo', `Has alcanzado el número máximo de intentos. El número secreto era ${numeroSecreto}.`);
        document.getElementById('reiniciar').removeAttribute('disabled');
        return;
    }

    if (numeroDeUsuario === numeroSecreto) {
        intentos++;
        asignarTextoElemento('.texto__parrafo', `¡Acertaste el número en ${intentos} ${(intentos === 1) ? 'intento' : 'intentos'}!`);
        document.getElementById('reiniciar').removeAttribute('disabled');
    } else {
        if (numeroDeUsuario > numeroSecreto) {
            asignarTextoElemento('.texto__parrafo', 'El número secreto es menor.');
        } else {
            asignarTextoElemento('.texto__parrafo', 'El número secreto es mayor.');
        }
        intentos++;
        limpiarCaja();
    }

    asignarTextoElemento('.texto__intentos', `Intentos: ${intentos} / ${maxIntentos}`);
}

function generarNumeroSecreto() {
    if (listaNumerosSorteados.length === numeroMaximo) {
        asignarTextoElemento('.texto__parrafo', 'Ya se sortearon todos los números posibles.');
        return; // Salir de la función si ya se han utilizado todos los números
    }

    let numeroGenerado = Math.floor(Math.random() * numeroMaximo) + 1;

    // Verificar si el número generado ya está en la lista
    while (listaNumerosSorteados.includes(numeroGenerado)) {
        numeroGenerado = Math.floor(Math.random() * numeroMaximo) + 1;
    }

    // Agregar el número generado a la lista de números sorteados
    listaNumerosSorteados.push(numeroGenerado);
    numeroSecreto = numeroGenerado; // Asignar el número secreto generado

    console.log(numeroSecreto);
    console.log(listaNumerosSorteados);
}

function condicionesIniciales() {
    asignarTextoElemento('h1', 'Juego del número secreto');
    asignarTextoElemento('.texto__parrafo', `Indica un número del 1 al ${numeroMaximo}`);
    generarNumeroSecreto(); // Inicializar el número secreto o mostrar mensaje de finalización
    intentos = 0; // Reiniciar el contador de intentos
    asignarTextoElemento('.texto__intentos', `Intentos: ${intentos} / ${maxIntentos}`);
}

function reiniciarJuego() {
    limpiarCaja();
    condicionesIniciales();
    document.getElementById('reiniciar').setAttribute('disabled', 'true');
}

function limpiarCaja() {
    document.getElementById('valorUsuario').value = '';  // Limpia el campo de entrada del usuario
}

// Llamada inicial a condicionesIniciales, ya que el script se ejecutará después de cargar el DOM
condicionesIniciales();
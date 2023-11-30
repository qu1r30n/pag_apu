function evaluarJuego(mesa, mano) {
    // Concatenar las cartas en la mesa y en la mano del jugador
    const cartasTotales = mesa.concat(mano);

    // Ordenar las cartas por valor
    cartasTotales.sort((a, b) => {
        const valorA = isNaN(a[0]) ? (a[0] === 'A' ? 14 : 11 + 'JQK'.indexOf(a[0])) : parseInt(a, 10);
        const valorB = isNaN(b[0]) ? (b[0] === 'A' ? 14 : 11 + 'JQK'.indexOf(b[0])) : parseInt(b, 10);
        return valorB - valorA;
    });

    // Verificar si hay un color (todas las cartas del mismo palo)
    const palo = cartasTotales[0].slice(-1);
    const color = cartasTotales.every(carta => carta.slice(-1) === palo);

    // Verificar si hay una escalera
    let escalera = false;
    for (let i = 0; i < cartasTotales.length - 1; i++) {
        if (parseInt(cartasTotales[i]) - 1 !== parseInt(cartasTotales[i + 1])) {
            escalera = false;
            break;
        }
        escalera = true;
    }

    // Determinar la mejor mano
    if (color && escalera) {
        return 'Escalera Real';
    } else if (color) {
        return 'Color';
    } else if (escalera) {
        return 'Escalera';
    } else {
        return 'Otras manos...'; // Puedes agregar lógica adicional para evaluar otras manos
    }
}

// Evento que se activa al seleccionar imágenes
document.getElementById('imagenes').addEventListener('change', function (event) {
    var previewDiv = document.getElementById('preview');
    previewDiv.innerHTML = ''; // Limpiar la vista previa antes de agregar nuevas imágenes

    var files = event.target.files;

    // Iterar sobre los archivos seleccionados
    for (var i = 0; i < files.length; i++) {
        (function (file) {
            // Validar que el archivo sea una imagen
            if (file.type.startsWith('image/')) {
                var reader = new FileReader();

                // Cuando la imagen se carga, agregarla a la vista previa
                reader.onload = function (e) {
                    // Crear un elemento de imagen y establecer su fuente
                    var img = document.createElement('img');
                    img.src = e.target.result;
                    img.width = 300;

                    // Asignar el ID de la imagen como el nombre del archivo
                    var fileName = file.name.replace(/\.[^/.]+$/, ""); // Eliminar la extensión del archivo
                    img.id = fileName;

                    // Agregar la imagen al div de vista previa
                    previewDiv.appendChild(img);
                };

                // Leer el contenido de la imagen como una URL de datos
                reader.readAsDataURL(file);
            }
        })(files[i]);
    }
});

// Función para buscar imágenes por ID
function buscarImagen(event) {
    if (event.key === 'Enter') {
        var buscarImagenInput = document.getElementById('buscarImagen');
        var filtro = buscarImagenInput.value.trim().toLowerCase();

        var imagenes = document.getElementById('preview').getElementsByTagName('img');

        // Ocultar todas las imágenes
        for (var i = 0; i < imagenes.length; i++) {
            var img = imagenes[i];
            img.style.display = 'none';
        }

        // Llamar a la función con la variable filtro
        var arrayDeSegmentos = dividirFiltroEnSegmentos(filtro);

        // Iterar sobre las imágenes y aplicar el filtro
        for (var i = 0; i < imagenes.length; i++) 
        {
            var img = imagenes[i];

            // Convertir tanto el ID de la imagen como el filtro a minúsculas para una comparación insensible a mayúsculas y minúsculas
            var imgId = img.id.toLowerCase();

            // Iterar sobre los segmentos del filtro
            for (var j = 0; j < arrayDeSegmentos.length; j++) 
            {
                // Mostrar u ocultar la imagen según si coincide con el filtro
                if (imgId.includes(arrayDeSegmentos[j])) {
                    img.style.display = 'inline-block';
                    // Si la imagen coincide con al menos un segmento, puedes salir del bucle interno
                    break;
                }
            }
        }
    }
}


// Función para dividir el filtro en segmentos de dos letras y guardarlos en un array
function dividirFiltroEnSegmentos(filtro) {
    var arrayDeSegmentos = [];

    // Iterar sobre el filtro con un paso de 2 letras
    for (var i = 0; i < filtro.length; i += 2) {
        // Obtener el segmento de dos letras
        var segmento = filtro.slice(i, i + 2);
        
        // Agregar el segmento al array
        arrayDeSegmentos.push(segmento);
    }

    return arrayDeSegmentos;
}
//----------------------------------------------------------------------------

function agregarMensaje() 
{
    var mensaje = document.getElementById("cartas_input").value;
    var nuevoMensaje = document.createElement("p");
    nuevoMensaje.textContent = mensaje;
    document.getElementById("manoContainer").appendChild(nuevoMensaje);
    document.getElementById("cartas_input").value = "";

    // Obtén el contenido de los contenedores de mesa y mano
    var contenidoMesa = document.getElementById("mesaContainer").textContent;
    var contenidoMano = document.getElementById("manoContainer").textContent;

    // Llamar a la función con la variable filtro
    var arreglo_mesa = dividirFiltroEnSegmentos(contenidoMesa);
    // Llamar a la función con la variable filtro
    var arreglo_mano = dividirFiltroEnSegmentos(contenidoMano);
    

    var resultado = evaluarJuego(arreglo_mesa,arreglo_mano);

    document.getElementById("mesaContainer").textContent=resultado;

}
//evaluacion---------------------------------------------------------------------

function evaluarJuego(mesa, mano) 
{
    // Concatenar las cartas en la mesa y en la mano del jugador
    var cartasTotales = mesa.concat(mano);
    
    var numeros = cartasTotales.map(cart => cart[0]);
    var letras = cartasTotales.map(cart => cart[1]);

    var resultado_numeros = contarElementosIguales(numeros);
    var resultado_letras = contarElementosIguales(letras);

    encontrarCincoConsecutivosConLetras(numeros);
    encontrarCincoConsecutivosConLetras(letras);

    

    return "";
    
}

function contarElementosIguales(arreglo) 
{
  return arreglo.reduce((acc, valor) => 
  {
    acc[valor] = (acc[valor] || 0) + 1;
    return acc;
  }, {});
}

function encontrarCincoConsecutivosConLetras(numeros, letras) 
{
  const setNumeros = new Set(numeros);
  const consecutivosEncontrados = [];

  for (let num of setNumeros) 
  {
    if (
      setNumeros.has(num) &&
      setNumeros.has(num + 1) &&
      setNumeros.has(num + 2) &&
      setNumeros.has(num + 3) &&
      setNumeros.has(num + 4)
    ) {
      const secuenciaNumeros = [num, num + 1, num + 2, num + 3, num + 4];
      const secuenciaLetras = secuenciaNumeros.map(n => letras[numeros.indexOf(n)]);

      // Verificar si todas las letras son iguales en la misma posición
      if (secuenciaLetras.every((letra, index) => letra === letras[numeros.indexOf(secuenciaNumeros[index])])) {
        consecutivosEncontrados.push({ numeros: secuenciaNumeros, letras: secuenciaLetras });
      }
    }
  }

  return consecutivosEncontrados;
}




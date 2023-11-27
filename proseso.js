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

        // Iterar sobre las imágenes y aplicar el filtro
        for (var i = 0; i < imagenes.length; i++) {
            var img = imagenes[i];

            // Convertir tanto el ID de la imagen como el filtro a minúsculas para una comparación insensible a mayúsculas y minúsculas
            var imgId = img.id.toLowerCase();

            // Mostrar u ocultar la imagen según si coincide con el filtro
            if (imgId.includes(filtro)) {
                img.style.display = 'inline-block';
            } else {
                img.style.display = 'none';
            }
        }
    }
}

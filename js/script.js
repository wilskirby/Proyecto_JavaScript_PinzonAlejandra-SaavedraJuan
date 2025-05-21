// Función principal para cargar los datos desde la API
document.addEventListener('DOMContentLoaded', function() {
  const cardsContainer = document.getElementById('cardsContainer');
  const loading = document.getElementById('loading');
  
  // URL de la API
  const apiUrl = 'https://6818a31e5a4b07b9d1d01ad4.mockapi.io/api/v1/Proyecto';
  
  // Obtener datos de la API
  fetch(apiUrl)
    .then(response => {
      if (!response.ok) {
        throw new Error('Error al cargar los datos');
      }
      return response.json();
    })
    .then(apiData => {
      // Ocultar indicador de carga
      loading.style.display = 'none';
      
      // Procesar y mostrar los datos de los pilotos
      processAndDisplayDrivers(apiData);
    })
    .catch(error => {
      console.error('Error:', error);
      loading.innerHTML = `Error al cargar datos: ${error.message}`;
    });
  
  // Función para procesar y mostrar los pilotos desde los datos de la API
  function processAndDisplayDrivers(data) {
    if (!data || !data[0] || !data[0].pilotos) {
      loading.innerHTML = 'Error: Formato de datos inesperado';
      loading.style.display = 'block';
      return;
    }
    
    // Obtener la lista de pilotos del objeto de datos
    const pilotos = data[0].pilotos;
    
    // Crear y mostrar las tarjetas de pilotos
    pilotos.forEach(piloto => {
      const card = createDriverCard(piloto, data[0]);
      cardsContainer.appendChild(card);
    });
  }
  
  // Función para crear una tarjeta de piloto basada en los datos de la API
  function createDriverCard(piloto, datosCompletos) {
    // Encontrar el equipo correspondiente
    const equipo = datosCompletos.equipos.find(e => e.nombre === piloto.equipo);
    
    // Crear el elemento de tarjeta
    const card = document.createElement('div');
    card.className = 'card-f1';
    
    // Obtener apellido del nombre completo (último espacio en adelante)
    const nombreCompleto = piloto.nombre.split(' ');
    const nombre = nombreCompleto.slice(0, -1).join(' ');
    const apellido = nombreCompleto.slice(-1)[0];
    
    // Determinar el número del piloto (usamos el ID como respaldo)
    const numero = piloto.id.toString();
    
    // Contenido HTML de la tarjeta
    card.innerHTML = `
      <div class="d-flex justify-content-between align-items-start">
        <div>
          <p class="text-secondary fs-4 fw-semibold mb-1">${nombre}</p>
          <p class="text-dark display-5 fw-bold">${apellido}</p>
          <span class="team-badge">${piloto.equipo}</span>
          <p class="mt-2"><strong>Rol:</strong> ${piloto.rol}</p>
        </div>
        ${equipo ? `<img src="${equipo.imagen}" alt="Logo ${piloto.equipo}" style="height: 96px; object-fit: contain;">` : ''}
      </div>
      <img src="${piloto.imagen}" alt="${piloto.nombre}" class="driver-img">
      <div class="number-f1" style="color: ${getTeamColor(piloto.equipo)};">${numero}</div>
    `;
    
    return card;
  }
  
  // Función para determinar el color del equipo basado en el nombre
  function getTeamColor(nombreEquipo) {
    // Colores predeterminados por equipo
    const colores = {
      'Red Bull Racing': '#0600EF',
      'Ferrari': '#DC0000',
      'McLaren': '#FF8700',
      'Mercedes-AMG Petronas': '#00D2BE',
      'Alpine': '#0090FF',
      'Aston Martin': '#006F62',
      'AlphaTauri': '#4E7C9B',
      'Williams': '#005AFF',
      'Alfa Romeo': '#900000',
      'Haas': '#FFFFFF'
    };
    
    return colores[nombreEquipo] || '#FF8700'; // Color naranja por defecto
  }
});
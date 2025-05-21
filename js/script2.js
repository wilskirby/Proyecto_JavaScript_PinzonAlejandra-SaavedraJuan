// Función principal para cargar los datos desde la API
document.addEventListener('DOMContentLoaded', function() {
  const circuitCarousel = document.getElementById('circuitCarousel');
  const loading = document.getElementById('loading');
  const prevBtn = document.getElementById('prevCircuit');
  const nextBtn = document.getElementById('nextCircuit');
  const btnAgregarCircuito = document.getElementById('btnAgregarCircuito');
  
  // Variables para controlar el carrusel
  let currentIndex = 0;
  let circuitCount = 0;
  
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
      
      // Procesar y mostrar los circuitos
      processAndDisplayCircuits(apiData);
    })
    .catch(error => {
      console.error('Error:', error);
      loading.innerHTML = `Error al cargar datos: ${error.message}`;
    });
  
  // Función para procesar y mostrar los circuitos desde los datos de la API
  function processAndDisplayCircuits(data) {
    if (!data || !data[0] || !data[0].circuitos) {
      loading.innerHTML = 'Error: Formato de datos inesperado';
      loading.style.display = 'block';
      return;
    }
    
    // Obtener la lista de circuitos del objeto de datos
    const circuitos = data[0].circuitos;
    // Obtener la lista de pilotos para buscar nombres por ID
    const pilotos = data[0].pilotos || [];
    circuitCount = circuitos.length;
    
    // Limpiar el contenedor
    circuitCarousel.innerHTML = '';
    
    // Crear y mostrar los slides de circuitos
    circuitos.forEach(circuito => {
      const slide = createCircuitSlide(circuito, pilotos);
      circuitCarousel.appendChild(slide);
    });
    
    // Mostrar el primer circuito
    updateCarousel();
  }
  
  // Función para crear un slide de circuito con información extendida
  function createCircuitSlide(circuito, pilotos) {
    const slide = document.createElement('div');
    slide.className = 'circuit-slide';
    
    // Obtener la bandera según el país
    const bandera = getBanderaPais(circuito.pais);
    
    // Usar directamente la imagen del circuito de la API
    const circuitImage = circuito.imagen;
    
    // Obtener información de récord de vuelta
    const recordVuelta = circuito.record_vuelta ? 
      `${circuito.record_vuelta.tiempo} (${circuito.record_vuelta.piloto}, ${circuito.record_vuelta.año})` : 
      'No disponible';
    
    // Procesar los ganadores recientes y convertir IDs a nombres de pilotos
    let ganadoresHTML = '';
    if (circuito.ganadores && circuito.ganadores.length > 0) {
      ganadoresHTML = '<div class="recent-winners"><h5>Ganadores recientes</h5><ul>';
      circuito.ganadores.forEach(ganador => {
        // Buscar el nombre del piloto por ID
        const piloto = pilotos.find(p => p.id === ganador.piloto);
        const nombrePiloto = piloto ? piloto.nombre : `Piloto ID ${ganador.piloto}`;
        ganadoresHTML += `<li>${ganador.temporada}: ${nombrePiloto}</li>`;
      });
      ganadoresHTML += '</ul></div>';
    }

    slide.innerHTML = `
      <div class="circuit-card">
        <div class="circuit-header">
          <div class="circuit-dots">
            <i class="fas fa-ellipsis-v"></i>
          </div>
          <h3 class="circuit-name">${circuito.nombre}</h3>
          <img src="${bandera}" alt="${circuito.pais}" class="circuit-flag">
        </div>
        <div class="circuit-image">
          <div class="circuit-track">
            <img src="${circuitImage}" alt="${circuito.nombre} layout">
          </div>
        </div>
        <div class="circuit-details p-4">
          <div class="row">
            <div class="col-md-6">
              <div class="info-box bg-light p-3 mb-3 rounded shadow-sm">
                <h4 class="text-dark">Información técnica</h4>
                <div class="d-flex justify-content-between mb-2">
                  <strong class="text-secondary">Longitud:</strong>
                  <span class="text-dark">${circuito.longitud_km} km</span>
                </div>
                <div class="d-flex justify-content-between mb-2">
                  <strong class="text-secondary">Vueltas:</strong>
                  <span class="text-dark">${circuito.vueltas}</span>
                </div>
                <div class="d-flex justify-content-between">
                  <strong class="text-secondary">Récord:</strong>
                  <span class="text-dark">${recordVuelta}</span>
                </div>
              </div>
            </div>
            <div class="col-md-6">
              ${ganadoresHTML}
            </div>
          </div>
          <div class="circuit-description bg-light p-3 rounded shadow-sm">
            <h4 class="text-dark mb-2">Descripción</h4>
            <p class="text-dark mb-0">${circuito.descripcion}</p>
          </div>
        </div>
      </div>
    `;
    
    return slide;
  }
  
  // Función para obtener URL de bandera según el país
  function getBanderaPais(pais) {
    const banderas = {
      'Mónaco': 'https://upload.wikimedia.org/wikipedia/commons/e/ea/Flag_of_Monaco.svg',
      'Reino Unido': 'https://flagdom.com/flag-resources/flag-images/international/british/british-flag_3000x1500.png',
      'Bélgica': 'https://upload.wikimedia.org/wikipedia/commons/6/65/Flag_of_Belgium.svg',
      'Italia': 'https://upload.wikimedia.org/wikipedia/commons/0/03/Flag_of_Italy.svg',
      'Brasil': 'https://upload.wikimedia.org/wikipedia/commons/0/05/Flag_of_Brazil.svg',
      'Emiratos Árabes Unidos': 'https://upload.wikimedia.org/wikipedia/commons/c/cb/Flag_of_the_United_Arab_Emirates.svg',
      'Japón': 'https://upload.wikimedia.org/wikipedia/commons/9/9e/Flag_of_Japan.svg',
      'Alemania': 'https://upload.wikimedia.org/wikipedia/commons/b/ba/Flag_of_Germany.svg',
      'España': 'https://upload.wikimedia.org/wikipedia/commons/9/9a/Flag_of_Spain.svg',
      'Canadá': 'https://upload.wikimedia.org/wikipedia/commons/d/d9/Flag_of_Canada_%28Pantone%29.svg',
      'Francia': 'https://upload.wikimedia.org/wikipedia/commons/c/c3/Flag_of_France.svg',
      'Austria': 'https://upload.wikimedia.org/wikipedia/commons/4/41/Flag_of_Austria.svg',
    };
    
    return banderas[pais] || 'https://upload.wikimedia.org/wikipedia/commons/9/97/Flag_of_the_FIA.svg';
  }
  
  // Función para actualizar la visualización del carrusel
  function updateCarousel() {
    circuitCarousel.style.transform = `translateX(-${currentIndex * 100}%)`;
  }
  
  // Event listeners para los botones de navegación
  prevBtn.addEventListener('click', function() {
    if (currentIndex > 0) {
      currentIndex--;
      updateCarousel();
    }
  });
  
  nextBtn.addEventListener('click', function() {
    if (currentIndex < circuitCount - 1) {
      currentIndex++;
      updateCarousel();
    }
  });
  
  // Event listener para el botón de agregar circuito
  btnAgregarCircuito.addEventListener('click', function() {
    alert('Funcionalidad para agregar circuito no implementada');
  });
});
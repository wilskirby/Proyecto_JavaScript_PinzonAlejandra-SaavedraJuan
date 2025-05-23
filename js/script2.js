document.addEventListener('DOMContentLoaded', function() {
    const circuitCarousel = document.getElementById('circuitCarousel');
    const loading = document.getElementById('loading');
    const prevBtn = document.getElementById('prevCircuit');
    const nextBtn = document.getElementById('nextCircuit');
    const btnAgregarCircuito = document.getElementById('btnAgregarCircuito');
    const modalAgregarCircuito = new bootstrap.Modal(document.getElementById('modalAgregarCircuito'));
    const btnGuardarCircuito = document.getElementById('btnGuardarCircuito');
    const alertContainer = document.getElementById('alertContainer');

    let currentIndex = 0;
    let circuitCount = 0;
    let allData = null;

    const apiUrl = 'https://6818a31e5a4b07b9d1d01ad4.mockapi.io/api/v1/Proyecto';

    loadCircuits();

    function loadCircuits() {
      fetch(apiUrl)
        .then(response => {
          if (!response.ok) {
            throw new Error('Error al cargar los datos');
          }
          return response.json();
        })
        .then(apiData => {
          allData = apiData;
          loading.style.display = 'none';
          processAndDisplayCircuits(apiData);
        })
        .catch(error => {
          console.error('Error:', error);
          loading.innerHTML = `Error al cargar datos: ${error.message}`;
        });
    }


    function processAndDisplayCircuits(data) {
      if (!data || !data[0] || !data[0].circuitos) {
        loading.innerHTML = 'Error: Formato de datos inesperado';
        loading.style.display = 'block';
        return;
      }

      const circuitos = data[0].circuitos;
      const pilotos = data[0].pilotos || [];
      circuitCount = circuitos.length;

      circuitCarousel.innerHTML = '';

      circuitos.forEach(circuito => {
        const slide = createCircuitSlide(circuito, pilotos);
        circuitCarousel.appendChild(slide);
      });

      updateCarousel();
    }

    function createCircuitSlide(circuito, pilotos) {
      const slide = document.createElement('div');
      slide.className = 'circuit-slide';

      const bandera = getBanderaPais(circuito.pais);
      const circuitImage = circuito.imagen;

      const recordVuelta = circuito.record_vuelta ? 
        `${circuito.record_vuelta.tiempo} (${circuito.record_vuelta.piloto}, ${circuito.record_vuelta.año})` : 
        'No disponible';

      let ganadoresHTML = '';
      if (circuito.ganadores && circuito.ganadores.length > 0) {
        ganadoresHTML = '<div class="recent-winners"><h5>Ganadores recientes</h5><ul>';
        circuito.ganadores.forEach(ganador => {
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
        'Estados Unidos': 'https://upload.wikimedia.org/wikipedia/commons/a/a4/Flag_of_the_United_States.svg',
        'México': 'https://upload.wikimedia.org/wikipedia/commons/f/fc/Flag_of_Mexico.svg',
        'Singapur': 'https://upload.wikimedia.org/wikipedia/commons/4/48/Flag_of_Singapore.svg',
        'Australia': 'https://upload.wikimedia.org/wikipedia/commons/8/88/Flag_of_Australia_%28converted%29.svg'
      };

      return banderas[pais] || 'https://upload.wikimedia.org/wikipedia/commons/9/97/Flag_of_the_FIA.svg';
    }

    function updateCarousel() {
      circuitCarousel.style.transform = `translateX(-${currentIndex * 100}%)`;
    }
    function showAlert(message, type = 'success') {
      const alertDiv = document.createElement('div');
      alertDiv.className = `alert alert-${type} alert-dismissible fade show`;
      alertDiv.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
      `;
      alertContainer.appendChild(alertDiv);

      setTimeout(() => {
        if (alertDiv.parentNode) {
          alertDiv.remove();
        }
      }, 5000);
    }

    function clearForm() {
      document.getElementById('formAgregarCircuito').reset();
      alertContainer.innerHTML = '';
    }

    function generateId() {
      return Date.now().toString();
    }

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


    btnAgregarCircuito.addEventListener('click', function() {
      clearForm();
      modalAgregarCircuito.show();
    });


    btnGuardarCircuito.addEventListener('click', function() {

      const form = document.getElementById('formAgregarCircuito');
      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }



      const nuevoCircuito = {
        id: generateId(),
        nombre: document.getElementById('nombreCircuito').value.trim(),
        pais: document.getElementById('paisCircuito').value,
        longitud_km: parseFloat(document.getElementById('longitudCircuito').value),
        vueltas: parseInt(document.getElementById('vueltasCircuito').value),
        imagen: document.getElementById('imagenCircuito').value.trim(),
        descripcion: document.getElementById('descripcionCircuito').value.trim(),
        ganadores: []
      };

 
      const tiempoRecord = document.getElementById('tiempoRecord').value.trim();
      const pilotoRecord = document.getElementById('pilotoRecord').value.trim();
      const anoRecord = document.getElementById('anoRecord').value;

      if (tiempoRecord && pilotoRecord && anoRecord) {
        nuevoCircuito.record_vuelta = {
          tiempo: tiempoRecord,
          piloto: pilotoRecord,
          año: parseInt(anoRecord)
        };
      }


      btnGuardarCircuito.disabled = true;
      btnGuardarCircuito.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Guardando...';


      if (allData && allData[0] && allData[0].circuitos) {
        allData[0].circuitos.push(nuevoCircuito);


        fetch(apiUrl + '/1', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(allData[0])
        })
        .then(response => {
          if (!response.ok) {
            throw new Error('Error al guardar el circuito');
          }
          return response.json();
        })
        .then(data => {
          showAlert('<i class="fas fa-check-circle me-2"></i>¡Circuito agregado exitosamente!', 'success');
          

          processAndDisplayCircuits([data]);
          

          currentIndex = circuitCount - 1;
          updateCarousel();
          

          setTimeout(() => {
            modalAgregarCircuito.hide();
          }, 2000);
        })
        .catch(error => {
          console.error('Error:', error);
          showAlert('<i class="fas fa-exclamation-triangle me-2"></i>Error al guardar el circuito: ' + error.message, 'danger');
          

          allData[0].circuitos.pop();
        })
        .finally(() => {

          btnGuardarCircuito.disabled = false;
          btnGuardarCircuito.innerHTML = '<i class="fas fa-save me-2"></i>Guardar Circuito';
        });
      } else {
        showAlert('<i class="fas fa-exclamation-triangle me-2"></i>Error: No se pudieron cargar los datos', 'danger');
        btnGuardarCircuito.disabled = false;
        btnGuardarCircuito.innerHTML = '<i class="fas fa-save me-2"></i>Guardar Circuito';
      }
    });


    document.getElementById('modalAgregarCircuito').addEventListener('hidden.bs.modal', function() {
      clearForm();
    });
  });
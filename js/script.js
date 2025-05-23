
document.addEventListener('DOMContentLoaded', function() {
  const cardsContainer = document.getElementById('cardsContainer');
  const loading = document.getElementById('loading');
  const btnAgregarPiloto = document.getElementById('btnAgregarPiloto');
  let datosGlobales = null;
  const apiUrl = 'https://6818a31e5a4b07b9d1d01ad4.mockapi.io/api/v1/Proyecto';

  fetch(apiUrl)
    .then(response => {
      if (!response.ok) {
        throw new Error('Error al cargar los datos');
      }
      return response.json();
    })
    .then(apiData => {
      loading.style.display = 'none';
      
      datosGlobales = apiData;
    
      processAndDisplayDrivers(apiData);
    })
    .catch(error => {
      console.error('Error:', error);
      loading.innerHTML = `Error al cargar datos: ${error.message}`;
    });
  
  function processAndDisplayDrivers(data) {
    if (!data || !data[0] || !data[0].pilotos) {
      loading.innerHTML = 'Error: Formato de datos inesperado';
      loading.style.display = 'block';
      return;
    }
    

    const pilotos = data[0].pilotos;
    
    cardsContainer.innerHTML = '';
    
    pilotos.forEach(piloto => {
      const card = createDriverCard(piloto, data[0]);
      cardsContainer.appendChild(card);
    });
  }
  
  function createDriverCard(piloto, datosCompletos) {
    const equipo = datosCompletos.equipos.find(e => e.nombre === piloto.equipo);
    
    const card = document.createElement('div');
    card.className = 'card-f1';
    
    const nombreCompleto = piloto.nombre.split(' ');
    const nombre = nombreCompleto.slice(0, -1).join(' ');
    const apellido = nombreCompleto.slice(-1)[0];
    
    const numero = piloto.id.toString();
    
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
  
  function getTeamColor(nombreEquipo) {
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
    
    return colores[nombreEquipo] || '#FF8700'; 
  }
  
  if (btnAgregarPiloto) {
    btnAgregarPiloto.addEventListener('click', function() {
      abrirModalNuevoPiloto();
    });
  }
  
  function abrirModalNuevoPiloto() {
    const modalAnterior = document.getElementById('modalNuevoPiloto');
    if (modalAnterior) {
      modalAnterior.remove();
    }
    
    const modal = document.createElement('div');
    modal.className = 'modal fade';
    modal.id = 'modalNuevoPiloto';
    modal.setAttribute('tabindex', '-1');
    modal.setAttribute('aria-labelledby', 'modalNuevoPilotoLabel');
    modal.setAttribute('aria-hidden', 'true');
    
    const equiposOptions = datosGlobales[0].equipos.map(equipo => 
      `<option value="${equipo.nombre}">${equipo.nombre}</option>`
    ).join('');
    
    modal.innerHTML = `
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header" style="background-color: #e10600; color: white;">
            <h5 class="modal-title" id="modalNuevoPilotoLabel">Añadir Nuevo Piloto</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <form id="formNuevoPiloto">
              <div class="mb-3">
                <label for="nombrePiloto" class="form-label">Nombre Completo</label>
                <input type="text" class="form-control" id="nombrePiloto" required>
              </div>
              <div class="mb-3">
                <label for="equipoPiloto" class="form-label">Equipo</label>
                <select class="form-select" id="equipoPiloto" required>
                  <option value="" selected disabled>Selecciona un equipo</option>
                  ${equiposOptions}
                </select>
              </div>
              <div class="mb-3">
                <label for="rolPiloto" class="form-label">Rol</label>
                <select class="form-select" id="rolPiloto" required>
                  <option value="" selected disabled>Selecciona un rol</option>
                  <option value="Piloto Principal">Piloto Principal</option>
                  <option value="Piloto Secundario">Piloto Secundario</option>
                  <option value="Piloto de Reserva">Piloto de Reserva</option>
                  <option value="Piloto de Pruebas">Piloto de Pruebas</option>
                </select>
              </div>
              <div class="mb-3">
                <label for="imagenPiloto" class="form-label">URL de la Imagen</label>
                <input type="url" class="form-control" id="imagenPiloto" required 
                  placeholder="https://ejemplo.com/imagen.jpg">
                <div class="form-text">Ingresa la URL de una imagen del piloto</div>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
            <button type="button" class="btn btn-danger" id="btnGuardarPiloto">Guardar Piloto</button>
          </div>
        </div>
      </div>
    `;
    
    document.body.appendChild(modal);
    
    const modalBootstrap = new bootstrap.Modal(modal);
    modalBootstrap.show();
    
    document.getElementById('btnGuardarPiloto').addEventListener('click', function() {
      guardarNuevoPiloto();
    });
    
    function guardarNuevoPiloto() {
      const nombre = document.getElementById('nombrePiloto').value.trim();
      const equipo = document.getElementById('equipoPiloto').value;
      const rol = document.getElementById('rolPiloto').value;
      const imagen = document.getElementById('imagenPiloto').value.trim();
      
      if (!nombre || !equipo || !rol || !imagen) {
        alert('Por favor, completa todos los campos');
        return;
      }
      const nuevoPiloto = {
        id: datosGlobales[0].pilotos.length + 1, 
        nombre: nombre,
        equipo: equipo,
        rol: rol,
        imagen: imagen
      };
      
      datosGlobales[0].pilotos.push(nuevoPiloto);
      
      processAndDisplayDrivers(datosGlobales);
      
      modalBootstrap.hide();
      
      mostrarAlerta('Piloto añadido con éxito', 'success');
    }
  }
  
  function mostrarAlerta(mensaje, tipo) {
    const alertaDiv = document.createElement('div');
    alertaDiv.className = `alert alert-${tipo} alert-dismissible fade show position-fixed top-0 start-50 translate-middle-x mt-4`;
    alertaDiv.setAttribute('role', 'alert');
    alertaDiv.style.zIndex = '9999';
    
    alertaDiv.innerHTML = `
      ${mensaje}
      <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    `;
    
    document.body.appendChild(alertaDiv);
    
    setTimeout(() => {
      alertaDiv.remove();
    }, 3000);
  }
});
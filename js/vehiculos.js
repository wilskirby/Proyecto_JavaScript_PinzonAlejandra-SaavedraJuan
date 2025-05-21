// URLs de la API
const API_URL = 'https://6818a31e5a4b07b9d1d01ad4.mockapi.io/api/v1/Proyecto';

// Variables globales
let vehiculosData = [];

// Función para obtener datos de la API
async function fetchVehiculos() {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        vehiculosData = data[0].vehiculos; // Extraemos el array de vehículos
        return vehiculosData;
    } catch (error) {
        console.error('Error fetching data:', error);
        hideLoading();
        showError('Error al cargar los datos. Por favor, intente nuevamente.');
        return [];
    }
}

// Función para ocultar el indicador de carga
function hideLoading() {
    const loading = document.getElementById('loading');
    if (loading) {
        loading.style.display = 'none';
    }
}

// Función para mostrar errores
function showError(message) {
    const container = document.getElementById('cardsContainer');
    container.innerHTML = `
        <div class="col-12 text-center">
            <div class="alert alert-danger" role="alert">
                ${message}
            </div>
        </div>
    `;
}

// Función para obtener el color del equipo
function getTeamColor(equipo) {
    const teamColors = {
        'Red Bull Racing': '#1e40af',
        'Mercedes-AMG Petronas': '#00d2be',
        'Aston Martin Aramco': '#006f62',
        'BWT Alpine': '#0090ff',
        'MoneyGram Haas': '#ffffff',
        'Visa Cash App Racing Bulls': '#6366f1',
        'McLaren': '#ff8700',
        'Ferrari': '#dc2626'
    };
    return teamColors[equipo] || '#6b7280';
}

// Función para crear las tarjetas de vehículos
function createVehicleCards(vehiculos) {
    const container = document.getElementById('cardsContainer');
    container.innerHTML = '';

    vehiculos.forEach((vehiculo, index) => {
        const teamColor = getTeamColor(vehiculo.equipo);
        const card = document.createElement('div');
        card.className = 'col-md-6 col-lg-4 mb-4';
        
        card.innerHTML = `
            <div class="vehicle-card" style="background: linear-gradient(135deg, ${teamColor}15, ${teamColor}05);">
                <div class="vehicle-header" style="border-left: 4px solid ${teamColor};">
                    <h5 class="team-name" style="color: ${teamColor};">${vehiculo.equipo}</h5>
                </div>
                
                <div class="vehicle-image-container">
                    <img src="${vehiculo.imagen}" alt="${vehiculo.modelo}" class="vehicle-image" onerror="this.src='../imgs/placeholder-car.jpg'">
                </div>
                
                <div class="vehicle-info">
                    <h6 class="vehicle-model">${vehiculo.modelo}</h6>
                    <div class="vehicle-details">
                        <div class="detail-item">
                            <span class="detail-label">Motor:</span>
                            <span class="detail-value">${vehiculo.motor}</span>
                        </div>
                        <div class="detail-item">
                            <span class="detail-label">Velocidad Máx:</span>
                            <span class="detail-value">${vehiculo.velocidad_max_kmh} km/h</span>
                        </div>
                        <div class="detail-item">
                            <span class="detail-label">0-100 km/h:</span>
                            <span class="detail-value">${vehiculo.aceleracion_0_100}s</span>
                        </div>
                    </div>
                </div>
                
                <div class="vehicle-footer">
                    <button class="btn-saber-mas" onclick="showVehicleDetails(${index})" style="background-color: ${teamColor};">
                        <span>Saber mas...</span>
                        <div class="btn-icon">+</div>
                    </button>
                </div>
            </div>
        `;
        
        container.appendChild(card);
    });
}

// Función para mostrar detalles del vehículo en el modal
function showVehicleDetails(index) {
    const vehiculo = vehiculosData[index];
    if (!vehiculo) return;

    const modalTitle = document.getElementById('vehicleModalLabel');
    const modalContent = document.getElementById('modalContent');
    
    modalTitle.textContent = `${vehiculo.equipo} - ${vehiculo.modelo}`;
    
    modalContent.innerHTML = `
        <div class="vehicle-detail-content">
            <div class="row">
                <div class="col-md-6">
                    <img src="${vehiculo.imagen}" alt="${vehiculo.modelo}" class="img-fluid rounded mb-3" style="width: 100%; height: 200px; object-fit: cover;">
                </div>
                <div class="col-md-6">
                    <h5>Especificaciones Técnicas</h5>
                    <div class="spec-grid">
                        <div class="spec-item">
                            <strong>Equipo:</strong> ${vehiculo.equipo}
                        </div>
                        <div class="spec-item">
                            <strong>Modelo:</strong> ${vehiculo.modelo}
                        </div>
                        <div class="spec-item">
                            <strong>Motor:</strong> ${vehiculo.motor}
                        </div>
                        <div class="spec-item">
                            <strong>Velocidad Máxima:</strong> ${vehiculo.velocidad_max_kmh} km/h
                        </div>
                        <div class="spec-item">
                            <strong>Aceleración 0-100:</strong> ${vehiculo.aceleracion_0_100} segundos
                        </div>
                        <div class="spec-item">
                            <strong>Pilotos:</strong> ${vehiculo.pilotos.join(', ')}
                        </div>
                    </div>
                </div>
            </div>
            
            <hr>
            
            <h5>Rendimiento por Modo de Conducción</h5>
            
            <div class="performance-tabs">
                <ul class="nav nav-tabs" id="performanceTabs" role="tablist">
                    <li class="nav-item" role="presentation">
                        <button class="nav-link active" id="normal-tab" data-bs-toggle="tab" data-bs-target="#normal" type="button" role="tab">
                            Conducción Normal
                        </button>
                    </li>
                    <li class="nav-item" role="presentation">
                        <button class="nav-link" id="agresiva-tab" data-bs-toggle="tab" data-bs-target="#agresiva" type="button" role="tab">
                            Conducción Agresiva
                        </button>
                    </li>
                    <li class="nav-item" role="presentation">
                        <button class="nav-link" id="ahorro-tab" data-bs-toggle="tab" data-bs-target="#ahorro" type="button" role="tab">
                            Ahorro de Combustible
                        </button>
                    </li>
                </ul>
                
                <div class="tab-content" id="performanceTabContent">
                    ${createPerformanceTab('normal', vehiculo.rendimiento.conduccion_normal, true)}
                    ${createPerformanceTab('agresiva', vehiculo.rendimiento.conduccion_agresiva, false)}
                    ${createPerformanceTab('ahorro', vehiculo.rendimiento.ahorro_combustible, false)}
                </div>
            </div>
        </div>
    `;
    
    // Mostrar el modal
    const modal = new bootstrap.Modal(document.getElementById('vehicleModal'));
    modal.show();
}

// Función para crear el contenido de cada tab de rendimiento
function createPerformanceTab(id, data, active) {
    return `
        <div class="tab-pane fade ${active ? 'show active' : ''}" id="${id}" role="tabpanel">
            <div class="row mt-3">
                <div class="col-md-4">
                    <div class="performance-card">
                        <h6>Velocidad Promedio</h6>
                        <div class="performance-value">${data.velocidad_promedio_kmh} km/h</div>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="performance-card">
                        <h6>Consumo de Combustible</h6>
                        <div class="weather-data">
                            <div class="weather-item">
                                <span class="weather-icon">☀️</span>
                                <span>Seco: ${data.consumo_combustible.seco} L/km</span>
                            </div>
                            <div class="weather-item">
                                <span class="weather-icon">🌧️</span>
                                <span>Lluvioso: ${data.consumo_combustible.lluvioso} L/km</span>
                            </div>
                            <div class="weather-item">
                                <span class="weather-icon">⛈️</span>
                                <span>Extremo: ${data.consumo_combustible.extremo} L/km</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="performance-card">
                        <h6>Desgaste de Neumáticos</h6>
                        <div class="weather-data">
                            <div class="weather-item">
                                <span class="weather-icon">☀️</span>
                                <span>Seco: ${data.desgaste_neumaticos.seco}%/km</span>
                            </div>
                            <div class="weather-item">
                                <span class="weather-icon">🌧️</span>
                                <span>Lluvioso: ${data.desgaste_neumaticos.lluvioso}%/km</span>
                            </div>
                            <div class="weather-item">
                                <span class="weather-icon">⛈️</span>
                                <span>Extremo: ${data.desgaste_neumaticos.extremo}%/km</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// Función principal para inicializar la página
async function initVehiculos() {
    try {
        const vehiculos = await fetchVehiculos();
        hideLoading();
        
        if (vehiculos && vehiculos.length > 0) {
            createVehicleCards(vehiculos);
        } else {
            showError('No se encontraron vehículos disponibles.');
        }
    } catch (error) {
        console.error('Error initializing vehicles:', error);
        hideLoading();
        showError('Error al inicializar la página. Por favor, recargue la página.');
    }
}

// Inicializar cuando el DOM esté cargado
document.addEventListener('DOMContentLoaded', initVehiculos);
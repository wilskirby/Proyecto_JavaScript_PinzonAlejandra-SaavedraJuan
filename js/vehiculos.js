const API_URL = 'https://6818a31e5a4b07b9d1d01ad4.mockapi.io/api/v1/Proyecto';

const teamClasses = {
    'Red Bull Racing': 'card-red-bull',
    'Mercedes-AMG Petronas': 'card-mercedes',
    'Ferrari': 'card-ferrari',
    'McLaren': 'card-mclaren',
    'BWT Alpine': 'card-alpine',
    'Alpine': 'card-alpine',
    'Aston Martin': 'card-aston-martin',
    'Aston Martin Aramco': 'card-aston-martin',
    'MoneyGram Haas': 'card-haas',
    'Haas': 'card-haas',
    'Visa Cash App Racing Bulls': 'card-alphatauri',
    'AlphaTauri': 'card-alphatauri',
    'Alfa Romeo': 'card-alfa-romeo',
    'Williams': 'card-williams'
};


let f1Data = null;
let pilotosData = [];


document.addEventListener('DOMContentLoaded', async () => {

    await loadVehicles();
    

    const addVehicleBtn = document.getElementById('addVehicleBtn');
    const addVehicleModal = new bootstrap.Modal(document.getElementById('addVehicleModal'));
    
    addVehicleBtn.addEventListener('click', () => {

        loadPilotosCheckboxes();
        addVehicleModal.show();
    });
    

    const saveVehicleBtn = document.getElementById('saveVehicleBtn');
    saveVehicleBtn.addEventListener('click', saveVehicle);
});

async function fetchF1Data() {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log('API Data:', data);
        return data[0]; 
    } catch (error) {
        console.error('Error fetching data:', error);
        return null;
    }
}

function getPilotsByIds(pilotos, pilotIds) {
    return pilotos.filter(pilot => pilotIds.includes(pilot.id));
}

function createPerformanceContent(rendimiento) {
    return `
        <div class="performance-content active" id="normal-performance">
            <div class="condition-group">
                <div class="condition-title">🌞 Condiciones Secas</div>
                <div class="spec-item">
                    <span class="spec-label">Velocidad promedio:</span>
                    <span class="spec-value">${rendimiento.conduccion_normal.velocidad_promedio_kmh} km/h</span>
                </div>
                <div class="spec-item">
                    <span class="spec-label">Consumo combustible:</span>
                    <span class="spec-value">${rendimiento.conduccion_normal.consumo_combustible.seco} L/lap</span>
                </div>
                <div class="spec-item">
                    <span class="spec-label">Desgaste neumáticos:</span>
                    <span class="spec-value">${rendimiento.conduccion_normal.desgaste_neumaticos.seco}%/lap</span>
                </div>
            </div>
            <div class="condition-group">
                <div class="condition-title">🌧️ Condiciones Lluviosas</div>
                <div class="spec-item">
                    <span class="spec-label">Consumo combustible:</span>
                    <span class="spec-value">${rendimiento.conduccion_normal.consumo_combustible.lluvioso} L/lap</span>
                </div>
                <div class="spec-item">
                    <span class="spec-label">Desgaste neumáticos:</span>
                    <span class="spec-value">${rendimiento.conduccion_normal.desgaste_neumaticos.lluvioso}%/lap</span>
                </div>
            </div>
            <div class="condition-group">
                <div class="condition-title">⚡ Condiciones Extremas</div>
                <div class="spec-item">
                    <span class="spec-label">Consumo combustible:</span>
                    <span class="spec-value">${rendimiento.conduccion_normal.consumo_combustible.extremo} L/lap</span>
                </div>
                <div class="spec-item">
                    <span class="spec-label">Desgaste neumáticos:</span>
                    <span class="spec-value">${rendimiento.conduccion_normal.desgaste_neumaticos.extremo}%/lap</span>
                </div>
            </div>
        </div>

        <div class="performance-content" id="aggressive-performance">
            <div class="condition-group">
                <div class="condition-title">🌞 Condiciones Secas</div>
                <div class="spec-item">
                    <span class="spec-label">Velocidad promedio:</span>
                    <span class="spec-value">${rendimiento.conduccion_agresiva.velocidad_promedio_kmh} km/h</span>
                </div>
                <div class="spec-item">
                    <span class="spec-label">Consumo combustible:</span>
                    <span class="spec-value">${rendimiento.conduccion_agresiva.consumo_combustible.seco} L/lap</span>
                </div>
                <div class="spec-item">
                    <span class="spec-label">Desgaste neumáticos:</span>
                    <span class="spec-value">${rendimiento.conduccion_agresiva.desgaste_neumaticos.seco}%/lap</span>
                </div>
            </div>
            <div class="condition-group">
                <div class="condition-title">🌧️ Condiciones Lluviosas</div>
                <div class="spec-item">
                    <span class="spec-label">Consumo combustible:</span>
                    <span class="spec-value">${rendimiento.conduccion_agresiva.consumo_combustible.lluvioso} L/lap</span>
                </div>
                <div class="spec-item">
                    <span class="spec-label">Desgaste neumáticos:</span>
                    <span class="spec-value">${rendimiento.conduccion_agresiva.desgaste_neumaticos.lluvioso}%/lap</span>
                </div>
            </div>
            <div class="condition-group">
                <div class="condition-title">⚡ Condiciones Extremas</div>
                <div class="spec-item">
                    <span class="spec-label">Consumo combustible:</span>
                    <span class="spec-value">${rendimiento.conduccion_agresiva.consumo_combustible.extremo} L/lap</span>
                </div>
                <div class="spec-item">
                    <span class="spec-label">Desgaste neumáticos:</span>
                    <span class="spec-value">${rendimiento.conduccion_agresiva.desgaste_neumaticos.extremo}%/lap</span>
                </div>
            </div>
        </div>

        <div class="performance-content" id="eco-performance">
            <div class="condition-group">
                <div class="condition-title">🌞 Condiciones Secas</div>
                <div class="spec-item">
                    <span class="spec-label">Velocidad promedio:</span>
                    <span class="spec-value">${rendimiento.ahorro_combustible.velocidad_promedio_kmh} km/h</span>
                </div>
                <div class="spec-item">
                    <span class="spec-label">Consumo combustible:</span>
                    <span class="spec-value">${rendimiento.ahorro_combustible.consumo_combustible.seco} L/lap</span>
                </div>
                <div class="spec-item">
                    <span class="spec-label">Desgaste neumáticos:</span>
                    <span class="spec-value">${rendimiento.ahorro_combustible.desgaste_neumaticos.seco}%/lap</span>
                </div>
            </div>
            <div class="condition-group">
                <div class="condition-title">🌧️ Condiciones Lluviosas</div>
                <div class="spec-item">
                    <span class="spec-label">Consumo combustible:</span>
                    <span class="spec-value">${rendimiento.ahorro_combustible.consumo_combustible.lluvioso} L/lap</span>
                </div>
                <div class="spec-item">
                    <span class="spec-label">Desgaste neumáticos:</span>
                    <span class="spec-value">${rendimiento.ahorro_combustible.desgaste_neumaticos.lluvioso}%/lap</span>
                </div>
            </div>
            <div class="condition-group">
                <div class="condition-title">⚡ Condiciones Extremas</div>
                <div class="spec-item">
                    <span class="spec-label">Consumo combustible:</span>
                    <span class="spec-value">${rendimiento.ahorro_combustible.consumo_combustible.extremo} L/lap</span>
                </div>
                <div class="spec-item">
                    <span class="spec-label">Desgaste neumáticos:</span>
                    <span class="spec-value">${rendimiento.ahorro_combustible.desgaste_neumaticos.extremo}%/lap</span>
                </div>
            </div>
        </div>
    `;
}

function createVehicleCard(vehicle, pilotos) {
    const vehiclePilots = getPilotsByIds(pilotos, vehicle.pilotos);
    const cardClass = teamClasses[vehicle.equipo] || '';

    return `
        <div class="vehicle-card ${cardClass}">
            <div class="vehicle-card-header">
                <div>
                    <h3 class="team-name">${vehicle.equipo}</h3>
                    <div class="vehicle-model">${vehicle.modelo}</div>
                </div>
            </div>
            
            <img src="${vehicle.imagen}" alt="${vehicle.modelo}" class="car-image" 
                    onerror="this.src='/api/placeholder/280/150'">
            
            <div class="vehicle-card-body">
                <div class="specs-section">
                    <div class="section-title">Especificaciones Técnicas</div>
                    <div class="spec-item">
                        <span class="spec-label">Motor:</span>
                        <span class="spec-value">${vehicle.motor}</span>
                    </div>
                    <div class="spec-item">
                        <span class="spec-label">Velocidad Máxima:</span>
                        <span class="spec-value">${vehicle.velocidad_max_kmh} km/h</span>
                    </div>
                    <div class="spec-item">
                        <span class="spec-label">Aceleración 0-100:</span>
                        <span class="spec-value">${vehicle.aceleracion_0_100}s</span>
                    </div>
                </div>

                <div class="specs-section">
                    <div class="section-title">Rendimiento por Modo</div>
                    <div class="performance-tabs">
                        <button class="performance-tab active" onclick="showPerformance('${vehicle.equipo}', 'normal')">Normal</button>
                        <button class="performance-tab" onclick="showPerformance('${vehicle.equipo}', 'aggressive')">Agresivo</button>
                        <button class="performance-tab" onclick="showPerformance('${vehicle.equipo}', 'eco')">Eco</button>
                    </div>
                    <div id="performance-${vehicle.equipo.replace(/\s+/g, '-')}">
                        ${createPerformanceContent(vehicle.rendimiento)}
                    </div>
                </div>

                <div class="pilots-section">
                    <div class="section-title">Pilotos Asignados</div>
                    ${vehiclePilots.map(pilot => `
                        <div class="pilot-item">
                            <span class="pilot-name">• ${pilot.nombre}</span>
                        </div>
                    `).join('')}
                </div>
            </div>
        </div>
    `;
}

function showPerformance(teamName, mode) {
    const containerId = `performance-${teamName.replace(/\s+/g, '-')}`;
    const container = document.getElementById(containerId);
    

    const tabs = container.parentElement.querySelectorAll('.performance-tab');
    tabs.forEach(tab => tab.classList.remove('active'));
    event.target.classList.add('active');
    

    const contents = container.querySelectorAll('.performance-content');
    contents.forEach(content => content.classList.remove('active'));
    
    const targetContent = container.querySelector(`#${mode}-performance`);
    if (targetContent) {
        targetContent.classList.add('active');
    }
}

async function loadVehicles() {
    const loadingElement = document.getElementById('loading');
    const containerElement = document.getElementById('vehicles-container');
    
    try {
        f1Data = await fetchF1Data();
        
        if (!f1Data || !f1Data.vehiculos) {
            throw new Error('No se pudieron cargar los datos de vehículos');
        }

        const { vehiculos, pilotos } = f1Data;
        pilotosData = pilotos; 
        
        
        const vehiclesHTML = vehiculos.map(vehicle => 
            createVehicleCard(vehicle, pilotos)
        ).join('');
        
        containerElement.innerHTML = vehiclesHTML;
        

        loadingElement.style.display = 'none';
        containerElement.style.display = 'grid';
        
    } catch (error) {
        console.error('Error loading vehicles:', error);
        loadingElement.innerHTML = `
            <div class="text-center">
                <div class="text-danger mb-3">
                    <i class="fas fa-exclamation-triangle fa-3x"></i>
                </div>
                <h3>Error al cargar los vehículos</h3>
                <p>${error.message}</p>
                <button class="btn btn-light" onclick="loadVehicles()">Intentar de nuevo</button>
            </div>
        `;
    }
}


function loadPilotosCheckboxes() {
    const pilotosContainer = document.getElementById('pilotosContainer');
    
    if (!pilotosData || pilotosData.length === 0) {
        pilotosContainer.innerHTML = '<p class="text-muted">No hay pilotos disponibles</p>';
        return;
    }
    

    const checkboxesHTML = pilotosData.map(piloto => `
        <div class="form-check mb-2">
            <input class="form-check-input" type="checkbox" name="pilotos" id="piloto-${piloto.id}" value="${piloto.id}">
            <label class="form-check-label" for="piloto-${piloto.id}">
                ${piloto.nombre} (${piloto.nacionalidad})
            </label>
        </div>
    `).join('');
    
    pilotosContainer.innerHTML = checkboxesHTML;
}


function showNotification(title, message, type = 'success') {
    const toastTitle = document.getElementById('toastTitle');
    const toastMessage = document.getElementById('toastMessage');
    const toastElement = document.getElementById('notificationToast');
    
    toastTitle.textContent = title;
    toastMessage.textContent = message;
    

    toastElement.className = 'toast';
    if (type === 'error') {
        toastElement.classList.add('bg-danger', 'text-white');
    } else if (type === 'success') {
        toastElement.classList.add('bg-success', 'text-white');
    } else if (type === 'warning') {
        toastElement.classList.add('bg-warning');
    }
    
    const toast = new bootstrap.Toast(toastElement);
    toast.show();
}

function getFormValues() {
    const equipo = document.getElementById('equipo').value;
    const modelo = document.getElementById('modelo').value;
    const motor = document.getElementById('motor').value;
    const imagen = document.getElementById('imagen').value || `/api/placeholder/280/150`;
    const velocidad_max_kmh = parseInt(document.getElementById('velocidad_max_kmh').value);
    const aceleracion_0_100 = parseFloat(document.getElementById('aceleracion_0_100').value);
    

    const pilotosCheckboxes = document.querySelectorAll('input[name="pilotos"]:checked');
    const pilotos = Array.from(pilotosCheckboxes).map(cb => cb.value);
    
  
    const normal_velocidad = parseInt(document.getElementById('normal_velocidad').value);
    const normal_consumo_seco = parseFloat(document.getElementById('normal_consumo_seco').value);
    const normal_consumo_lluvioso = parseFloat(document.getElementById('normal_consumo_lluvioso').value);
    const normal_consumo_extremo = parseFloat(document.getElementById('normal_consumo_extremo').value);
    const normal_desgaste_seco = parseFloat(document.getElementById('normal_desgaste_seco').value);
    const normal_desgaste_lluvioso = parseFloat(document.getElementById('normal_desgaste_lluvioso').value);
    const normal_desgaste_extremo = parseFloat(document.getElementById('normal_desgaste_extremo').value);
    

    const agresivo_velocidad = parseInt(document.getElementById('agresivo_velocidad').value);
    const agresivo_consumo_seco = parseFloat(document.getElementById('agresivo_consumo_seco').value);
    const agresivo_consumo_lluvioso = parseFloat(document.getElementById('agresivo_consumo_lluvioso').value);
    const agresivo_consumo_extremo = parseFloat(document.getElementById('agresivo_consumo_extremo').value);
    const agresivo_desgaste_seco = parseFloat(document.getElementById('agresivo_desgaste_seco').value);
    const agresivo_desgaste_lluvioso = parseFloat(document.getElementById('agresivo_desgaste_lluvioso').value);
    const agresivo_desgaste_extremo = parseFloat(document.getElementById('agresivo_desgaste_extremo').value);
    
    const eco_velocidad = parseInt(document.getElementById('eco_velocidad').value);
    const eco_consumo_seco = parseFloat(document.getElementById('eco_consumo_seco').value);
    const eco_consumo_lluvioso = parseFloat(document.getElementById('eco_consumo_lluvioso').value);
    const eco_consumo_extremo = parseFloat(document.getElementById('eco_consumo_extremo').value);
    const eco_desgaste_seco = parseFloat(document.getElementById('eco_desgaste_seco').value);
    const eco_desgaste_lluvioso = parseFloat(document.getElementById('eco_desgaste_lluvioso').value);
    const eco_desgaste_extremo = parseFloat(document.getElementById('eco_desgaste_extremo').value);
    

    const vehicleData = {
        equipo,
        modelo,
        motor,
        imagen,
        velocidad_max_kmh,
        aceleracion_0_100,
        pilotos,
        rendimiento: {
            conduccion_normal: {
                velocidad_promedio_kmh: normal_velocidad,
                consumo_combustible: {
                    seco: normal_consumo_seco,
                    lluvioso: normal_consumo_lluvioso,
                    extremo: normal_consumo_extremo
                },
                desgaste_neumaticos: {
                    seco: normal_desgaste_seco,
                    lluvioso: normal_desgaste_lluvioso,
                    extremo: normal_desgaste_extremo
                }
            },
            conduccion_agresiva: {
                velocidad_promedio_kmh: agresivo_velocidad,
                consumo_combustible: {
                    seco: agresivo_consumo_seco,
                    lluvioso: agresivo_consumo_lluvioso,
                    extremo: agresivo_consumo_extremo
                },
                desgaste_neumaticos: {
                    seco: agresivo_desgaste_seco,
                    lluvioso: agresivo_desgaste_lluvioso,
                    extremo: agresivo_desgaste_extremo
                }
            },
            ahorro_combustible: {
                velocidad_promedio_kmh: eco_velocidad,
                consumo_combustible: {
                    seco: eco_consumo_seco,
                    lluvioso: eco_consumo_lluvioso,
                    extremo: eco_consumo_extremo
                },
                desgaste_neumaticos: {
                    seco: eco_desgaste_seco,
                    lluvioso: eco_desgaste_lluvioso,
                    extremo: eco_desgaste_extremo
                }
            }
        }
    };
    
    return vehicleData;
}

function validateVehicleForm() {
    const requiredFields = [
        'equipo', 'modelo', 'motor', 'velocidad_max_kmh', 'aceleracion_0_100',
        'normal_velocidad', 'normal_consumo_seco', 'normal_consumo_lluvioso', 'normal_consumo_extremo',
        'normal_desgaste_seco', 'normal_desgaste_lluvioso', 'normal_desgaste_extremo',
        'agresivo_velocidad', 'agresivo_consumo_seco', 'agresivo_consumo_lluvioso', 'agresivo_consumo_extremo',
        'agresivo_desgaste_seco', 'agresivo_desgaste_lluvioso', 'agresivo_desgaste_extremo',
        'eco_velocidad', 'eco_consumo_seco', 'eco_consumo_lluvioso', 'eco_consumo_extremo',
        'eco_desgaste_seco', 'eco_desgaste_lluvioso', 'eco_desgaste_extremo'
    ];
    
    for (const fieldId of requiredFields) {
        const field = document.getElementById(fieldId);
        if (!field.value) {
            showNotification('Error de validación', `El campo ${fieldId.replace('_', ' ')} es obligatorio`, 'error');
            field.focus();
            return false;
        }
    }
    
    const pilotosCheckboxes = document.querySelectorAll('input[name="pilotos"]:checked');
    if (pilotosCheckboxes.length === 0) {
        showNotification('Error de validación', 'Debe seleccionar al menos un piloto', 'error');
        return false;
    }
    
    return true;
}

async function saveVehicle() {
    if (!validateVehicleForm()) {
        return;
    }
    
    const saveButton = document.getElementById('saveVehicleBtn');
    const originalText = saveButton.innerHTML;
    saveButton.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Guardando...';
    saveButton.disabled = true;
    
    try {
        const vehicleData = getFormValues();
        
        const updatedData = JSON.parse(JSON.stringify(f1Data));
        
        updatedData.vehiculos.push(vehicleData);
        
        const response = await fetch(API_URL + '/1', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedData)
        });
        
        if (!response.ok) {
            throw new Error(`Error al guardar: ${response.status}`);
        }
        

        const addVehicleModal = bootstrap.Modal.getInstance(document.getElementById('addVehicleModal'));
        addVehicleModal.hide();
        

        document.getElementById('addVehicleForm').reset();
        
 
        showNotification('Vehículo añadido', `El vehículo ${vehicleData.modelo} ha sido añadido correctamente`);
        
        await loadVehicles();
        
    } catch (error) {
        console.error('Error al guardar el vehículo:', error);
        showNotification('Error', 'No se pudo guardar el vehículo: ' + error.message, 'error');
    } finally {
        saveButton.innerHTML = originalText;
        saveButton.disabled = false;
    }
}
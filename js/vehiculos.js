        // API URL
        const API_URL = 'https://6818a31e5a4b07b9d1d01ad4.mockapi.io/api/v1/Proyecto';

        // Team CSS class mapping
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

        async function fetchF1Data() {
            try {
                const response = await fetch(API_URL);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                console.log('API Data:', data);
                return data[0]; // Get the first (and only) object from the array
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
            
            // Update tabs
            const tabs = container.parentElement.querySelectorAll('.performance-tab');
            tabs.forEach(tab => tab.classList.remove('active'));
            event.target.classList.add('active');
            
            // Update content
            const contents = container.querySelectorAll('.performance-content');
            contents.forEach(content => content.classList.remove('active'));
            
            const targetContent = container.querySelector(`#${mode}-performance`);
            if (targetContent) {
                targetContent.classList.add('active');
            }
        }

        function showVehicleDetails(vehicleModel) {
            alert(`Mostrando más detalles del ${vehicleModel}`);
            // Aquí puedes implementar un modal o redirección con más detalles
        }

        async function loadVehicles() {
            const loadingElement = document.getElementById('loading');
            const containerElement = document.getElementById('vehicles-container');
            
            try {
                const data = await fetchF1Data();
                
                if (!data || !data.vehiculos) {
                    throw new Error('No se pudieron cargar los datos de vehículos');
                }

                const { vehiculos, pilotos } = data;
                
                // Create vehicle cards
                const vehiclesHTML = vehiculos.map(vehicle => 
                    createVehicleCard(vehicle, pilotos)
                ).join('');
                
                containerElement.innerHTML = vehiclesHTML;
                
                // Hide loading and show content
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

        // Load vehicles when page loads
        document.addEventListener('DOMContentLoaded', loadVehicles);
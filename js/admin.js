  class F1Manager {
            constructor() {
                this.apiUrl = 'https://6818a31e5a4b07b9d1d01ad4.mockapi.io/api/v1/Proyecto';
                this.currentSection = 'pilotos';
                this.data = null;
                this.currentEditItem = null;
                this.init();
            }

            async init() {
                await this.loadData();
                this.setupEventListeners();
                this.showSection('pilotos');
            }

            async loadData() {
                try {
                    const response = await fetch(this.apiUrl);
                    const result = await response.json();
                    this.data = result[0]; // Los datos están en el primer elemento del array
                    console.log('Datos cargados:', this.data);
                } catch (error) {
                    console.error('Error cargando datos:', error);
                    document.getElementById('content-area').innerHTML = 
                        '<div class="loading">Error al cargar los datos</div>';
                }
            }

            setupEventListeners() {
                // Navegación
                document.querySelectorAll('.nav-button').forEach(button => {
                    button.addEventListener('click', (e) => {
                        const section = e.target.dataset.section;
                        this.showSection(section);
                    });
                });

                // Modal
                const modal = document.getElementById('editModal');
                const closeBtn = document.querySelector('.close');
                const cancelBtn = document.querySelector('.btn-cancel');

                closeBtn.addEventListener('click', () => this.closeModal());
                cancelBtn.addEventListener('click', () => this.closeModal());
                
                window.addEventListener('click', (e) => {
                    if (e.target === modal) this.closeModal();
                });

                // Formulario
                document.getElementById('editForm').addEventListener('submit', (e) => {
                    e.preventDefault();
                    this.saveItem();
                });
            }

            showSection(section) {
                // Actualizar navegación
                document.querySelectorAll('.nav-button').forEach(btn => {
                    btn.classList.remove('active');
                });
                document.querySelector(`[data-section="${section}"]`).classList.add('active');

                this.currentSection = section;
                this.renderSection();
            }

            renderSection() {
                const contentArea = document.getElementById('content-area');
                
                if (!this.data || !this.data[this.currentSection]) {
                    contentArea.innerHTML = '<div class="loading">No hay datos disponibles</div>';
                    return;
                }

                const items = this.data[this.currentSection];
                const sectionTitle = this.currentSection.charAt(0).toUpperCase() + 
                                   this.currentSection.slice(1);

                let html = `<h2>${sectionTitle}</h2><div class="items-grid">`;

                items.forEach((item, index) => {
                    html += this.renderItem(item, index);
                });

                html += '</div>';
                contentArea.innerHTML = html;

                // Agregar event listeners a los botones
                this.setupItemButtons();
            }

            renderItem(item, index) {
                switch(this.currentSection) {
                    case 'pilotos':
                        return this.renderPiloto(item, index);
                    case 'circuitos':
                        return this.renderCircuito(item, index);
                    case 'vehiculos':
                        return this.renderVehiculo(item, index);
                    default:
                        return '';
                }
            }

            renderPiloto(piloto, index) {
                return `
                    <div class="item-card" data-index="${index}">
                        <h3>${piloto.nombre}</h3>
                        <div class="item-info">
                            <p><strong>Equipo:</strong> ${piloto.equipo}</p>
                            <p><strong>Rol:</strong> ${piloto.rol}</p>
                            <p><strong>ID:</strong> ${piloto.id}</p>
                        </div>
                        <div class="action-buttons">
                            <button class="btn-edit" data-action="edit" data-index="${index}">Editar</button>
                            <button class="btn-delete" data-action="delete" data-index="${index}">Eliminar</button>
                        </div>
                    </div>
                `;
            }

            renderCircuito(circuito, index) {
                const ganadorReciente = circuito.ganadores && circuito.ganadores.length > 0 
                    ? circuito.ganadores[circuito.ganadores.length - 1] 
                    : null;
                
                return `
                    <div class="item-card" data-index="${index}">
                        <h3>${circuito.nombre}</h3>
                        <div class="item-info">
                            <p><strong>País:</strong> ${circuito.pais}</p>
                            <p><strong>Longitud:</strong> ${circuito.longitud_km} km</p>
                            <p><strong>Vueltas:</strong> ${circuito.vueltas}</p>
                            ${ganadorReciente ? `<p><strong>Último ganador:</strong> ${ganadorReciente.piloto} (${ganadorReciente.temporada})</p>` : ''}
                            ${circuito.record_vuelta ? `<p><strong>Récord:</strong> ${circuito.record_vuelta.tiempo} - ${circuito.record_vuelta.piloto}</p>` : ''}
                        </div>
                        <div class="action-buttons">
                            <button class="btn-edit" data-action="edit" data-index="${index}">Editar</button>
                            <button class="btn-delete" data-action="delete" data-index="${index}">Eliminar</button>
                        </div>
                    </div>
                `;
            }

            renderVehiculo(vehiculo, index) {
                return `
                    <div class="item-card" data-index="${index}">
                        <h3>${vehiculo.modelo} - ${vehiculo.equipo}</h3>
                        <div class="item-info">
                            <p><strong>Motor:</strong> ${vehiculo.motor}</p>
                            <p><strong>Velocidad máx:</strong> ${vehiculo.velocidad_max_kmh} km/h</p>
                            <p><strong>0-100:</strong> ${vehiculo.aceleracion_0_100}s</p>
                            <p><strong>Pilotos ID:</strong> ${vehiculo.pilotos ? vehiculo.pilotos.join(', ') : 'N/A'}</p>
                        </div>
                        <div class="action-buttons">
                            <button class="btn-edit" data-action="edit" data-index="${index}">Editar</button>
                            <button class="btn-delete" data-action="delete" data-index="${index}">Eliminar</button>
                        </div>
                    </div>
                `;
            }

            setupItemButtons() {
                document.querySelectorAll('[data-action]').forEach(button => {
                    button.addEventListener('click', (e) => {
                        const action = e.target.dataset.action;
                        const index = parseInt(e.target.dataset.index);
                        
                        if (action === 'edit') {
                            this.editItem(index);
                        } else if (action === 'delete') {
                            this.deleteItem(index);
                        }
                    });
                });
            }

            editItem(index) {
                const item = this.data[this.currentSection][index];
                this.currentEditItem = { item, index };
                this.openEditModal(item);
            }

            openEditModal(item) {
                const modal = document.getElementById('editModal');
                const modalTitle = document.getElementById('modalTitle');
                const formFields = document.getElementById('formFields');

                modalTitle.textContent = `Editar ${this.currentSection.slice(0, -1)}`;
                formFields.innerHTML = this.generateFormFields(item);
                modal.style.display = 'block';
            }

            generateFormFields(item) {
                let html = '';
                
                for (const [key, value] of Object.entries(item)) {
                    if (key === 'imagen') continue; // Skip images
                    
                    if (typeof value === 'object' && value !== null) {
                        // Skip complex objects for now
                        continue;
                    }
                    
                    const fieldName = key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
                    
                    html += `
                        <div class="form-group">
                            <label for="${key}">${fieldName}:</label>
                            <input type="text" id="${key}" name="${key}" value="${value || ''}" />
                        </div>
                    `;
                }
                
                return html;
            }

            async saveItem() {
                if (!this.currentEditItem) return;

                const formData = new FormData(document.getElementById('editForm'));
                const updatedItem = { ...this.currentEditItem.item };

                // Update item with form data
                for (const [key, value] of formData.entries()) {
                    if (key === 'id') {
                        updatedItem[key] = parseInt(value) || value;
                    } else {
                        updatedItem[key] = value;
                    }
                }

                try {
                    // Update local data
                    this.data[this.currentSection][this.currentEditItem.index] = updatedItem;
                    
                    // Update API (you would need to implement the PUT request here)
                    // await this.updateItemInAPI(updatedItem);
                    
                    this.closeModal();
                    this.renderSection();
                    
                    alert('Elemento actualizado correctamente');
                } catch (error) {
                    console.error('Error actualizando elemento:', error);
                    alert('Error al actualizar el elemento');
                }
            }

            async deleteItem(index) {
                if (!confirm('¿Estás seguro de que quieres eliminar este elemento?')) {
                    return;
                }

                try {
                    // Remove from local data
                    this.data[this.currentSection].splice(index, 1);
                    
                    // Delete from API (you would need to implement the DELETE request here)
                    // await this.deleteItemFromAPI(item.id);
                    
                    this.renderSection();
                    alert('Elemento eliminado correctamente');
                } catch (error) {
                    console.error('Error eliminando elemento:', error);
                    alert('Error al eliminar el elemento');
                }
            }

            closeModal() {
                document.getElementById('editModal').style.display = 'none';
                this.currentEditItem = null;
            }

            // Métodos para API calls reales (implementar según tu backend)
            async updateItemInAPI(item) {
                // Implementar PUT request a tu API
                // const response = await fetch(`${this.apiUrl}/${item.id}`, {
                //     method: 'PUT',
                //     headers: { 'Content-Type': 'application/json' },
                //     body: JSON.stringify(item)
                // });
                // return response.json();
            }

            async deleteItemFromAPI(id) {
                // Implementar DELETE request a tu API
                // const response = await fetch(`${this.apiUrl}/${id}`, {
                //     method: 'DELETE'
                // });
                // return response.json();
            }
        }

        // Inicializar la aplicación
        new F1Manager();
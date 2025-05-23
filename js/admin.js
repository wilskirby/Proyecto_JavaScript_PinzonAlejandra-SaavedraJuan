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
            this.data = (await response.json())[0];
        } catch (error) {
            console.error('Error:', error);
            document.getElementById('content-area').innerHTML = '<div class="loading">Error al cargar los datos</div>';
        }
    }

    setupEventListeners() {
        // Navegación
        document.querySelectorAll('.nav-button').forEach(btn => 
            btn.addEventListener('click', e => this.showSection(e.target.dataset.section))
        );

        // Modal
        const modal = document.getElementById('editModal');
        ['.close', '.btn-cancel'].forEach(sel => 
            document.querySelector(sel).addEventListener('click', () => this.closeModal())
        );
        
        window.addEventListener('click', e => e.target === modal && this.closeModal());
        document.getElementById('editForm').addEventListener('submit', e => {
            e.preventDefault();
            this.saveItem();
        });
    }

    showSection(section) {
        document.querySelectorAll('.nav-button').forEach(btn => btn.classList.remove('active'));
        document.querySelector(`[data-section="${section}"]`).classList.add('active');
        this.currentSection = section;
        this.renderSection();
    }

    renderSection() {
        const contentArea = document.getElementById('content-area');
        const items = this.data?.[this.currentSection];
        
        if (!items) {
            contentArea.innerHTML = '<div class="loading">No hay datos disponibles</div>';
            return;
        }

        const title = this.currentSection.charAt(0).toUpperCase() + this.currentSection.slice(1);
        contentArea.innerHTML = `
            <h2>${title}</h2>
            <div class="items-grid">
                ${items.map((item, i) => this.renderItem(item, i)).join('')}
            </div>
        `;
        this.setupItemButtons();
    }

    renderItem(item, index) {
        const templates = {
            pilotos: () => `
                <h3>${item.nombre}</h3>
                <div class="item-info">
                    <p><strong>Equipo:</strong> ${item.equipo}</p>
                    <p><strong>Rol:</strong> ${item.rol}</p>
                    <p><strong>ID:</strong> ${item.id}</p>
                </div>`,
            
            circuitos: () => {
                const ganador = item.ganadores?.slice(-1)[0];
                return `
                    <h3>${item.nombre}</h3>
                    <div class="item-info">
                        <p><strong>País:</strong> ${item.pais}</p>
                        <p><strong>Longitud:</strong> ${item.longitud_km} km</p>
                        <p><strong>Vueltas:</strong> ${item.vueltas}</p>
                        ${ganador ? `<p><strong>Último ganador:</strong> ${ganador.piloto} (${ganador.temporada})</p>` : ''}
                        ${item.record_vuelta ? `<p><strong>Récord:</strong> ${item.record_vuelta.tiempo} - ${item.record_vuelta.piloto}</p>` : ''}
                    </div>`;
            },
            
            vehiculos: () => `
                <h3>${item.modelo} - ${item.equipo}</h3>
                <div class="item-info">
                    <p><strong>Motor:</strong> ${item.motor}</p>
                    <p><strong>Velocidad máx:</strong> ${item.velocidad_max_kmh} km/h</p>
                    <p><strong>0-100:</strong> ${item.aceleracion_0_100}s</p>
                    <p><strong>Pilotos ID:</strong> ${item.pilotos?.join(', ') || 'N/A'}</p>
                </div>`
        };

        return `
            <div class="item-card" data-index="${index}">
                ${templates[this.currentSection]()}
                <div class="action-buttons">
                    <button class="btn-edit" data-action="edit" data-index="${index}">Editar</button>
                    <button class="btn-delete" data-action="delete" data-index="${index}">Eliminar</button>
                </div>
            </div>
        `;
    }

    setupItemButtons() {
        document.querySelectorAll('[data-action]').forEach(btn => {
            btn.addEventListener('click', e => {
                const { action, index } = e.target.dataset;
                action === 'edit' ? this.editItem(+index) : this.deleteItem(+index);
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
        document.getElementById('modalTitle').textContent = `Editar ${this.currentSection.slice(0, -1)}`;
        document.getElementById('formFields').innerHTML = this.generateFormFields(item);
        modal.style.display = 'block';
    }

    generateFormFields(item) {
        return Object.entries(item)
            .filter(([key, value]) => key !== 'imagen' && typeof value !== 'object')
            .map(([key, value]) => {
                const label = key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
                return `
                    <div class="form-group">
                        <label for="${key}">${label}:</label>
                        <input type="text" id="${key}" name="${key}" value="${value || ''}" />
                    </div>
                `;
            }).join('');
    }

    async saveItem() {
        if (!this.currentEditItem) return;

        const formData = new FormData(document.getElementById('editForm'));
        const updatedItem = { ...this.currentEditItem.item };

        for (const [key, value] of formData.entries()) {
            updatedItem[key] = key === 'id' ? (parseInt(value) || value) : value;
        }

        try {
            this.data[this.currentSection][this.currentEditItem.index] = updatedItem;
            this.closeModal();
            this.renderSection();
            alert('Elemento actualizado correctamente');
        } catch (error) {
            console.error('Error:', error);
            alert('Error al actualizar el elemento');
        }
    }

    async deleteItem(index) {
        if (!confirm('¿Estás seguro de que quieres eliminar este elemento?')) return;

        try {
            this.data[this.currentSection].splice(index, 1);
            this.renderSection();
            alert('Elemento eliminado correctamente');
        } catch (error) {
            console.error('Error:', error);
            alert('Error al eliminar el elemento');
        }
    }

    closeModal() {
        document.getElementById('editModal').style.display = 'none';
        this.currentEditItem = null;
    }
}

// Inicializar
new F1Manager();
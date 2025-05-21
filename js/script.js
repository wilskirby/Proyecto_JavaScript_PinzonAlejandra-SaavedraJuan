    // Mapeo de pilotos a URLs de imágenes reales de F1
    const driverImages = {
      'LECLERC': 'https://www.formula1.com/content/dam/fom-website/drivers/C/CHALEC01_Charles_Leclerc/chalec01.png.transform/2col/image.png',
      'VERSTAPPEN': 'https://www.formula1.com/content/dam/fom-website/drivers/M/MAXVER01_Max_Verstappen/maxver01.png.transform/2col/image.png',
      'NORRIS': 'https://www.formula1.com/content/dam/fom-website/drivers/L/LANNOR01_Lando_Norris/lannor01.png.transform/2col/image.png',
      'HAMILTON': 'https://www.formula1.com/content/dam/fom-website/drivers/L/LEWHAM01_Lewis_Hamilton/lewham01.png.transform/2col/image.png',
      'SAINZ': 'https://www.formula1.com/content/dam/fom-website/drivers/C/CARSAI01_Carlos_Sainz/carsai01.png.transform/2col/image.png',
      'PIASTRI': 'https://www.formula1.com/content/dam/fom-website/drivers/O/OSCPIA01_Oscar_Piastri/oscpia01.png.transform/2col/image.png',
      'RUSSELL': 'https://www.formula1.com/content/dam/fom-website/drivers/G/GEORUS01_George_Russell/georus01.png.transform/2col/image.png',
      'ALONSO': 'https://www.formula1.com/content/dam/fom-website/drivers/F/FERALO01_Fernando_Alonso/feralo01.png.transform/2col/image.png',
      'PEREZ': 'https://www.formula1.com/content/dam/fom-website/drivers/S/SERPER01_Sergio_Perez/serper01.png.transform/2col/image.png',
      'GASLY': 'https://www.formula1.com/content/dam/fom-website/drivers/P/PIEGAS01_Pierre_Gasly/piegas01.png.transform/2col/image.png',
      'OCON': 'https://www.formula1.com/content/dam/fom-website/drivers/E/ESTOCO01_Esteban_Ocon/estoco01.png.transform/2col/image.png',
      'STROLL': 'https://www.formula1.com/content/dam/fom-website/drivers/L/LANSTR01_Lance_Stroll/lanstr01.png.transform/2col/image.png',
      'RICCIARDO': 'https://www.formula1.com/content/dam/fom-website/drivers/D/DANRIC01_Daniel_Ricciardo/danric01.png.transform/2col/image.png',
      'TSUNODA': 'https://www.formula1.com/content/dam/fom-website/drivers/Y/YUKTSU01_Yuki_Tsunoda/yuktsu01.png.transform/2col/image.png',
      'ALBON': 'https://www.formula1.com/content/dam/fom-website/drivers/A/ALEALB01_Alexander_Albon/alealb01.png.transform/2col/image.png',
      'SARGEANT': 'https://www.formula1.com/content/dam/fom-website/drivers/L/LOGSAR01_Logan_Sargeant/logsar01.png.transform/2col/image.png',
      'BOTTAS': 'https://www.formula1.com/content/dam/fom-website/drivers/V/VALBOT01_Valtteri_Bottas/valbot01.png.transform/2col/image.png',
      'ZHOU': 'https://www.formula1.com/content/dam/fom-website/drivers/G/GUAZHO01_Guanyu_Zhou/guazho01.png.transform/2col/image.png',
      'MAGNUSSEN': 'https://www.formula1.com/content/dam/fom-website/drivers/K/KEVMAG01_Kevin_Magnussen/kevmag01.png.transform/2col/image.png',
      'HULKENBERG': 'https://www.formula1.com/content/dam/fom-website/drivers/N/NICHUL01_Nico_Hulkenberg/nichul01.png.transform/2col/image.png'
    };

    // Mapeo de equipos a colores
    const teamColors = {
      'Red Bull Racing': '#0600EF',
      'Ferrari': '#DC0000',
      'McLaren': '#FF8700',
      'Mercedes': '#00D2BE',
      'Alpine F1 Team': '#0090FF',
      'Aston Martin': '#006F62',
      'AlphaTauri': '#4E7C9B',
      'Williams': '#005AFF',
      'Alfa Romeo': '#900000',
      'Haas F1 Team': '#FFFFFF'
    };

    // Mapeo de equipos a logos
    const teamLogos = {
      'Ferrari': 'https://www.formula1.com/content/dam/fom-website/teams/2023/ferrari-logo.png.transform/2col/image.png',
      'Red Bull Racing': 'https://www.formula1.com/content/dam/fom-website/teams/2023/red-bull-racing-logo.png.transform/2col/image.png',
      'McLaren': 'https://www.formula1.com/content/dam/fom-website/teams/2023/mclaren-logo.png.transform/2col/image.png',
      'Mercedes': 'https://www.formula1.com/content/dam/fom-website/teams/2023/mercedes-logo.png.transform/2col/image.png',
      'Alpine F1 Team': 'https://www.formula1.com/content/dam/fom-website/teams/2023/alpine-logo.png.transform/2col/image.png',
      'Aston Martin': 'https://www.formula1.com/content/dam/fom-website/teams/2023/aston-martin-logo.png.transform/2col/image.png',
      'AlphaTauri': 'https://www.formula1.com/content/dam/fom-website/teams/2023/alphatauri-logo.png.transform/2col/image.png',
      'Williams': 'https://www.formula1.com/content/dam/fom-website/teams/2023/williams-logo.png.transform/2col/image.png',
      'Alfa Romeo': 'https://www.formula1.com/content/dam/fom-website/teams/2023/alfa-romeo-logo.png.transform/2col/image.png',
      'Haas F1 Team': 'https://www.formula1.com/content/dam/fom-website/teams/2023/haas-f1-team-logo.png.transform/2col/image.png'
    };

    // Lista de pilotos de respaldo (utilizados si la API falla o no tiene suficientes pilotos únicos)
    const fallbackDrivers = [
      { name: 'CHARLES', lastname: 'LECLERC', number: '16', team: 'Ferrari' },
      { name: 'MAX', lastname: 'VERSTAPPEN', number: '1', team: 'Red Bull Racing' },
      { name: 'LANDO', lastname: 'NORRIS', number: '4', team: 'McLaren' },
      { name: 'LEWIS', lastname: 'HAMILTON', number: '44', team: 'Mercedes' },
      { name: 'CARLOS', lastname: 'SAINZ', number: '55', team: 'Ferrari' },
      { name: 'OSCAR', lastname: 'PIASTRI', number: '81', team: 'McLaren' },
      { name: 'GEORGE', lastname: 'RUSSELL', number: '63', team: 'Mercedes' },
      { name: 'FERNANDO', lastname: 'ALONSO', number: '14', team: 'Aston Martin' },
      { name: 'SERGIO', lastname: 'PEREZ', number: '11', team: 'Red Bull Racing' },
      { name: 'PIERRE', lastname: 'GASLY', number: '10', team: 'Alpine F1 Team' },
      { name: 'ESTEBAN', lastname: 'OCON', number: '31', team: 'Alpine F1 Team' },
      { name: 'LANCE', lastname: 'STROLL', number: '18', team: 'Aston Martin' },
      { name: 'DANIEL', lastname: 'RICCIARDO', number: '3', team: 'AlphaTauri' },
      { name: 'YUKI', lastname: 'TSUNODA', number: '22', team: 'AlphaTauri' },
      { name: 'ALEX', lastname: 'ALBON', number: '23', team: 'Williams' },
      { name: 'LOGAN', lastname: 'SARGEANT', number: '2', team: 'Williams' },
      { name: 'VALTTERI', lastname: 'BOTTAS', number: '77', team: 'Alfa Romeo' },
      { name: 'ZHOU', lastname: 'GUANYU', number: '24', team: 'Alfa Romeo' },
      { name: 'KEVIN', lastname: 'MAGNUSSEN', number: '20', team: 'Haas F1 Team' },
      { name: 'NICO', lastname: 'HULKENBERG', number: '27', team: 'Haas F1 Team' }
    ];

    // Función para crear una tarjeta de piloto
    function createDriverCard(driver) {
      // Obtener el color del equipo o usar uno predeterminado
      const teamColor = teamColors[driver.team] || '#FF8700';
      
      // Obtener el logotipo del equipo o usar uno predeterminado
      const teamLogo = teamLogos[driver.team] || '/api/placeholder/160/96?text=F1+Team';
      
      // Obtener la imagen del piloto basada en su apellido o usar una imagen genérica
      let driverImage = driverImages[driver.lastname] || 'https://www.formula1.com/content/dam/fom-website/drivers/C/CHALEC01_Charles_Leclerc/chalec01.png.transform/2col/image.png';
      
      // Crear el elemento de tarjeta
      const card = document.createElement('div');
      card.className = 'card-f1';
      
      // Contenido HTML de la tarjeta
      card.innerHTML = `
        <div class="d-flex justify-content-between align-items-start">
          <div>
            <p class="text-secondary fs-4 fw-semibold mb-1">${driver.name}</p>
            <p class="text-dark display-5 fw-bold">${driver.lastname}</p>
            <span class="team-badge">${driver.team}</span>
          </div>
          <img src="${teamLogo}" alt="Logo ${driver.team}" style="height: 96px; object-fit: contain;">
        </div>
        <img src="${driverImage}" alt="${driver.name} ${driver.lastname}" class="driver-img">
        <div class="number-f1" style="color: ${teamColor};">${driver.number}</div>
      `;
      
      return card;
    }

    // Esperar a que se cargue la página
    document.addEventListener('DOMContentLoaded', function() {
      const cardsContainer = document.getElementById('cardsContainer');
      const loading = document.getElementById('loading');
      
      // Obtener datos de la API
      fetch('https://6818a31e5a4b07b9d1d01ad4.mockapi.io/api/v1/Proyecto')
        .then(response => {
          if (!response.ok) {
            throw new Error('Error al cargar los datos');
          }
          return response.json();
        })
        .then(data => {
          // Ocultar indicador de carga
          loading.style.display = 'none';
          
          // Procesamos los datos para eliminar duplicados
          const uniqueDrivers = processApiData(data);
          
          // Crear y mostrar tarjetas de pilotos
          displayDrivers(uniqueDrivers);
        })
        .catch(error => {
          console.error('Error:', error);
          loading.innerHTML = `Error al cargar datos: ${error.message}`;
          
          // Si hay error, usar los pilotos de respaldo
          loading.style.display = 'none';
          displayDrivers(fallbackDrivers);
        });
      
      // Función para procesar los datos de la API y eliminar duplicados
      function processApiData(data) {
        // Conjunto para almacenar números y apellidos ya vistos
        const seenNumbers = new Set();
        const seenLastnames = new Set();
        
        // Filtrar pilotos únicos
        const uniqueDrivers = [];
        
        for (const driver of data) {
          // Normalizar los datos del piloto
          const normalizedDriver = {
            name: driver.name ? driver.name.toUpperCase() : `PILOTO${uniqueDrivers.length + 1}`,
            lastname: driver.lastname ? driver.lastname.toUpperCase() : `APELLIDO${uniqueDrivers.length + 1}`,
            number: driver.number || (driver.id ? driver.id : (uniqueDrivers.length + 1).toString()),
            team: driver.team || 'Equipo F1'
          };
          
          // Verificar si el número o el apellido ya existen
          if (!seenNumbers.has(normalizedDriver.number) && !seenLastnames.has(normalizedDriver.lastname)) {
            seenNumbers.add(normalizedDriver.number);
            seenLastnames.add(normalizedDriver.lastname);
            uniqueDrivers.push(normalizedDriver);
            
            // Limitar a 20 pilotos
            if (uniqueDrivers.length >= 20) break;
          }
        }
        
        // Si no hay suficientes pilotos únicos, completar con pilotos de respaldo
        if (uniqueDrivers.length < 20) {
          for (const fallbackDriver of fallbackDrivers) {
            if (!seenNumbers.has(fallbackDriver.number) && !seenLastnames.has(fallbackDriver.lastname)) {
              seenNumbers.add(fallbackDriver.number);
              seenLastnames.add(fallbackDriver.lastname);
              uniqueDrivers.push(fallbackDriver);
              
              // Limitar a 20 pilotos
              if (uniqueDrivers.length >= 20) break;
            }
          }
        }
        
        return uniqueDrivers;
      }
      
      // Función para mostrar pilotos
      function displayDrivers(drivers) {
        drivers.forEach(driver => {
          const card = createDriverCard(driver);
          cardsContainer.appendChild(card);
        });
      }
    });
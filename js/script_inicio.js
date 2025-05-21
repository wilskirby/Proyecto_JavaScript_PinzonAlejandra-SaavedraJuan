document.addEventListener('DOMContentLoaded', function() {
    const slides = document.querySelectorAll('.carousel-slide');
    const titleText = document.getElementById('title-text');
    const prevButton = document.getElementById('prev-button');
    const nextButton = document.getElementById('next-button');
    const navigationModal = new bootstrap.Modal(document.getElementById('navigationModal'));
    const moduleTitle = document.getElementById('moduleTitle');
    const confirmButton = document.getElementById('confirmNavigation');
    
    let currentSlide = 0;
    let selectedModule = '';
    
    // Configuración de módulos y sus URLs
    const moduleRoutes = {
      'equipos-pilotos': '../index/pilotos.html',
      'circuitos-simulacion': '../index/circuitos.html',
      'resultados-estadisticas': '../index/vehiculos.html'
    };
    
    // Function to update slide visibility
    function showSlide(index) {
      slides.forEach(slide => {
        slide.classList.add('hidden');
      });
      
      slides[index].classList.remove('hidden');
      
      const titleParts = slides[index].dataset.title.split('&');
      if (titleParts.length > 1) {
        titleText.innerHTML = titleParts[0] + '<span class="d-block mt-2">& ' + titleParts[1] + '</span>';
      } else {
        titleText.textContent = titleParts[0];
      }
    }
    
    // Next slide function
    function nextSlide() {
      currentSlide = (currentSlide + 1) % slides.length;
      showSlide(currentSlide);
    }
    
    // Previous slide function
    function prevSlide() {
      currentSlide = (currentSlide - 1 + slides.length) % slides.length;
      showSlide(currentSlide);
    }
    
    // Handle slide click for navigation
    function handleSlideClick(event) {
      const slide = event.currentTarget;
      const module = slide.dataset.module;
      const title = slide.dataset.title;
      
      selectedModule = module;
      moduleTitle.textContent = title;
      navigationModal.show();
    }
    
    // Handle navigation confirmation
function handleNavigation() {
if (selectedModule && moduleRoutes[selectedModule]) {
  // Redirigir a la página correspondiente
  window.location.href = moduleRoutes[selectedModule];
}
navigationModal.hide();
}
    
    // Add event listeners
    nextButton.addEventListener('click', nextSlide);
    prevButton.addEventListener('click', prevSlide);
    confirmButton.addEventListener('click', handleNavigation);
    
    // Add click event listeners to all slides
    slides.forEach(slide => {
      slide.addEventListener('click', handleSlideClick);
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', function(event) {
      if (event.key === 'ArrowLeft') {
        prevSlide();
      } else if (event.key === 'ArrowRight') {
        nextSlide();
      } else if (event.key === 'Enter' || event.key === ' ') {
        const currentSlideElement = slides[currentSlide];
        handleSlideClick({ currentTarget: currentSlideElement });
      }
    });
    
    // Show initial slide
    showSlide(currentSlide);
    
    // Auto-hide modal after showing for demo purposes
    document.getElementById('navigationModal').addEventListener('shown.bs.modal', function() {
      setTimeout(() => {
        // Opcional: auto-hide después de 5 segundos para demo
        // navigationModal.hide();
      }, 5000);
    });
  });
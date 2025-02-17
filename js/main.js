document.addEventListener("DOMContentLoaded", function() {
  // Fetch the external SVG file from assets/circuit.svg
  fetch('assets/circuit.svg')
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.text();
    })
    .then(svgText => {
      const container = document.getElementById('circuit-container');
      container.innerHTML = svgText;
      
      // Find the injected SVG element
      const svgElement = container.querySelector('svg');
      if (svgElement) {
        // Assign an ID for Vivus targeting if one isn't already present
        if (!svgElement.id) {
          svgElement.setAttribute('id', 'circuit-animation');
        }
        // Make sure the SVG fills its container
        svgElement.setAttribute('width', '100%');
        svgElement.setAttribute('height', '100%');
      }

      // Initialize Vivus animation on the SVG
      new Vivus('circuit-animation', {
        type: 'delayed',   // Creates a sequential stroke-drawing effect
        duration: 200,     // Adjust duration for desired smoothness
        start: 'autostart'
      });
    })
    .catch(error => console.error('Error loading SVG:', error));
});
// Listen for scroll events to update the navbar's appearance
window.addEventListener('scroll', function() {
  const navbar = document.getElementById('navbar');
  if (window.scrollY > 50) {  // You can adjust the threshold as needed
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});


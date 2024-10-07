window.onload = function () {
  const canvas = document.getElementById('zenCanvas');
  const reset = document.getElementById('reset')
  const ctx = canvas.getContext('2d');

  // Set the canvas dimensions according to CSS size (viewport based)
  canvas.width = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;

  // Sand pattern settings
  let points = [];
  const numLines = 40;  // Number of zen lines
  const waveHeight = 5; // Amplitude of the waves
  let ripples = [];   // Array to store user-drawn ripple positions

  // Initialize sand pattern lines
  function initPoints() {
    points = [];
    for (let i = 0; i < numLines; i++) {
      points.push({
        y: (i + 1) * (canvas.height / numLines),
        offset: Math.random() * 100
      });
    }
  }

  // Draw static Zen garden lines
  function drawSandPattern() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); 
    ctx.fillStyle = '#ffffff';  
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.strokeStyle = '#c4b7a1';
    ctx.lineWidth = 2;

    points.forEach(point => {
      ctx.beginPath();
      ctx.moveTo(0, point.y);

      for (let x = 0; x < canvas.width; x++) {
        const y = point.y + Math.sin(x * 0.05 + point.offset) * waveHeight;
        ctx.lineTo(x, y);
      }
      ctx.stroke();
    });
  }

  // Function to draw permanent ripples
  function drawRipples() {
    ripples.forEach(ripple => {
      ctx.strokeStyle = '#b29b87';
      ctx.lineWidth = 2;
      
      // Draw 4 parallel lines 
      for (let i = -30; i <= 30; i += 20) { 
        ctx.beginPath();
        ctx.moveTo(ripple.x + i, ripple.y - 10);  
        ctx.lineTo(ripple.x + i, ripple.y + 10);  
        ctx.stroke();
      }
    });
  }

  // Animate the pattern when interacting with the garden (simulates drawing in sand)
  function animateSand() {
    points.forEach(point => {
      point.offset += 0.10;
    });

    drawSandPattern();  // Redraw the sand waves
    drawRipples();      // Redraw any existing ripples
  }

  // Mouse interaction: Add new ripple and draw it
  canvas.addEventListener('mousemove', function (e) {
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    ripples.push({ x, y });  // Add the ripple to the array
    animateSand(x, y);       // Redraw the pattern and the ripples
  });


  // Touch event (for mobile)
canvas.addEventListener('touchmove', function (e) {
    const rect = canvas.getBoundingClientRect();
    const touch = e.touches[0]; 
    const x = touch.clientX - rect.left;
    const y = touch.clientY - rect.top;

    ripples.push({ x, y });  
    animateSand(x, y);       

    // Prevent the default touch behavior like scrolling
    e.preventDefault();
});

  // Resize the canvas when the window is resized
  window.addEventListener('resize', () => {
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    initPoints(); // Reinitialize points after resizing
    animateSand(); // Redraw the pattern and the ripples
  });

  // Initial setup
  initPoints();
  animateSand();  // Initial drawing of the pattern

 reset.addEventListener('click', () => {
  ripples = []; // Clear the ripples array
  points = []; // Clear the points array
  initPoints(); // Reinitialize points
  animateSand(); // Redraw the pattern and the ripples

 }) 
  
};

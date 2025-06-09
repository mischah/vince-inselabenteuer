// This file is used to safely expose Node.js APIs to the renderer process
window.addEventListener('DOMContentLoaded', () => {
  console.log('Preload script loaded');
  
  // Debug information for Electron context
  console.log('Electron preload script executed');
  console.log('Document ready state:', document.readyState);
  
  // Add error handling
  window.addEventListener('error', (event) => {
    console.error('Global error caught:', event.error);
  });
  
  // Check if canvas exists and report its dimensions
  setTimeout(() => {
    const canvas = document.getElementById('gameCanvas');
    if (canvas) {
      console.log('Canvas found:', {
        width: canvas.width,
        height: canvas.height,
        style: canvas.getAttribute('style'),
        visibility: window.getComputedStyle(canvas).visibility,
        display: window.getComputedStyle(canvas).display
      });
    } else {
      console.error('Canvas element not found!');
    }
    
    // Check if loadPlayerTextures function is available
    if (typeof window.loadPlayerTextures === 'function') {
      console.log('loadPlayerTextures function found!');
    } else {
      console.log('loadPlayerTextures function NOT found!');
      
      // Try to debug why textures.js is not loading properly
      const scriptElements = document.querySelectorAll('script');
      console.log('Script elements found:', scriptElements.length);
      scriptElements.forEach((script, index) => {
        console.log(`Script ${index}:`, script.src || 'inline script');
      });
    }
    
    // Check other elements
    console.log('HUD elements:', document.querySelector('.hud') ? 'Found' : 'Not found');
  }, 1000);
});

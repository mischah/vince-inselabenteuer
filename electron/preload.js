// This file is used to safely expose Node.js APIs to the renderer process
try {
  // Nur im Electron-Kontext ausführen (nicht im Browser)
  const { contextBridge, ipcRenderer } = require('electron');
  const path = require('path');
  const fs = require('fs');
  
  // Lese die Version aus der package.json
  let appVersion = 'v?.?.?';
  try {
    const packagePath = path.join(__dirname, '..', 'package.json');
    const packageJson = JSON.parse(fs.readFileSync(packagePath, 'utf8'));
    appVersion = 'v' + packageJson.version;
    console.log('Successfully read version from package.json:', appVersion);
  } catch (err) {
    console.error('Fehler beim Lesen der package.json:', err);
  }
  
  // Exponiere Daten und Funktionen für den Renderer-Prozess
  contextBridge.exposeInMainWorld('electronAPI', {
    isElectron: true,
    appVersion: appVersion
  });
} catch (err) {
  // Stille Fehlerbehandlung für Browser-Kontext
  console.log('Not running in Electron context, skipping preload setup');
}

window.addEventListener('DOMContentLoaded', () => {
  console.log('Preload script loaded');
  
  // Setze die Versionsnummer in das dafür vorgesehene Element
  setTimeout(() => {
    const versionDisplay = document.getElementById('version-display');
    if (versionDisplay) {
      versionDisplay.textContent = appVersion;
      console.log('Version display element found and updated with:', appVersion);
    } else {
      console.error('Version display element not found!');
    }
  }, 500); // Kurz warten, um sicherzustellen, dass das DOM geladen ist
  
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

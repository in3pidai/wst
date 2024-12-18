import { showNotification } from '../utils/notifications';
import { getScreenshots } from './screenshotManager';
import { createRenderingForm } from './renderingForm';

export async function requestRendering() {
  const screenshots = getScreenshots();
  
  try {
    // Replace the main content with the rendering form
    const mainContent = document.querySelector('#previewContainer');
    mainContent.innerHTML = '';
    
    const form = createRenderingForm();
    mainContent.appendChild(form);
    
    // Hide the render button since we're now showing the form
    const renderButton = document.getElementById('renderButton');
    if (renderButton) {
      renderButton.style.display = 'none';
    }
  } catch (error) {
    showNotification('Failed to load rendering form', 'error');
    console.error('Rendering form creation failed:', error);
  }
}
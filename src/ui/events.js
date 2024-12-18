import { captureFullScreen, captureSelectedArea } from '../services/capture';
import { captureWindow } from '../services/windowCapture';
import { showNotification } from '../utils/notifications';
import { addScreenshot, canRequestRendering } from '../services/screenshotManager';
import { requestRendering } from '../services/renderingService';

export function initializeEventListeners() {
  const captureFullBtn = document.getElementById('captureFullBtn');
  const captureAreaBtn = document.getElementById('captureAreaBtn');
  const captureWindowBtn = document.getElementById('captureWindowBtn');
  const renderButton = document.getElementById('renderButton');

  async function handleCapture(captureFunction) {
    try {
      const imageData = await captureFunction();
      if (imageData && addScreenshot(imageData)) {
        updatePreview(imageData);
        updateRenderButton();
      }
    } catch (error) {
      console.error('Capture failed:', error);
    }
  }

  captureFullBtn.addEventListener('click', () => handleCapture(captureFullScreen));
  captureAreaBtn.addEventListener('click', () => handleCapture(captureSelectedArea));
  captureWindowBtn.addEventListener('click', () => handleCapture(captureWindow));

  renderButton.addEventListener('click', async () => {
    if (canRequestRendering()) {
      await requestRendering();
    } else {
      showNotification('Please capture between 1 and 3 screenshots', 'warning');
    }
  });
}

function updatePreview(imageData) {
  const previewContainer = document.getElementById('previewContainer');
  previewContainer.innerHTML = '';
  const img = document.createElement('img');
  img.src = imageData;
  img.className = 'max-w-full h-auto rounded-lg';
  previewContainer.appendChild(img);
}

function updateRenderButton() {
  const renderButton = document.getElementById('renderButton');
  renderButton.disabled = !canRequestRendering();
}
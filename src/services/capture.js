import html2canvas from 'html2canvas';
import { nanoid } from 'nanoid';
import { addToUploadQueue } from './uploadQueue';
import { showNotification } from '../utils/notifications';
import { createElement } from '../utils/dom';

export async function captureFullScreen() {
  try {
    const screenshot = await html2canvas(document.documentElement);
    const imageData = screenshot.toDataURL('image/png');
    
    addToUploadQueue({
      id: nanoid(),
      imageData,
      timestamp: new Date().toISOString()
    });

    return imageData;
  } catch (error) {
    showNotification('Error capturing screenshot', 'error');
    console.error('Screenshot capture failed:', error);
    throw error;
  }
}

export async function captureSelectedArea() {
  return new Promise((resolve, reject) => {
    const overlay = createElement('div', {
      className: 'selection-overlay'
    });

    let startX, startY, isDrawing = false;
    let selectionBox = null;

    overlay.addEventListener('mousedown', (e) => {
      isDrawing = true;
      startX = e.clientX;
      startY = e.clientY;

      selectionBox = createElement('div', {
        className: 'absolute border-2 border-blue-500 bg-blue-100 bg-opacity-20'
      });
      overlay.appendChild(selectionBox);
    });

    overlay.addEventListener('mousemove', (e) => {
      if (!isDrawing) return;

      const currentX = e.clientX;
      const currentY = e.clientY;

      const left = Math.min(startX, currentX);
      const top = Math.min(startY, currentY);
      const width = Math.abs(currentX - startX);
      const height = Math.abs(currentY - startY);

      Object.assign(selectionBox.style, {
        left: `${left}px`,
        top: `${top}px`,
        width: `${width}px`,
        height: `${height}px`
      });
    });

    overlay.addEventListener('mouseup', async (e) => {
      if (!isDrawing) return;
      isDrawing = false;

      const width = Math.abs(e.clientX - startX);
      const height = Math.abs(e.clientY - startY);
      const left = Math.min(startX, e.clientX);
      const top = Math.min(startY, e.clientY);

      overlay.remove();

      try {
        const screenshot = await html2canvas(document.documentElement, {
          x: left,
          y: top,
          width,
          height
        });

        const imageData = screenshot.toDataURL('image/png');
        
        addToUploadQueue({
          id: nanoid(),
          imageData,
          timestamp: new Date().toISOString()
        });

        resolve(imageData);
      } catch (error) {
        showNotification('Error capturing selected area', 'error');
        console.error('Area capture failed:', error);
        reject(error);
      }
    });

    document.body.appendChild(overlay);
  });
}
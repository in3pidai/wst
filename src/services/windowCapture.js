import { showNotification } from '../utils/notifications';
import { addToUploadQueue } from './uploadQueue';
import { nanoid } from 'nanoid';

export async function captureWindow() {
  try {
    // Request screen capture permission
    const stream = await navigator.mediaDevices.getDisplayMedia({
      video: {
        displaySurface: 'window',
      },
      preferCurrentTab: false
    });

    // Minimize the current window
    await minimizeWindow();

    // Create a video element to capture the stream
    const video = document.createElement('video');
    video.srcObject = stream;
    await video.play();

    // Create a canvas to capture the frame
    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    
    // Draw the video frame to canvas
    const ctx = canvas.getContext('2d');
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    // Stop all tracks
    stream.getTracks().forEach(track => track.stop());

    // Convert to image data
    const imageData = canvas.toDataURL('image/png');

    // Add to upload queue
    addToUploadQueue({
      id: nanoid(),
      imageData,
      timestamp: new Date().toISOString()
    });

    showNotification('Window captured successfully', 'success');
    return imageData;
  } catch (error) {
    if (error.name === 'NotAllowedError') {
      showNotification('Permission denied for window capture', 'error');
    } else {
      showNotification('Failed to capture window', 'error');
    }
    console.error('Window capture failed:', error);
    throw error;
  }
}

async function minimizeWindow() {
  if ('windowControlsOverlay' in navigator) {
    // For PWAs with window controls overlay
    try {
      await document.documentElement.requestFullscreen();
      document.exitFullscreen();
    } catch (error) {
      console.warn('Could not minimize window programmatically:', error);
    }
  }
  
  showNotification('Please minimize this window to capture another window', 'info', 8000);
  
  // Give user time to minimize the window
  await new Promise(resolve => setTimeout(resolve, 1000));
}
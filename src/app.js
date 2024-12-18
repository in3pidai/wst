import { setupUI } from './ui/setup';
import { initializeEventListeners } from './ui/events';
import { initializeUploadQueue } from './services/uploadQueue';

export function initializeApp() {
  // Create and inject the main UI
  const ui = setupUI();
  document.getElementById('app').appendChild(ui);

  // Initialize the upload queue service
  initializeUploadQueue();

  // Set up event listeners
  initializeEventListeners();
}
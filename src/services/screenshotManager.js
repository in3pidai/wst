import { showNotification } from '../utils/notifications';

const MAX_SCREENSHOTS = 3;
const MIN_SCREENSHOTS = 1;
let screenshots = [];

export function addScreenshot(imageData) {
  if (screenshots.length >= MAX_SCREENSHOTS) {
    showNotification(`Maximum limit of ${MAX_SCREENSHOTS} screenshots reached`, 'warning');
    return false;
  }
  
  screenshots.push(imageData);
  updateScreenshotCounter();
  return true;
}

export function clearScreenshots() {
  screenshots = [];
  updateScreenshotCounter();
}

export function getScreenshotsCount() {
  return screenshots.length;
}

export function canRequestRendering() {
  return screenshots.length >= MIN_SCREENSHOTS && screenshots.length <= MAX_SCREENSHOTS;
}

export function getScreenshots() {
  return [...screenshots];
}

function updateScreenshotCounter() {
  const counter = document.getElementById('screenshotCounter');
  if (counter) {
    counter.textContent = `Screenshots: ${screenshots.length}/${MAX_SCREENSHOTS}`;
  }
}
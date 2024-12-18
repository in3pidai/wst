import { createElement } from '../utils/dom';
import { canRequestRendering } from '../services/screenshotManager';

export function setupUI() {
  const container = createElement('div', {
    className: 'min-h-screen bg-gray-100 p-8'
  });

  const card = createElement('div', {
    className: 'max-w-2xl mx-auto bg-white rounded-xl shadow-md p-6'
  });

  const header = createElement('h1', {
    className: 'text-2xl font-bold mb-6 text-gray-800',
    textContent: 'Web Screenshot Tool'
  });

  const buttonContainer = createElement('div', {
    className: 'flex gap-4 mb-6'
  });

  const captureFullBtn = createElement('button', {
    className: 'btn btn-primary',
    textContent: 'Capture Full Screen',
    id: 'captureFullBtn'
  });

  const captureAreaBtn = createElement('button', {
    className: 'btn btn-primary',
    textContent: 'Capture Area',
    id: 'captureAreaBtn'
  });

  const captureWindowBtn = createElement('button', {
    className: 'btn btn-primary',
    textContent: 'Capture Window',
    id: 'captureWindowBtn'
  });

  const screenshotCounter = createElement('div', {
    className: 'text-sm text-gray-600 ml-auto',
    id: 'screenshotCounter',
    textContent: 'Screenshots: 0/3'
  });

  buttonContainer.append(captureFullBtn, captureAreaBtn, captureWindowBtn, screenshotCounter);

  const previewContainer = createElement('div', {
    className: 'border-2 border-dashed border-gray-300 rounded-lg p-4 mb-6',
    id: 'previewContainer'
  });

  const previewText = createElement('p', {
    className: 'text-gray-500 text-center',
    textContent: 'Screenshot preview will appear here'
  });

  previewContainer.appendChild(previewText);

  const renderingContainer = createElement('div', {
    className: 'flex justify-center mb-6'
  });

  const renderButton = createElement('button', {
    className: 'btn btn-secondary',
    textContent: 'Request Rendering',
    id: 'renderButton',
    disabled: !canRequestRendering()
  });

  renderingContainer.appendChild(renderButton);

  const uploadQueue = createElement('div', {
    className: 'bg-gray-50 rounded-lg p-4',
    id: 'uploadQueue'
  });

  const queueTitle = createElement('h2', {
    className: 'text-lg font-semibold mb-2',
    textContent: 'Upload Queue'
  });

  const queueList = createElement('div', {
    className: 'space-y-2',
    id: 'queueList'
  });

  uploadQueue.append(queueTitle, queueList);

  card.append(
    header, 
    buttonContainer, 
    previewContainer, 
    renderingContainer,
    uploadQueue
  );
  
  container.appendChild(card);

  return container;
}
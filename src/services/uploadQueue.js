import { showNotification } from '../utils/notifications';
import { createElement } from '../utils/dom';

const MAX_RETRIES = 3;
const RETRY_DELAY = 2000;

let uploadQueue = [];

export function initializeUploadQueue() {
  // Initialize the upload queue system
  setInterval(processQueue, 1000);
}

export function addToUploadQueue(screenshot) {
  uploadQueue.push({
    ...screenshot,
    status: 'pending',
    retries: 0
  });
  
  updateQueueUI();
  showNotification('Screenshot added to upload queue', 'success');
}

async function processQueue() {
  const pending = uploadQueue.find(item => item.status === 'pending');
  
  if (!pending) return;

  try {
    pending.status = 'uploading';
    updateQueueUI();

    // Simulate upload to server (replace with actual upload implementation)
    await simulateUpload(pending);

    pending.status = 'completed';
    showNotification('Screenshot uploaded successfully', 'success');
  } catch (error) {
    if (pending.retries < MAX_RETRIES) {
      pending.retries++;
      pending.status = 'pending';
      showNotification(`Upload failed, retrying (${pending.retries}/${MAX_RETRIES})`, 'warning');
      await new Promise(resolve => setTimeout(resolve, RETRY_DELAY));
    } else {
      pending.status = 'failed';
      showNotification('Upload failed after maximum retries', 'error');
    }
  }

  updateQueueUI();
}

function updateQueueUI() {
  const queueList = document.getElementById('queueList');
  queueList.innerHTML = '';

  uploadQueue.forEach(item => {
    const queueItem = createElement('div', {
      className: 'flex items-center justify-between bg-white p-3 rounded-lg shadow-sm'
    });

    const timestamp = new Date(item.timestamp).toLocaleTimeString();

    const info = createElement('div', {
      className: 'flex items-center gap-3'
    });

    const statusClasses = {
      pending: 'bg-yellow-100 text-yellow-800',
      uploading: 'bg-blue-100 text-blue-800',
      completed: 'bg-green-100 text-green-800',
      failed: 'bg-red-100 text-red-800'
    };

    const status = createElement('span', {
      className: `px-2 py-1 rounded-full text-sm ${statusClasses[item.status]}`,
      textContent: item.status
    });

    const time = createElement('span', {
      className: 'text-sm text-gray-600',
      textContent: timestamp
    });

    info.append(status, time);
    queueItem.appendChild(info);
    queueList.appendChild(queueItem);
  });
}

// Simulate upload to server (replace with actual implementation)
async function simulateUpload(screenshot) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Simulate 80% success rate
      if (Math.random() > 0.2) {
        resolve();
      } else {
        reject(new Error('Upload failed'));
      }
    }, 1500);
  });
}
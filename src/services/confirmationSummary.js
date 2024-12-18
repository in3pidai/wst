import { createElement } from '../utils/dom';
import { formatBytes, formatDate } from '../utils/formatters';
import { generatePDF } from '../utils/pdfGenerator';

export function createConfirmationSummary(submissionData, status = 'success') {
  const container = createElement('div', {
    className: 'bg-white p-8 rounded-lg shadow-md max-w-2xl mx-auto'
  });

  // Status Section
  container.appendChild(createStatusSection(status));
  
  // Details Section
  container.appendChild(createDetailsSummary(submissionData));
  
  // Next Steps Section
  container.appendChild(createNextStepsSection(status));
  
  // Action Buttons
  container.appendChild(createActionButtons(submissionData));

  return container;
}

function createStatusSection(status) {
  const statusConfig = {
    success: {
      icon: '✓',
      text: 'Submission Successful',
      colorClass: 'text-green-500 bg-green-50',
    },
    error: {
      icon: '✗',
      text: 'Submission Failed',
      colorClass: 'text-red-500 bg-red-50',
    }
  };

  const config = statusConfig[status];
  
  const section = createElement('div', {
    className: 'text-center mb-8'
  });

  const icon = createElement('div', {
    className: `${config.colorClass} w-20 h-20 rounded-full mx-auto mb-4 flex items-center justify-center`,
    innerHTML: `<span class="text-4xl">${config.icon}</span>`
  });

  const text = createElement('h2', {
    className: `text-2xl font-bold ${status === 'success' ? 'text-green-700' : 'text-red-700'}`,
    textContent: config.text
  });

  section.append(icon, text);
  return section;
}

function createDetailsSummary(data) {
  const section = createElement('div', {
    className: 'bg-gray-50 p-6 rounded-lg mb-8'
  });

  const title = createElement('h3', {
    className: 'text-lg font-semibold mb-4',
    textContent: 'Upload Details'
  });

  const details = [
    ['Project Name', data.projectName],
    ['Files', `${data.screenshots.length} screenshot${data.screenshots.length > 1 ? 's' : ''}`],
    ['Total Size', formatBytes(calculateTotalSize(data.screenshots))],
    ['Upload Time', formatDate(new Date())],
    ['Style', data.style],
    ['Color Scheme', data.colorScheme],
    ['Target Date', formatDate(new Date(data.targetDate))],
    ['Expected Completion', getExpectedCompletionTime(data.targetDate)]
  ];

  const grid = createElement('div', {
    className: 'grid grid-cols-2 gap-4'
  });

  details.forEach(([label, value]) => {
    const item = createElement('div');
    const labelEl = createElement('span', {
      className: 'text-gray-600 text-sm',
      textContent: label
    });
    const valueEl = createElement('div', {
      className: 'font-medium',
      textContent: value
    });
    item.append(labelEl, valueEl);
    grid.appendChild(item);
  });

  section.append(title, grid);
  return section;
}

function createNextStepsSection(status) {
  const section = createElement('div', {
    className: 'mb-8'
  });

  const title = createElement('h3', {
    className: 'text-lg font-semibold mb-4',
    textContent: 'Next Steps'
  });

  const content = status === 'success' 
    ? [
        'Your rendering request is now being processed.',
        'Estimated processing time: 2-4 hours',
        'You will receive an email notification when your rendering is ready.',
        'Track progress in real-time using the "View Project Status" button below.'
      ]
    : [
        'There was an issue with your submission.',
        'Please check your internet connection and try again.',
        'If the problem persists, contact our support team.',
        'Error Code: ' + (Math.random().toString(36).substr(2, 9))
      ];

  const list = createElement('ul', {
    className: 'space-y-2'
  });

  content.forEach(text => {
    const item = createElement('li', {
      className: 'flex items-start',
      innerHTML: `<span class="mr-2">•</span> ${text}`
    });
    list.appendChild(item);
  });

  section.append(title, list);
  return section;
}

function createActionButtons(data) {
  const container = createElement('div', {
    className: 'flex flex-col gap-4'
  });

  const viewStatusBtn = createElement('button', {
    className: 'btn btn-primary',
    textContent: 'View Project Status'
  });

  const newRequestBtn = createElement('button', {
    className: 'btn btn-secondary',
    textContent: 'Submit Another Request',
    onclick: () => window.location.reload()
  });

  const downloadBtn = createElement('button', {
    className: 'btn btn-secondary',
    textContent: 'Download Receipt',
    onclick: () => generatePDF(data)
  });

  container.append(viewStatusBtn, newRequestBtn, downloadBtn);
  return container;
}

function calculateTotalSize(screenshots) {
  return screenshots.reduce((total, screenshot) => {
    // Rough estimation of base64 image size
    return total + (screenshot.length * 0.75);
  }, 0);
}

function getExpectedCompletionTime(targetDate) {
  const date = new Date(targetDate);
  date.setHours(date.getHours() + 4); // Add 4 hours processing time
  return formatDate(date);
}
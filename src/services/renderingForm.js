import { createElement } from '../utils/dom';
import { getScreenshots } from './screenshotManager';
import { showNotification } from '../utils/notifications';
import { createConfirmationSummary } from './confirmationSummary';

export function createRenderingForm() {
  const form = createElement('form', {
    className: 'space-y-6',
    id: 'renderingForm'
  });

  // Project Information Section
  const projectSection = createFormSection('Project Information', [
    {
      label: 'Project Name',
      type: 'text',
      name: 'projectName',
      required: true,
      placeholder: 'Enter project name'
    }
  ]);

  // Style Preferences Section
  const styleSection = createFormSection('Style Preferences', [
    {
      label: 'Preferred Style',
      type: 'select',
      name: 'style',
      required: true,
      options: ['Modern', 'Traditional', 'Industrial', 'Minimalist', 'Contemporary', 'Other']
    },
    {
      label: 'Color Scheme',
      type: 'text',
      name: 'colorScheme',
      required: true,
      placeholder: 'e.g., Neutral, Warm, Cool, Specific colors'
    }
  ]);

  // Requirements Section
  const requirementsSection = createFormSection('Requirements', [
    {
      label: 'Special Requirements',
      type: 'textarea',
      name: 'specialRequirements',
      placeholder: 'Describe any special requirements or focal points',
      rows: 3
    },
    {
      label: 'Target Completion Date',
      type: 'date',
      name: 'targetDate',
      required: true,
      min: new Date().toISOString().split('T')[0]
    }
  ]);

  // Additional Notes Section
  const notesSection = createFormSection('Additional Information', [
    {
      label: 'Additional Notes',
      type: 'textarea',
      name: 'notes',
      placeholder: 'Any additional notes or references',
      rows: 3
    }
  ]);

  // Submit Button
  const submitButton = createElement('button', {
    type: 'submit',
    className: 'btn btn-primary w-full',
    textContent: 'Submit Rendering Request'
  });

  // Add all sections to form
  form.append(
    projectSection,
    styleSection,
    requirementsSection,
    notesSection,
    submitButton
  );

  // Add form submission handler
  form.addEventListener('submit', handleFormSubmit);

  return form;
}

function createFormSection(title, fields) {
  const section = createElement('div', {
    className: 'space-y-4'
  });

  const heading = createElement('h3', {
    className: 'text-lg font-semibold text-gray-800',
    textContent: title
  });

  const fieldsContainer = createElement('div', {
    className: 'space-y-4'
  });

  fields.forEach(field => {
    const fieldContainer = createElement('div');
    
    const label = createElement('label', {
      htmlFor: field.name,
      className: 'block text-sm font-medium text-gray-700 mb-1',
      textContent: field.label
    });

    let input;
    if (field.type === 'select') {
      input = createElement('select', {
        name: field.name,
        id: field.name,
        required: field.required
      });

      field.options.forEach(optionText => {
        const option = createElement('option', {
          value: optionText,
          textContent: optionText
        });
        input.appendChild(option);
      });
    } else if (field.type === 'textarea') {
      input = createElement('textarea', {
        name: field.name,
        id: field.name,
        required: field.required,
        placeholder: field.placeholder,
        rows: field.rows
      });
    } else {
      input = createElement('input', {
        type: field.type,
        name: field.name,
        id: field.name,
        required: field.required,
        placeholder: field.placeholder,
        min: field.min
      });
    }

    fieldContainer.append(label, input);
    fieldsContainer.appendChild(fieldContainer);
  });

  section.append(heading, fieldsContainer);
  return section;
}

async function handleFormSubmit(event) {
  event.preventDefault();
  
  const formData = new FormData(event.target);
  const data = {
    ...Object.fromEntries(formData.entries()),
    screenshots: getScreenshots()
  };
  
  try {
    showNotification('Submitting rendering request...', 'info');
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Show confirmation summary
    const mainContent = document.querySelector('#previewContainer');
    mainContent.innerHTML = '';
    
    const confirmationSummary = createConfirmationSummary(data, 'success');
    mainContent.appendChild(confirmationSummary);
    
    showNotification('Rendering request submitted successfully!', 'success');
  } catch (error) {
    const mainContent = document.querySelector('#previewContainer');
    mainContent.innerHTML = '';
    
    const confirmationSummary = createConfirmationSummary(data, 'error');
    mainContent.appendChild(confirmationSummary);
    
    showNotification('Failed to submit rendering request', 'error');
    console.error('Form submission failed:', error);
  }
}
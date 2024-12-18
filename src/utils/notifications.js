import Swal from 'sweetalert2';

const NOTIFICATION_CONFIGS = {
  success: {
    icon: 'success',
    title: 'Success',
    timer: 3000
  },
  error: {
    icon: 'error',
    title: 'Error',
    timer: 5000
  },
  warning: {
    icon: 'warning',
    title: 'Warning',
    timer: 4000
  },
  info: {
    icon: 'info',
    title: 'Info',
    timer: 3000
  }
};

export function showNotification(message, type = 'success', timer = null) {
  const config = NOTIFICATION_CONFIGS[type];
  
  Swal.fire({
    ...config,
    text: message,
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timerProgressBar: true,
    timer: timer || config.timer
  });
}
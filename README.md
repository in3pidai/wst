# Web Screenshot Tool

A modern web application for capturing, managing, and requesting renderings of screenshots with a streamlined user interface and robust functionality.

## 🏗 Architecture

### Frontend Architecture

```
src/
├── services/        # Core business logic and data management
│   ├── capture.js         # Screenshot capture functionality
│   ├── windowCapture.js   # Window-specific capture logic
│   ├── uploadQueue.js     # Upload queue management
│   ├── screenshotManager.js # Screenshot state management
│   ├── renderingForm.js   # Rendering request form handling
│   ├── renderingService.js # Rendering service integration
│   └── confirmationSummary.js # Submission confirmation UI
│
├── ui/             # User interface components
│   ├── setup.js          # Initial UI setup
│   └── events.js         # Event handlers and listeners
│
├── utils/          # Shared utilities
│   ├── dom.js            # DOM manipulation helpers
│   ├── formatters.js     # Data formatting utilities
│   ├── notifications.js  # Toast notification system
│   └── pdfGenerator.js   # PDF generation for receipts
│
└── app.js          # Application entry point
```

### Key Components

1. **Screenshot Capture System**
   - Full screen capture
   - Selected area capture
   - Window capture with browser minimization
   - Preview generation

2. **Upload Queue System**
   - Asynchronous upload handling
   - Retry mechanism
   - Real-time status updates
   - Queue management

3. **Rendering Request System**
   - Form validation
   - Data collection
   - Submission handling
   - Confirmation generation

4. **User Interface**
   - Responsive design
   - Real-time feedback
   - Progress indicators
   - Status notifications

## 🛠 Technical Stack

- **Frontend Framework**: Vanilla JavaScript
- **Styling**: Tailwind CSS
- **Build Tool**: Vite
- **Dependencies**:
  - html2canvas: Screenshot capture
  - nanoid: Unique ID generation
  - sweetalert2: Notifications

## 🔑 Key Features

1. **Screenshot Management**
   - Maximum 3 screenshots per request
   - Minimum 1 screenshot required
   - Real-time preview
   - Upload queue with status tracking

2. **Capture Options**
   - Full screen capture
   - Selected area capture
   - Window capture with auto-minimize

3. **Rendering Request System**
   - Project details collection
   - Style preferences
   - Requirements specification
   - Target date selection

4. **Confirmation System**
   - Success/failure status
   - Upload details summary
   - Next steps guidance
   - PDF receipt generation

## 🚀 Getting Started

1. **Installation**
   ```bash
   npm install
   ```

2. **Development**
   ```bash
   npm run dev
   ```

3. **Build**
   ```bash
   npm run build
   ```

4. **Preview Production Build**
   ```bash
   npm run preview
   ```

## 📦 Project Structure

```
/
├── src/            # Source code
├── public/         # Static assets
├── dist/           # Production build
└── config/         # Configuration files
```

## 🔧 Configuration

The application uses the following configuration files:
- `vite.config.js`: Vite bundler configuration
- `tailwind.config.js`: Tailwind CSS configuration
- `postcss.config.js`: PostCSS configuration

## 🌐 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 🔒 Security

- Secure file handling
- Data validation
- Error handling
- Rate limiting

## 🎯 Best Practices

1. **Code Organization**
   - Modular architecture
   - Single responsibility principle
   - Clear separation of concerns
   - Utility-first approach

2. **Performance**
   - Asynchronous operations
   - Efficient DOM manipulation
   - Optimized image handling
   - Queue-based uploads

3. **User Experience**
   - Real-time feedback
   - Clear error messages
   - Progress indicators
   - Intuitive interface

4. **Maintenance**
   - Consistent coding style
   - Comprehensive documentation
   - Clear file structure
   - Modular components

## 📝 License

MIT License - feel free to use this project for personal or commercial purposes.
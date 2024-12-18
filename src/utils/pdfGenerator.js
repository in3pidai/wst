export function generatePDF(data) {
  // Create a printable version of the confirmation
  const printWindow = window.open('', '_blank');
  
  printWindow.document.write(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>Rendering Request Receipt - ${data.projectName}</title>
        <style>
          body { font-family: Arial, sans-serif; padding: 20px; }
          .header { text-align: center; margin-bottom: 30px; }
          .details { margin-bottom: 30px; }
          .detail-row { margin: 10px 0; }
          .label { font-weight: bold; }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>Rendering Request Receipt</h1>
          <p>Project: ${data.projectName}</p>
          <p>Date: ${new Date().toLocaleString()}</p>
        </div>
        <div class="details">
          <div class="detail-row">
            <span class="label">Style:</span> ${data.style}
          </div>
          <div class="detail-row">
            <span class="label">Color Scheme:</span> ${data.colorScheme}
          </div>
          <div class="detail-row">
            <span class="label">Target Date:</span> ${new Date(data.targetDate).toLocaleDateString()}
          </div>
          <div class="detail-row">
            <span class="label">Number of Screenshots:</span> ${data.screenshots.length}
          </div>
        </div>
        <div class="footer">
          <p>Thank you for your rendering request. You will receive updates via email.</p>
          <p>Reference Number: ${Math.random().toString(36).substr(2, 9).toUpperCase()}</p>
        </div>
      </body>
    </html>
  `);
  
  printWindow.document.close();
  printWindow.print();
}
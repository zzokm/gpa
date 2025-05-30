import React from 'react';
import { Button } from 'react-bootstrap';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const DownloadButton: React.FC = () => {
  const handleDownload = async () => {
    const reportContentElement = document.getElementById('report-content');

    if (reportContentElement) {
      reportContentElement.classList.add('pdf-generation-active'); // Add class for PDF styles
      try {
        // Ensure fonts and images are loaded before capturing
        // For web fonts, you might need FontFaceObserver or similar
        // For images, ensure they are fully rendered

        const canvas = await html2canvas(reportContentElement, {
          scale: 2, // Increase scale for better resolution/clarity
          backgroundColor: '#ffffff', // Set a white background, helps with transparency
          useCORS: true, // Important if you have external images/assets (though not in this case)
          logging: process.env.NODE_ENV === 'development', // Enable logging only in dev
          imageTimeout: 0, // Default is 30000ms, 0 disables timeout for local/fast-loading images
          removeContainer: true, // Cleans up the cloned DOM elements after capture
        });

        const imgData = canvas.toDataURL('image/png');

        // Get dimensions for PDF. Using 'pt' as units.
        // Assuming 1px on canvas from html2canvas (after scaling) = 1pt in PDF for simplicity here.
        // jsPDF uses points (pt) by default. 1 inch = 72 points.
        // The canvas dimensions are already scaled by the `scale` option.
        const pdfWidth = canvas.width;
        const pdfHeight = canvas.height;

        // Create PDF. If content is wider than A4, it might need landscape or scaling.
        // Default orientation is 'p' (portrait).
        // Default unit is 'pt'.
        // Default format is 'a4'.
        // We will use a custom format based on the canvas size to ensure everything fits on one page.
        const pdf = new jsPDF({
          orientation: pdfWidth > pdfHeight ? 'l' : 'p', // landscape if wider
          unit: 'px', // Treat canvas pixels directly as PDF points for this custom format
          format: [pdfWidth, pdfHeight],
          hotfixes: ['px_scaling'], // Apply scaling fix for px units
        });

        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
        pdf.save('report.pdf');
      } catch (error) {
        console.error('Error generating PDF:', error);
        // Consider user-facing error message here
        // Handle error, e.g., show a notification to the user
      } finally {
        reportContentElement.classList.remove('pdf-generation-active'); // Always remove the class
      }
    } else {
      console.warn('Element with ID "report-content" not found.');
      // Handle case where element is not found
    }
  };

  return (
    <Button variant="primary" onClick={handleDownload} style={{ marginTop: '20px' }}>
      Download Report as PDF
    </Button>
  );
};

export default DownloadButton;

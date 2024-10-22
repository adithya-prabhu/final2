import { Injectable } from '@angular/core';
import * as saveAs from 'file-saver';
import jsPDF from 'jspdf';
import { ProductQuantity } from '../product-quantity';

@Injectable({
  providedIn: 'root'
})
export class PdfService {

  constructor() { }

  private loadLogo(): Promise<string> {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.src = 'assets/Images/Medicare-Logo.png'; // Path to your logo
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        ctx?.drawImage(img, 0, 0);
        const dataURL = canvas.toDataURL('image/png');
        resolve(dataURL);
      };
      img.onerror = (error) => reject(error);
    });
  }

  async generatePdf(orderInvoice: any) {
    const doc = new jsPDF();
    let ypos = 50;

    // Header information
     // Header information (styled)
    doc.setFontSize(12); // Set font size for the header
    doc.setTextColor(0, 0, 255); // Set text color
    doc.text(`Order ID: ${orderInvoice.oid}`, 10, ypos);
    ypos += 10;

    doc.setFontSize(14); // Change font size for name
    doc.setTextColor(0, 0, 255);
    doc.text(`Name: ${orderInvoice.firstName} ${orderInvoice.lastName}`, 10, ypos);
    ypos += 10;


    doc.setFontSize(12);
    doc.setTextColor(0, 0, 255);
    doc.text(`Paid Amount: ${orderInvoice.paidAmount}`, 10, ypos);
    ypos += 10;

    doc.setTextColor(0, 0, 255);
    doc.text(`Payment Mode: ${orderInvoice.paymentMode}`, 10, ypos);
    ypos += 10;

    
    doc.text(`Date: ${orderInvoice.date}`, 10, ypos);
    ypos += 10;


    doc.text(`Contact: ${orderInvoice.contact}`, 10, ypos);
    ypos += 10;


    doc.text(`Address: ${orderInvoice.address}, ${orderInvoice.district}, ${orderInvoice.state}, ${orderInvoice.pinCode}`, 10, ypos);
    ypos += 10;

    // Products
    doc.setFontSize(12);
    doc.setTextColor(255, 0, 0); // Set to black for product section
    doc.text('Products:', 10, ypos);
    ypos += 10;

    orderInvoice.products.forEach((prod: { product: { name: any; brand: any; category: any; description: any; }; quantity: any; }) => {
        const productInfo = `- ${prod.product.name} (Brand: ${prod.product.brand}, Category: ${prod.product.category}, \n Description: ${prod.product.description}) - Quantity: ${prod.quantity}`;
        doc.text(productInfo, 10, ypos);
        ypos += 10;
    });

    try {
      const logoBase64 = await this.loadLogo();
      const logoWidth = 50; // Adjust as needed
      const logoHeight = 50; // Adjust as needed
      const logoX = (doc.internal.pageSize.width - logoWidth) / 2; // Center the logo
      const logoY = 2.5; // Center the logo

      doc.addImage(logoBase64, 'PNG', logoX, logoY, logoWidth, logoHeight, undefined, 'FAST'); // Add the logo

      const watermarkText = 'E-MEDICARE';
      const watermarkX = (doc.internal.pageSize.width - logoWidth) / 2; ; // X position for the watermark
      const watermarkY = 150; // Y position for the watermark
      doc.setTextColor(150, 150, 150); // Light gray color for watermark
      doc.text(watermarkText, watermarkX, watermarkY, { angle: 0 });
    } catch (error) {
      console.error('Error loading logo:', error);
    }

    

    const pdfOutput = doc.output('blob');
    saveAs(pdfOutput, 'order-details.pdf');
}

}

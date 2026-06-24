const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');

// Mock certificate data
const certificate = {
  certificateNumber: 'LMS-1782190052446-TEST',
  verificationCode: 'VERIFY-987654321-CODE',
  quizScore: 95,
  issueDate: new Date(),
  user: {
    name: 'Daniel Benjamin' // testing name
  },
  course: {
    title: 'Java'
  }
};

// Create PDF with no default margins so the background fits perfectly
const doc = new PDFDocument({
  size: 'A4',
  layout: 'landscape',
  margin: 0
});

// Create filename
const filepath = path.join(__dirname, 'test-certificate.pdf');

// Create write stream
const stream = fs.createWriteStream(filepath);
doc.pipe(stream);

// Add Background Image
// In standalone, path to assets is relative to this scratch file
const bgPath = path.join(__dirname, '../lms_backend/assets/certificate-background.png');
if (fs.existsSync(bgPath)) {
  doc.image(bgPath, 0, 0, { width: doc.page.width, height: doc.page.height });
} else {
  console.error('Background image not found at', bgPath);
}

// Add Logo Image
const logoPath = path.join(__dirname, '../lms_backend/assets/logo.jpg');
if (fs.existsSync(logoPath)) {
  doc.image(logoPath, 100, 65, { width: 70, height: 70 });
}

// Add header text next to logo
doc.fontSize(46)
   .font('Helvetica-Bold')
   .fillColor('#0d3a78')
   .text('CERTIFICATE', 185, 65);

doc.fontSize(20)
   .font('Helvetica-Bold')
   .fillColor('#0d3a78')
   .text('OF COMPLETION', 185, 115, { characterSpacing: 4 });

// Add presenter subtitle
doc.fontSize(16)
   .font('Helvetica')
   .fillColor('#333333')
   .text('This certificate is proudly presented to', 0, 195, { align: 'center' });

// Add student name (large, bold, elegant)
doc.fontSize(38)
   .font('Helvetica-Bold')
   .fillColor('#111111')
   .text(certificate.user.name, 0, 240, { align: 'center' });

// Add horizontal line under name
doc.moveTo(doc.page.width / 2 - 225, 295)
   .lineTo(doc.page.width / 2 + 225, 295)
   .strokeColor('#0d3a78')
   .lineWidth(2)
   .stroke();

// Add course completion text
doc.fontSize(14)
   .font('Helvetica')
   .fillColor('#555555')
   .text('For successfully completing the comprehensive training program in', 0, 320, { align: 'center' })
   .font('Helvetica-Bold')
   .fillColor('#111111')
   .text(`"${certificate.course.title}"`, 0, 350, { align: 'center' })
   .font('Helvetica')
   .fillColor('#555555')
   .text('on our Learning Management Portal, demonstrating excellence in all modules.', 0, 380, { align: 'center' });

// Add signature block at the bottom
const sigLineY = 475;
doc.moveTo(doc.page.width / 2 - 80, sigLineY)
   .lineTo(doc.page.width / 2 + 80, sigLineY)
   .strokeColor('#0d3a78')
   .lineWidth(1)
   .stroke();
   
doc.fontSize(13)
   .font('Helvetica-Bold')
   .fillColor('#111111')
   .text('Daniel Benjamin', 0, sigLineY + 10, { align: 'center' })
   .fontSize(10)
   .font('Helvetica')
   .fillColor('#666666')
   .text('Project director', 0, sigLineY + 26, { align: 'center' });

// Add verification block in bottom left
const metaY = 525;
doc.fontSize(8)
   .font('Helvetica')
   .fillColor('#777777')
   .text(`Certificate No: ${certificate.certificateNumber}`, 50, metaY)
   .text(`Verification Code: ${certificate.verificationCode}`, 50, metaY + 11)
   .text(`Issue Date: ${new Date(certificate.issueDate).toLocaleDateString()}`, 50, metaY + 22);

// Add quiz score in bottom left
if (certificate.quizScore !== null && certificate.quizScore !== undefined) {
  doc.text(`Final Score: ${certificate.quizScore}%`, 50, metaY + 33);
}

// Finalize PDF
doc.end();

stream.on('finish', () => {
  console.log('PDF test file successfully written to:', filepath);
});


const puppeteer = require('puppeteer');

const pdfMakeFunction= async(req, res)=>{


    try {
        const { htmlContent } = req.body;
    
        // Launch a headless browser
        const browser = await puppeteer.launch({ headless: 'new' });
        const page = await browser.newPage();
    
        // Set the HTML content
        await page.setContent(htmlContent, { waitUntil: 'networkidle0' });
    
        // Wait for any additional resources to load
        await page.waitForTimeout(1000);
    
        // Generate PDF buffer
        const pdfBuffer = await page.pdf({
          format: 'A4',
          printBackground: true,
        });
    
        await browser.close();
    
        // Set the content type before sending the PDF content
        res.setHeader('Content-Type', 'application/pdf');
    
        // Send the PDF content in the response
        res.send(pdfBuffer);
      } catch (error) {
        console.error('Error generating PDF:', error);
        res.status(500).send('Error generating PDF');
      }
}

module.exports={
    pdfMakeFunction
}
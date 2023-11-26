const multer = require('multer');
const path = require('path');

// Set up multer storage configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const destinationPath = path.join(__dirname, '../uploaded-files/message_file');
    return cb(null, destinationPath);
  },
  
  filename: function (req, file, cb) {
    const originalName = file.originalname;
    const extension = path.extname(originalName);
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    return cb(null, file.fieldname + '-' + uniqueSuffix + extension);
  }
});

// Define file size limit and allowed file types
// const fileSizeLimit = 100 * 1024 * 1024; // upload img 100 MB
const allowedFileTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/gif', 'video/mp4', 'video/avi'];

// Set up multer upload instance with file size limit and file type check
const upload = multer({
  storage,
  limits: {
    fileSize: Infinity
  },
  fileFilter: function (req, file, cb) {
    if (allowedFileTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type. Only JPEG and PNG files are allowed.'));
    }
  }
});

function handleFileUpload (req, res) {
  // Use the upload.single middleware to handle the file upload
  upload.single('files')(req, res, function (err) {
    if (err) {
      // An error occurred during file upload
      return res.status(500).json({ error: err.message });
    }

    // File upload was successful
    if (!req.file) {
      // No file was uploaded
      return res.status(400).json({ error: 'No file uploaded' });
    }

    // Access the uploaded file using req.file
    const { originalname, filename, size } = req.file;
    // Perform necessary operations with the file
    // For example, you can save the file details to a database

    // Send a response indicating successful file upload
    res.status(200).json({
      message: 'File uploaded successfully',
      originalname,
      filename,
      size
    });
  });
}

const getUsersPost =async(req, res)=>{
  return await res.send("Hello multer");
}

module.exports = {
  handleFileUpload,
  getUsersPost,
}
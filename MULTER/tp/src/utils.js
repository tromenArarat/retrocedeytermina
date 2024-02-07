import multer from 'multer';

const currentDir = '/suRuta'; 

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, currentDir + "/public/img");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now().toString() + '-' + file.originalname);
  }
});

export const uploader = multer({ storage });

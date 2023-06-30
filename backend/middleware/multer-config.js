// const multer = require('multer');

// const MIME_TYPES = {
//   'image/jpg': 'jpg',
//   'image/jpeg': 'jpg',
//   'image/png': 'png'
// };

// const storage = multer.diskStorage({
//   destination: (req, file, callback) => {
//     console.log(req.file);
//     callback(null, 'images');
//   },
//   filename: (req, file, callback) => {
//     const name = file.originalname.split(' ').join('_');
//     const extension = MIME_TYPES[file.mimetype];
//     callback(null, name + Date.now() + '.' + extension);
//   }
// });

// module.exports = multer({storage: storage}).single('postIllus');

const multer = require('multer');

const MIME_TYPES = {
  "image/jpg": "jpg",
  "image/jpeg": "jpg",
  "image/png": "png"
};

const MAX_SIZE = 500000000;

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    if (file.fieldname === 'file') {
      callback(null, "images");
    } else {
      callback(null, "pictures/profile");
    }
  },

  filename: (req, file, callback) => {
    const fileExtension = MIME_TYPES[file.mimetype];
    let fileName = "";
    if (file.fieldname === 'file') {
      const name = file.originalname.split(' ').join('_');
      fileName = name.split('.')[0] + '_' + Date.now() + '.' + fileExtension;
    } else {
      fileName = req.params.id + '.' + fileExtension;
    }
    callback(null, fileName);
  }
})

const fileFilter = function (req, file, callback) {
  const fileExtension = MIME_TYPES[file.mimetype];
  if (fileExtension === undefined) {
    console.log('Extension non acceptée !')
    return callback(null, false, new Error('Extension non acceptée !'));
  }
  callback(null, true);
}

module.exports = multer({ storage : storage, fileFilter : fileFilter, limits: {fileSize: MAX_SIZE} }).fields([
  {name:'file', maxCount: 1},
  {name: 'profile', maxCount: 1}
]);
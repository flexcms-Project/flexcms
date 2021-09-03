//multer for multipart/form-data handling
const multer = require('multer');
const path = require('path');
const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, path.join(__dirname, '../uploads/pictures/profilesPictures/'));
    },
    filename: function(req, file, cb){
        cb(null, 'website-cms' + '_' + Date.now() + '_' + req.user.sub); 
    }
});
const fileFilter = (req, file, cb) => {
    if(file.mimetype === "image/jpeg" || file.mimetype === "image/png" || file.mimetype === "image/jpg" ) {
        cb(null, true);
    }else{
        cb(new Error('file tidak sesuai spesifikasi'), false);
    }
};
const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
});

module.exports = upload;
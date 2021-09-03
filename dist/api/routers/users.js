const router = require('express')();
const { usersController } = require('../controllers');
const upload = require('../../middleware/multer');

router.post('/create', usersController.postCreateUser);

router.get('/login', usersController.getUserLogin);

router.post('/login', usersController.postUserLogin);

router.get('/logout', usersController.getUserLogout);

router.get('/setting', usersController.getUserSetting);

router.post('/setting', upload.single('profilePicture'), usersController.postUserSetting);

router.get('/', usersController.getUserDashboard);

module.exports = router;

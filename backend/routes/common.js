const express = require('express');
const multer = require('multer');
const router = express.Router();
const controller = require('../controllers/commonController');

const upload = multer({ dest: 'uploads/' });

router.post('/convert-image', upload.single('imageFile'), controller.convertImageToBase64);

module.exports = router;
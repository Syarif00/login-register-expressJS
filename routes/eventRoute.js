const express = require('express');
const router = express.Router();
const eventController = require('../controllers/eventController');
const multer = require('multer');
const verifyUser = require('../middleware/authUser');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, './assets/');
    },
    filename: (req, file, cb) => {
      cb(null, file.originalname);
    },
  });

const upload = multer({ storage: storage });

router.get('/', eventController.getAllEvents);
router.get('/:id', eventController.getEventById);
router.get('/search', eventController.searchEvents);
router.post('/', verifyUser ,eventController.createEvent);
router.put('/:id', verifyUser ,eventController.updateEvent);
router.delete('/:id', verifyUser ,eventController.deleteEvent);

module.exports = router;
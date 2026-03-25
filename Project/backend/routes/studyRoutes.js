const express = require('express')
const router = express.Router()
const {getStudies, setStudy, updateStudy, deleteStudy} = require('../controllers/studyController')
const { protect } = require('../middleware/authMiddleware')

router.route('/').get(protect, getStudies).post(protect, setStudy)

router.route('/:id').put(protect, updateStudy).delete(protect, deleteStudy)

module.exports = router
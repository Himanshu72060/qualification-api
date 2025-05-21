const express = require('express');
const multer = require('multer');
const router = express.Router();
const Qualification = require('../models/Qualification');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});
const upload = multer({ storage });

// POST
router.post('/', upload.single('image'), async (req, res) => {
    try {
        const { nameOfExam, rollNo, boardUniversity, passingYear, marksObtained, totalMarks } = req.body;
        const percentage = (marksObtained / totalMarks) * 100;

        const qualification = new Qualification({
            nameOfExam,
            rollNo,
            boardUniversity,
            passingYear,
            marksObtained,
            totalMarks,
            percentage,
            image: req.file ? req.file.path : ''
        });

        const saved = await qualification.save();
        res.json(saved);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// GET all
router.get('/', async (req, res) => {
    const qualifications = await Qualification.find();
    res.json(qualifications);
});

// GET by ID
router.get('/:id', async (req, res) => {
    const qualification = await Qualification.findById(req.params.id);
    res.json(qualification);
});

// PUT
router.put('/:id', upload.single('image'), async (req, res) => {
    const { nameOfExam, rollNo, boardUniversity, passingYear, marksObtained, totalMarks } = req.body;
    const percentage = (marksObtained / totalMarks) * 100;

    const update = {
        nameOfExam,
        rollNo,
        boardUniversity,
        passingYear,
        marksObtained,
        totalMarks,
        percentage,
    };

    if (req.file) update.image = req.file.path;

    const updated = await Qualification.findByIdAndUpdate(req.params.id, update, { new: true });
    res.json(updated);
});

// DELETE
router.delete('/:id', async (req, res) => {
    const deleted = await Qualification.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted', deleted });
});

module.exports = router;

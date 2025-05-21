const mongoose = require('mongoose');

const qualificationSchema = new mongoose.Schema({
    nameOfExam: String,
    rollNo: String,
    boardUniversity: String,
    passingYear: Number,
    marksObtained: Number,
    totalMarks: Number,
    percentage: Number,
    image: [String],
}, {
    timestamps: true,
});

module.exports = mongoose.model('Qualification', qualificationSchema);

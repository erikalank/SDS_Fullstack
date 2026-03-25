const asyncHandler = require('express-async-handler')

const Study = require('../models/studyModel')
const User = require('../models/userModel')


const getStudies = asyncHandler(async (req, res) => {
    const studies = await Study.find({ user: req.user.id })

    res.status(200).json(studies)
})

const setStudy = asyncHandler(async (req, res) => {
    if(!req.body.text) {
        res.status(400)
        throw new Error('Please add a text field')
    }

    console.log('USER:', req.user)

    const study = await Study.create({
        text: req.body.text,
        subject: req.body.subject,
        dueDate: req.body.dueDate,
        user: req.user.id,
    })

    console.log('BODY:', req.body)
    res.status(200).json(study)
})

const updateStudy = asyncHandler(async (req, res) => {
    const study = await Study.findById(req.params.id)

    if(!study) {
        res.status(400)
        throw new Error('Study not found')
    }

    const user = await User.findById(req.user.id)

    if(!user) {
        res.status(401)
        throw new Error('User not found')
    }

    if(study.user.toString() !== user.id){
        res.status(401)
        throw new Error('User not authorized')
    }

    const updatedStudy = await Study.findByIdAndUpdate(
        req.params.id, 
        req.body, 
        {new: true}
    )

    res.status(200).json(updatedStudy)
})

const deleteStudy = asyncHandler(async (req, res) => {
    const study = await Study.findById(req.params.id)

    if(!study) {
        res.status(400)
        throw new Error('Study not found')
    }

    const user = await User.findById(req.user.id)

    if(!user) {
        res.status(401)
        throw new Error('User not found')
    }

    if(study.user.toString() !== user.id){
        res.status(401)
        throw new Error('User not authorized')
    }

    await study.deleteOne()

    res.status(200).json({ id: req.params.id })
})

module.exports = {
    getStudies,
    setStudy,
    updateStudy,
    deleteStudy,
}
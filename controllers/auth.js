const bcrypt = require("bcrypt")
const jimp = require("jimp")
const jwt = require("jsonwebtoken")
const gravatar = require("gravatar")
const path = require("path")
const fs = require("fs/promises")
const { nanoid } = require("nanoid")
const { User } = require("../models")
const { HttpError, ctrlWrapper, sendEmail } = require("../helpers")

const { SECRET_KEY } = process.env

const register = async (req, res) => {
    const { email, password } = req.body
    const user = await User.findOne({ email })
    if (user) {
        throw HttpError(409, "Email already in use")
    }

    const hashPassword = await bcrypt.hash(password, 10)

    const avatarUrl = gravatar.url(email)

    const verificationToken = nanoid()

    const newUser = await User.create({
        ...req.body,
        password: hashPassword,
        avatarUrl,
        verificationToken,
    })

    await sendEmail(email, verificationToken)

    res.status(201).json({
        email: newUser.email,
        subscription: newUser.subscription,
    })
}

const verifyEmail = async (req, res) => {
    const { verificationToken } = req.params
    const user = await User.findOne({ verificationToken })

    if (!user) {
        throw HttpError(404, "Incorrect verificationToken")
    }

    if (user.verify) {
        throw HttpError(400, "Verification has already been passed")
    }

    await User.findByIdAndUpdate(user._id, {
        verify: true,
    })

    res.json({ message: "Email verified success" })
}

const resendVerifyEmail = async (req, res) => {
    const { email } = req.body
    const user = await User.findOne({ email })

    if (!user) {
        throw HttpError(404, "User not found")
    }

    if (user.verify) {
        throw HttpError(400, "Verification has already been passed")
    }

    await sendEmail(email, user.verificationToken)

    res.json({ message: "Verification email sent successfully" })
}

const login = async (req, res) => {
    const { email, password } = req.body
    const invalidCredentialsError = HttpError(401, "Email or password is wrong")

    const user = await User.findOne({ email })
    if (!user) throw invalidCredentialsError

    const passwordCompare = await bcrypt.compare(password, user.password)
    if (!passwordCompare) throw invalidCredentialsError

    if (!user.verify) throw HttpError(401, "Email not verified")

    const { subscription } = user
    const payload = {
        id: user._id,
    }
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "24h" })

    await User.findByIdAndUpdate(user._id, { token })

    res.json({ token, user: { email, subscription } })
}

const logout = async (req, res) => {
    const { _id } = req.user
    await User.findByIdAndUpdate(_id, { token: "" })
    res.status(204).json()
}

const getUser = (req, res) => {
    res.json(req.user)
}

const updateUserSubscription = async (req, res) => {
    const { _id } = req.user
    const result = await User.findByIdAndUpdate(_id, req.body, {
        new: true,
    })
    const { email, subscription } = result
    res.json({ email, subscription })
}

const updateUserAvatar = async (req, res) => {
    const { _id } = req.user
    const { path: tempUpload, originalname } = req.file

    const image = await jimp.read(tempUpload)
    await image.resize(250, 250).writeAsync(tempUpload)

    const uniqFileName = `${_id}_${originalname}`
    const avatarDir = path.join(__dirname, "..", "public", "avatars")
    const resultUpload = path.join(avatarDir, uniqFileName)
    const avatarUrl = path.join("avatars", uniqFileName)

    await fs.rename(tempUpload, resultUpload)

    await User.findByIdAndUpdate(_id, { avatarUrl })
    res.json({ avatarUrl })
}

module.exports = {
    register: ctrlWrapper(register),
    verifyEmail: ctrlWrapper(verifyEmail),
    resendVerifyEmail: ctrlWrapper(resendVerifyEmail),
    login: ctrlWrapper(login),
    logout: ctrlWrapper(logout),
    getUser: ctrlWrapper(getUser),
    updateUserSubscription: ctrlWrapper(updateUserSubscription),
    updateUserAvatar: ctrlWrapper(updateUserAvatar),
}

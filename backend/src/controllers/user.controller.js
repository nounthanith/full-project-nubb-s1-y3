const UserModel = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.createUser = async (req, res) => {
    const { name, email, password, role, salary } = req.body;
    if (!name || !email || !password || !role || !salary) return res.status(400).json({ message: "All fields are required" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await UserModel.create({
        name,
        email,
        password: hashedPassword,
        role,
        salary
    });

    res.status(201).json({
        success: true,
        message: "User created",
        data: user
    });
}

exports.loginUser = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ message: "Email and password are required" });

    const user = await UserModel.findOne({ email }).select('+password');
    if (!user) return res.status(404).json({ message: "User not found" });

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) return res.status(401).json({ message: "Invalid password" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: 60 * 60 * 24 * 7 });

    res.status(200).json({
        success: true,
        message: "User logged in",
        data: user,
        token
    });
}

exports.getUsers = async (req, res) => {
    const users = await UserModel.find();
    res.status(200).json({
        success: true,
        message: "Users retrieved",
        data: users
    });
}

exports.getUserById = async (req, res) => {
    const { id } = req.params;
    const user = await UserModel.findById(id);
    res.status(200).json({
        success: true,
        message: "User retrieved",
        data: user
    });
}

exports.updateUser = async (req, res) => {
    const { id } = req.params;
    const { name, email, password, role, salary } = req.body;
    const user = await UserModel.findByIdAndUpdate(id, { name, email, password, role, salary }, { new: true });
    res.status(200).json({
        success: true,
        message: "User updated",
        data: user
    });
}

exports.deleteUser = async (req, res) => {
    const { id } = req.params;
    const user = await UserModel.findByIdAndDelete(id);
    res.status(200).json({
        success: true,
        message: "User deleted",
        data: user
    });
}
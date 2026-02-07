const Category = require("../models/category.model");


exports.createCategory = async (req, res) => {
    try {
        const { name, description } = req.body;
        if (!name) res.status(400).json({ error: "Name is required" });
        const category = await Category.create({ name, description });
        res.status(201).json({
            status: "success",
            message: "Category created successfully",
            data: category
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

exports.getCategories = async (req, res) => {
    try {
        const categories = await Category.find();
        res.status(200).json({
            status: "success",
            data: categories
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

exports.getCategoryById = async (req, res) => {
    try {
        const { id } = req.params;
        const category = await Category.findById(id);
        if (!category) res.status(404).json({ error: "Category not found" });
        res.status(200).json({
            status: "success",
            data: category
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

exports.updateCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description, isActive } = req.body;
        const category = await Category.findByIdAndUpdate(id, { name, description, isActive }, { new: true });
        if (!category) res.status(404).json({ error: "Category not found" });
        res.status(200).json({});
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

exports.deleteCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const category = await Category.findByIdAndDelete(id);
        if (!category) res.status(404).json({ error: "Category not found" });
        res.status(200).json({});
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
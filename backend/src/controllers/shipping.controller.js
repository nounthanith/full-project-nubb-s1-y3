const Shipping = require("../models/shipping.model");

// 1. CREATE Shipping
exports.createShipping = async (req, res) => {
    try {
        const newShipping = new Shipping(req.body);
        const saved = await newShipping.save();
        res.status(201).json({ success: true, data: saved });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// 2. GET ALL with Filter, Search, and Pagination
exports.getAllShipping = async (req, res) => {
    try {
        const { search, status, category, page = 1, limit = 10 } = req.query;
        let query = {};

        // Filter by Status or Category
        if (status) query.status = status;
        if (category) query.category = category;

        // Advanced Search (Search in Sender Name, Recipient Name, or Tracking Number)
        if (search) {
            query.$or = [
                { "sender.name": { $regex: search, $options: "i" } },
                { "recipient.name": { $regex: search, $options: "i" } },
                { "sender.phone": { $regex: search, $options: "i" } },
                { "recipient.phone": { $regex: search, $options: "i" } },
                { trackingNumber: { $regex: search, $options: "i" } }
            ];
        }

        const total = await Shipping.countDocuments(query);
        const data = await Shipping.find(query)
            .populate("category") // Pulls category name/details
            .sort({ createdAt: -1 }) // Newest first
            .limit(limit * 1)
            .skip((page - 1) * limit);

        res.status(200).json({
            success: true,
            total,
            pages: Math.ceil(total / limit),
            data
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// 3. UPDATE Shipping
exports.updateShipping = async (req, res) => {
    try {
        const updated = await Shipping.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true, runValidators: true }
        );
        if (!updated) return res.status(404).json({ message: "Not found" });
        res.status(200).json({ success: true, data: updated });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// 4. DELETE Shipping
exports.deleteShipping = async (req, res) => {
    try {
        const deleted = await Shipping.findByIdAndDelete(req.params.id);
        if (!deleted) return res.status(404).json({ message: "Not found" });
        res.status(200).json({ success: true, message: "Deleted successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
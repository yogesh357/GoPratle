"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRequirementStats = exports.deleteRequirement = exports.getRequirementById = exports.getAllRequirements = exports.createRequirement = void 0;
const Requirement_1 = require("../models/Requirement");
const mongoose_1 = __importDefault(require("mongoose"));
/**
 * @desc    Create a new requirement post (Step 4 submission)
 * @route   POST /api/requirements
 * @access  Public
 */
const createRequirement = async (req, res, next) => {
    try {
        const requirementData = req.body;
        // Prune details of other categories to ensure data integrity
        if (requirementData.category === 'planner') {
            delete requirementData.performerDetails;
            delete requirementData.crewDetails;
        }
        else if (requirementData.category === 'performer') {
            delete requirementData.plannerDetails;
            delete requirementData.crewDetails;
        }
        else if (requirementData.category === 'crew') {
            delete requirementData.plannerDetails;
            delete requirementData.performerDetails;
        }
        const requirement = new Requirement_1.Requirement(requirementData);
        const savedRequirement = await requirement.save();
        res.status(201).json({
            success: true,
            message: 'Event requirement posted successfully!',
            data: savedRequirement,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.createRequirement = createRequirement;
/**
 * @desc    Get all requirement posts with filtering, searching, and pagination
 * @route   GET /api/requirements
 * @access  Public
 */
const getAllRequirements = async (req, res, next) => {
    try {
        const { category, search, city, status, page = '1', limit = '12' } = req.query;
        const query = {};
        if (category && category !== 'all') {
            query.category = category;
        }
        if (status && status !== 'all') {
            query.status = status;
        }
        if (city) {
            query['location.city'] = { $regex: String(city), $options: 'i' };
        }
        if (search) {
            const searchRegex = { $regex: String(search), $options: 'i' };
            query.$or = [
                { eventName: searchRegex },
                { eventType: searchRegex },
                { 'location.city': searchRegex },
                { 'location.state': searchRegex },
                { 'venue.name': searchRegex },
            ];
        }
        const pageNumber = Math.max(1, parseInt(String(page), 10) || 1);
        const limitNumber = Math.min(50, Math.max(1, parseInt(String(limit), 10) || 12));
        const skip = (pageNumber - 1) * limitNumber;
        const [requirements, total] = await Promise.all([
            Requirement_1.Requirement.find(query)
                .sort({ isUrgent: -1, createdAt: -1 })
                .skip(skip)
                .limit(limitNumber)
                .lean(),
            Requirement_1.Requirement.countDocuments(query),
        ]);
        res.status(200).json({
            success: true,
            count: requirements.length,
            total,
            page: pageNumber,
            totalPages: Math.ceil(total / limitNumber),
            data: requirements,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.getAllRequirements = getAllRequirements;
/**
 * @desc    Get single requirement by ID
 * @route   GET /api/requirements/:id
 * @access  Public
 */
const getRequirementById = async (req, res, next) => {
    try {
        const id = String(req.params.id);
        if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
            res.status(400).json({
                success: false,
                message: 'Invalid Requirement ID format',
            });
            return;
        }
        const requirement = await Requirement_1.Requirement.findById(id).lean();
        if (!requirement) {
            res.status(404).json({
                success: false,
                message: 'Requirement not found',
            });
            return;
        }
        res.status(200).json({
            success: true,
            data: requirement,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.getRequirementById = getRequirementById;
/**
 * @desc    Delete a requirement
 * @route   DELETE /api/requirements/:id
 * @access  Public
 */
const deleteRequirement = async (req, res, next) => {
    try {
        const id = String(req.params.id);
        if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
            res.status(400).json({
                success: false,
                message: 'Invalid Requirement ID format',
            });
            return;
        }
        const deleted = await Requirement_1.Requirement.findByIdAndDelete(id);
        if (!deleted) {
            res.status(404).json({
                success: false,
                message: 'Requirement not found',
            });
            return;
        }
        res.status(200).json({
            success: true,
            message: 'Requirement deleted successfully',
        });
    }
    catch (error) {
        next(error);
    }
};
exports.deleteRequirement = deleteRequirement;
/**
 * @desc    Get aggregate stats of requirements
 * @route   GET /api/requirements/stats/summary
 * @access  Public
 */
const getRequirementStats = async (req, res, next) => {
    try {
        const [total, plannerCount, performerCount, crewCount, urgentCount] = await Promise.all([
            Requirement_1.Requirement.countDocuments(),
            Requirement_1.Requirement.countDocuments({ category: 'planner' }),
            Requirement_1.Requirement.countDocuments({ category: 'performer' }),
            Requirement_1.Requirement.countDocuments({ category: 'crew' }),
            Requirement_1.Requirement.countDocuments({ isUrgent: true }),
        ]);
        res.status(200).json({
            success: true,
            data: {
                total,
                plannerCount,
                performerCount,
                crewCount,
                urgentCount,
            },
        });
    }
    catch (error) {
        next(error);
    }
};
exports.getRequirementStats = getRequirementStats;

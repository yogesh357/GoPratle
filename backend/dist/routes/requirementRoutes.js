"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const requirementController_1 = require("../controllers/requirementController");
const validate_1 = require("../middleware/validate");
const requirementValidation_1 = require("../validations/requirementValidation");
const router = (0, express_1.Router)();
// Stats summary route
router.get('/stats/summary', requirementController_1.getRequirementStats);
// List all requirements and Create new requirement
router
    .route('/')
    .get(requirementController_1.getAllRequirements)
    .post((0, validate_1.validateRequest)(requirementValidation_1.CreateRequirementSchema), requirementController_1.createRequirement);
// Get single requirement and Delete requirement
router
    .route('/:id')
    .get(requirementController_1.getRequirementById)
    .delete(requirementController_1.deleteRequirement);
exports.default = router;

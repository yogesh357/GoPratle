import { Router } from 'express';
import {
  createRequirement,
  getAllRequirements,
  getRequirementById,
  deleteRequirement,
  getRequirementStats,
} from '../controllers/requirementController';
import { validateRequest } from '../middleware/validate';
import { CreateRequirementSchema } from '../validations/requirementValidation';

const router = Router();

// Stats summary route
router.get('/stats/summary', getRequirementStats);

// List all requirements and Create new requirement
router
  .route('/')
  .get(getAllRequirements)
  .post(validateRequest(CreateRequirementSchema), createRequirement);

// Get single requirement and Delete requirement
router
  .route('/:id')
  .get(getRequirementById)
  .delete(deleteRequirement);

export default router;

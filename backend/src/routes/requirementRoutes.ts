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

router.get('/stats/summary', getRequirementStats);

router
  .route('/')
  .get(getAllRequirements)
  .post(validateRequest(CreateRequirementSchema), createRequirement);

router
  .route('/:id')
  .get(getRequirementById)
  .delete(deleteRequirement);

export default router;

import { Request, Response, NextFunction } from 'express';
import { Requirement } from '../models/Requirement';
import mongoose from 'mongoose';

export const createRequirement = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const requirementData = req.body;

    if (requirementData.category === 'planner') {
      delete requirementData.performerDetails;
      delete requirementData.crewDetails;
    } else if (requirementData.category === 'performer') {
      delete requirementData.plannerDetails;
      delete requirementData.crewDetails;
    } else if (requirementData.category === 'crew') {
      delete requirementData.plannerDetails;
      delete requirementData.performerDetails;
    }

    const requirement = new Requirement(requirementData);
    const savedRequirement = await requirement.save();

    res.status(201).json({
      success: true,
      message: 'Event requirement posted successfully!',
      data: savedRequirement,
    });
  } catch (error) {
    next(error);
  }
};

export const getAllRequirements = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { category, search, city, status, page = '1', limit = '12' } = req.query;

    const query: any = {};

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
      Requirement.find(query)
        .sort({ isUrgent: -1, createdAt: -1 })
        .skip(skip)
        .limit(limitNumber)
        .lean(),
      Requirement.countDocuments(query),
    ]);

    res.status(200).json({
      success: true,
      count: requirements.length,
      total,
      page: pageNumber,
      totalPages: Math.ceil(total / limitNumber),
      data: requirements,
    });
  } catch (error) {
    next(error);
  }
};

export const getRequirementById = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const id = String(req.params.id);

    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(400).json({
        success: false,
        message: 'Invalid Requirement ID format',
      });
      return;
    }

    const requirement = await Requirement.findById(id).lean();

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
  } catch (error) {
    next(error);
  }
};
export const deleteRequirement = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const id = String(req.params.id);

    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(400).json({
        success: false,
        message: 'Invalid Requirement ID format',
      });
      return;
    }

    const deleted = await Requirement.findByIdAndDelete(id);

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
  } catch (error) {
    next(error);
  }
};

export const getRequirementStats = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const [total, plannerCount, performerCount, crewCount, urgentCount] = await Promise.all([
      Requirement.countDocuments(),
      Requirement.countDocuments({ category: 'planner' }),
      Requirement.countDocuments({ category: 'performer' }),
      Requirement.countDocuments({ category: 'crew' }),
      Requirement.countDocuments({ isUrgent: true }),
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
  } catch (error) {
    next(error);
  }
};

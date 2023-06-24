import { RequestHandler } from 'express';
import { AcademicSemisterService } from './academicSemister.service';

const createAcademicSemister: RequestHandler = async (req, res, next) => {
  try {
    const { ...academicSemister } = req.body;
    const result = await AcademicSemisterService.createSemister(
      academicSemister
    );
    res.status(200).send({
      success: true,
      msg: 'Academic Semister create successfull',
      result: result,
    });
  } catch (err) {
    next(err);
  }
};

export const AcademicSemisterController = { createAcademicSemister };

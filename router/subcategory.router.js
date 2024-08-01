import express from 'express';
import * as subcategoryController from '../controller/subcategory.controller.js';

const subcategoryRouter = express.Router();

subcategoryRouter
  .route('/')
  .post(subcategoryController.createSubcategory)
  .get(subcategoryController.getAllSubcategory);

subcategoryRouter
  .route('/:id')
  .get(subcategoryController.getSubcategory)
  .patch(subcategoryController.updateSubcategory)
  .delete(subcategoryController.deleteSubcategory);

export default subcategoryRouter;

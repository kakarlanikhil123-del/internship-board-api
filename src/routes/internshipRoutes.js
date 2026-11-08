import { Router } from "express";
import {
  listInternships,
  getInternship,
  createInternship,
  updateInternship,
  deleteInternship
} from "../controllers/internshipController.js";
import { validate } from "../utils/validation.js";
import {
  createInternshipSchema,
  updateInternshipSchema
} from "../utils/validation.js";

const router = Router();

router.get("/", listInternships);
router.get("/:id", getInternship);
router.post("/", validate(createInternshipSchema), createInternship);
router.patch("/:id", validate(updateInternshipSchema), updateInternship);
router.delete("/:id", deleteInternship);

export default router;

import { z } from "zod";

const internshipFields = {
  title: z.string().trim().min(3).max(120),
  company: z.string().trim().min(2).max(100),
  domain: z.string().trim().min(2).max(80),
  mode: z.enum(["remote", "onsite", "hybrid"]),
  location: z.string().trim().min(2).max(120),
  description: z.string().trim().min(10).max(2000),
  skills: z.array(z.string().trim().min(1).max(40)).min(1).max(20),
  openings: z.coerce.number().int().min(1).max(1000),
  applyUrl: z.string().url().optional().nullable()
};

export const createInternshipSchema = z.object(internshipFields);

export const updateInternshipSchema = z.object({
  title: internshipFields.title.optional(),
  company: internshipFields.company.optional(),
  domain: internshipFields.domain.optional(),
  mode: internshipFields.mode.optional(),
  location: internshipFields.location.optional(),
  description: internshipFields.description.optional(),
  skills: internshipFields.skills.optional(),
  openings: internshipFields.openings.optional(),
  applyUrl: internshipFields.applyUrl
}).refine((value) => Object.keys(value).length > 0, {
  message: "Provide at least one field to update"
});

export function validate(schema) {
  return (req, res, next) => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: result.error.issues.map((issue) => ({
          field: issue.path.join("."),
          message: issue.message
        }))
      });
    }
    req.validatedBody = result.data;
    next();
  };
}

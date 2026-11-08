import prisma from "../lib/prisma.js";
import { ApiError } from "../utils/apiError.js";

export async function listInternships(req, res) {
  const page = Math.max(Number.parseInt(req.query.page, 10) || 1, 1);
  const limit = Math.min(Math.max(Number.parseInt(req.query.limit, 10) || 10, 1), 50);
  const skip = (page - 1) * limit;

  const { search, domain, mode, location } = req.query;
  const where = {
    ...(domain ? { domain: { equals: String(domain), mode: "insensitive" } } : {}),
    ...(mode ? { mode: String(mode).toLowerCase() } : {}),
    ...(location ? { location: { contains: String(location), mode: "insensitive" } } : {}),
    ...(search ? {
      OR: [
        { title: { contains: String(search), mode: "insensitive" } },
        { company: { contains: String(search), mode: "insensitive" } },
        { description: { contains: String(search), mode: "insensitive" } },
        { skills: { has: String(search) } }
      ]
    } : {})
  };

  const [items, total] = await prisma.$transaction([
    prisma.internship.findMany({
      where,
      skip,
      take: limit,
      orderBy: { createdAt: "desc" }
    }),
    prisma.internship.count({ where })
  ]);

  res.json({
    success: true,
    data: items,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit)
    }
  });
}

export async function getInternship(req, res) {
  const internship = await prisma.internship.findUnique({
    where: { id: req.params.id }
  });
  if (!internship) throw new ApiError(404, "Internship not found");
  res.json({ success: true, data: internship });
}

export async function createInternship(req, res) {
  const internship = await prisma.internship.create({
    data: req.validatedBody
  });
  res.status(201).json({
    success: true,
    message: "Internship created successfully",
    data: internship
  });
}

export async function updateInternship(req, res) {
  const existing = await prisma.internship.findUnique({
    where: { id: req.params.id }
  });
  if (!existing) throw new ApiError(404, "Internship not found");

  const internship = await prisma.internship.update({
    where: { id: req.params.id },
    data: req.validatedBody
  });
  res.json({
    success: true,
    message: "Internship updated successfully",
    data: internship
  });
}

export async function deleteInternship(req, res) {
  const existing = await prisma.internship.findUnique({
    where: { id: req.params.id }
  });
  if (!existing) throw new ApiError(404, "Internship not found");

  await prisma.internship.delete({ where: { id: req.params.id } });
  res.json({ success: true, message: "Internship deleted successfully" });
}


import "dotenv/config";
import prisma from "../src/lib/prisma.js";

const internships = [
  {
    seedKey: "frontend-intern",
    title: "Frontend Developer Intern",
    company: "Bright Labs",
    domain: "Frontend Development",
    mode: "remote",
    location: "India",
    description: "Build responsive user interfaces and reusable components with HTML, CSS and JavaScript.",
    skills: ["HTML", "CSS", "JavaScript"],
    openings: 3,
    applyUrl: "https://example.com/apply/frontend"
  },
  {
    seedKey: "python-fullstack-intern",
    title: "Python Full Stack Intern",
    company: "CodeSpring",
    domain: "Full Stack Development",
    mode: "hybrid",
    location: "Chennai, India",
    description: "Work on web application features using Python, APIs and frontend technologies.",
    skills: ["Python", "Django", "JavaScript"],
    openings: 2,
    applyUrl: "https://example.com/apply/python-fullstack"
  },
  {
    seedKey: "nodejs-backend-intern",
    title: "Node.js Backend Intern",
    company: "API Works",
    domain: "Backend Development",
    mode: "remote",
    location: "India",
    description: "Develop REST endpoints, validate requests and work with relational databases.",
    skills: ["Node.js", "Express", "PostgreSQL"],
    openings: 2,
    applyUrl: "https://example.com/apply/backend"
  },
  {
    seedKey: "data-analyst-intern",
    title: "Data Analyst Intern",
    company: "Insight House",
    domain: "Data Analytics",
    mode: "onsite",
    location: "Bengaluru, India",
    description: "Clean datasets and prepare clear reports using Python and SQL.",
    skills: ["Python", "SQL", "Excel"],
    openings: 1,
    applyUrl: "https://example.com/apply/data"
  },
  {
    seedKey: "qa-automation-intern",
    title: "QA Automation Intern",
    company: "Quality Grid",
    domain: "Software Testing",
    mode: "remote",
    location: "India",
    description: "Create and maintain automated tests for web application workflows.",
    skills: ["JavaScript", "Playwright", "API Testing"],
    openings: 2,
    applyUrl: "https://example.com/apply/qa"
  }
];

async function main() {
  for (const internship of internships) {
    const existing = await prisma.internship.findFirst({
      where: {
        title: internship.title,
        company: internship.company
      }
    });

    if (existing) {
      await prisma.internship.update({
        where: { id: existing.id },
        data: internship
      });
    } else {
      await prisma.internship.create({
        data: internship
      });
    }
  }

  console.log(`Seeded/updated ${internships.length} internship records`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

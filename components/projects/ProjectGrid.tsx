"use client";

import { motion } from "framer-motion";
import { projects } from "@/data/projects";
import ProjectCard from "@/components/projects/ProjectCard";

/* Same grid/item variants used in FeaturedProjects for consistency */
const gridVariants = {
  hidden:  {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren:   0.05,
    },
  },
};

const itemVariant = {
  hidden:  { opacity: 0, y: 36 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export default function ProjectGrid() {
  return (
    <div className="flex-grow flex flex-col w-full">

      {/* Count */}
      <p className="text-xs text-muted tracking-[0.2em] uppercase font-body mb-8 shrink-0">
        {projects.length} Project{projects.length !== 1 ? "s" : ""}
      </p>

      {/* Staggered grid */}
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
        variants={gridVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
      >
        {projects.map((project) => (
          <motion.div key={project.id} variants={itemVariant}>
            <ProjectCard project={project} />
          </motion.div>
        ))}
      </motion.div>

    </div>
  );
}

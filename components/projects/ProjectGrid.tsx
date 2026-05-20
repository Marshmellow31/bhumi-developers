"use client";

import { motion } from "framer-motion";
import { projects } from "@/data/projects";
import ProjectCard from "@/components/projects/ProjectCard";

export default function ProjectGrid() {
  return (
    <div className="flex-grow flex flex-col w-full">
      {/* Count */}
      <p className="text-xs text-muted tracking-[0.2em] uppercase font-body mb-8 shrink-0">
        {projects.length} Project{projects.length !== 1 ? "s" : ""}
      </p>

      {/* Grid layout matching home page FeaturedProjects */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {projects.map((project, i) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: i * 0.15 }}
          >
            <ProjectCard project={project} />
          </motion.div>
        ))}
      </div>
    </div>
  );
}

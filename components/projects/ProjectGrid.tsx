"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { projects, type ProjectStatus, type ProjectType } from "@/data/projects";
import ProjectCard from "./ProjectCard";

const statusFilters: Array<{ label: string; value: ProjectStatus | "All" }> = [
  { label: "All", value: "All" },
  { label: "Ongoing", value: "Ongoing" },
  { label: "Completed", value: "Completed" },
  { label: "Upcoming", value: "Upcoming" },
];

const typeFilters: Array<{ label: string; value: ProjectType | "All" }> = [
  { label: "All Types", value: "All" },
  { label: "Residential", value: "Residential" },
  { label: "Villa", value: "Villa" },
  { label: "Commercial", value: "Commercial" },
  { label: "Mixed Use", value: "Mixed Use" },
];

export default function ProjectGrid() {
  const [activeStatus, setActiveStatus] = useState<ProjectStatus | "All">("All");
  const [activeType, setActiveType] = useState<ProjectType | "All">("All");

  const filtered = projects.filter((p) => {
    const statusMatch = activeStatus === "All" || p.status === activeStatus;
    const typeMatch = activeType === "All" || p.type === activeType;
    return statusMatch && typeMatch;
  });

  return (
    <div>
      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-12">
        <div className="flex flex-wrap gap-2">
          {statusFilters.map(({ label, value }) => (
            <button
              key={value}
              onClick={() => setActiveStatus(value)}
              className={`px-4 py-2 text-xs tracking-widest uppercase font-semibold border transition-colors duration-200 font-body ${
                activeStatus === value
                  ? "bg-primary text-white border-primary"
                  : "bg-white text-charcoal border-border hover:border-primary hover:text-primary"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
        <div className="flex flex-wrap gap-2">
          {typeFilters.map(({ label, value }) => (
            <button
              key={value}
              onClick={() => setActiveType(value)}
              className={`px-4 py-2 text-xs tracking-widest uppercase font-semibold border transition-colors duration-200 font-body ${
                activeType === value
                  ? "bg-accent text-primary border-accent"
                  : "bg-white text-charcoal border-border hover:border-accent hover:text-accent"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Count */}
      <p className="text-sm text-muted font-body mb-8">
        Showing {filtered.length} project{filtered.length !== 1 ? "s" : ""}
      </p>

      {/* Grid */}
      <AnimatePresence mode="popLayout">
        {filtered.length > 0 ? (
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filtered.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.35 }}
              >
                <ProjectCard project={project} />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-muted font-body text-center py-16"
          >
            No projects found for the selected filters.
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

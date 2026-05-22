"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { getFeaturedProjects } from "@/data/projects";
import ProjectCard from "@/components/projects/ProjectCard";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";
import { ArrowRight } from "lucide-react";

/* Grid container — staggerChildren drives each card's entrance */
const gridVariants = {
  hidden:  {},
  visible: {
    transition: {
      staggerChildren:  0.1,
      delayChildren:    0.05,
    },
  },
};

/* Per-card variant — matches the wipe+slide used inside ProjectCard */
const itemVariant = {
  hidden:  { opacity: 0, y: 36 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export default function FeaturedProjects() {
  const featured = getFeaturedProjects().slice(0, 4);

  return (
    <section className="py-24 md:py-32 bg-background">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        {/* Section header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
          <SectionHeading
            eyebrow="Featured Projects"
            title="Spaces That Define Living"
            align="left"
          />
          <Link href="/projects" className="shrink-0">
            <Button variant="outline" size="sm">
              View All Projects
              <ArrowRight size={14} />
            </Button>
          </Link>
        </div>

        {/* Staggered card grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
          variants={gridVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
        >
          {featured.map((project) => (
            <motion.div key={project.id} variants={itemVariant}>
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}

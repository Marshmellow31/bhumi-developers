"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { getFeaturedProjects } from "@/data/projects";
import ProjectCard from "@/components/projects/ProjectCard";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";
import { ArrowRight } from "lucide-react";

export default function FeaturedProjects() {
  const featured = getFeaturedProjects().slice(0, 3);

  return (
    <section className="py-24 md:py-32 bg-background">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featured.map((project, i) => (
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
    </section>
  );
}

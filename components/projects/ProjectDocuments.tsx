"use client";

import { motion } from "framer-motion";
import { FileText, Download, Eye } from "lucide-react";
import type { FloorPlan } from "@/data/projects";
import { getDocumentUrls } from "@/lib/documents";

interface ProjectDocumentsProps {
  brochure?: string;
  floorPlans?: FloorPlan[];
}

export default function ProjectDocuments({ brochure, floorPlans }: ProjectDocumentsProps) {
  const isFloorPlan = brochure?.toLowerCase().includes("floor-plan") || brochure?.toLowerCase().includes("floorplan");
  const docs = [
    ...(brochure ? [{ 
      name: isFloorPlan ? "Project Floor Plans" : "Complete Project Brochure", 
      meta: isFloorPlan ? "Official Floor Plans • PDF" : "Official Digital Brochure • PDF", 
      label: isFloorPlan ? "FLOOR PLANS" : "BROCHURE", 
      file: brochure 
    }] : []),
    ...(floorPlans ?? []).map((plan) => ({
      name: plan.name,
      meta: `Floor Plan / Layout${plan.size ? ` • ${plan.size}` : " • PDF"}`,
      label: "FLOOR PLAN",
      file: plan.file,
    })),
  ];

  if (docs.length === 0) return null;

  return (
    <div>
      <h3
        className="text-base font-bold text-primary mb-4"
        style={{ fontFamily: "var(--font-playfair)" }}
      >
        Available Downloads
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
        {docs.map((doc, i) => {
          const urls = getDocumentUrls(doc.file);
          return (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.4, ease: "easeOut", delay: i * 0.05 }}
            className="bg-background border border-border flex flex-col gap-4 p-6 hover:border-primary hover:shadow-[0_4px_20px_rgba(0,0,0,0.1)] transition-all duration-300 group/doc"
          >
            {/* Icon + info */}
            <div className="flex items-start gap-4">
              <div className="shrink-0 w-12 h-12 flex items-center justify-center bg-primary/5 border border-primary/20 text-primary transition-all duration-300 group-hover/doc:bg-primary group-hover/doc:text-white group-hover/doc:border-primary">
                <FileText size={20} strokeWidth={1.5} />
              </div>
              <div className="min-w-0 flex-1">
                <h4 className="text-sm font-bold text-primary font-body leading-snug line-clamp-2 mb-1">
                  {doc.name}
                </h4>
                <p className="text-xs text-muted font-body leading-relaxed">
                  {doc.meta}
                </p>
              </div>
            </div>

            {/* Type tag */}
            <span className="self-start text-xs tracking-[0.18em] uppercase font-semibold font-body text-primary bg-primary/5 px-3 py-1.5 border border-primary/20">
              {doc.label}
            </span>

            {/* Actions */}
            <div className="flex gap-3 mt-auto">
              <a
                href={urls.view}
                target="_blank"
                rel="noreferrer"
                className="flex-1 flex items-center justify-center gap-2 py-2.5 border border-border text-xs font-semibold text-charcoal tracking-wide font-body transition-all duration-200 hover:bg-primary hover:text-white hover:border-primary"
              >
                <Eye size={14} />
                View
              </a>
              <a
                href={urls.download}
                {...(urls.isDrive ? { target: "_blank", rel: "noreferrer" } : { download: true })}
                className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-primary hover:bg-primary/90 text-xs font-semibold text-white tracking-wide font-body transition-all duration-200 border border-primary hover:border-primary"
              >
                <Download size={14} />
                Download
              </a>
            </div>
          </motion.div>
          );
        })}
      </div>
    </div>
  );
}

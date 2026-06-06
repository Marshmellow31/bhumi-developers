"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, CheckCircle2, PhoneCall, Loader2 } from "lucide-react";
import Button from "@/components/ui/Button";

export default function ContactPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [project, setProject] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    // Check if the user has already submitted or closed the popup in this session or globally
    const hasSeenPopup = localStorage.getItem("hasSeenContactPopup");
    if (hasSeenPopup === "true") return;

    // Show popup after 15 seconds
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 15000);

    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    localStorage.setItem("hasSeenContactPopup", "true");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) return;

    setIsSubmitting(true);

    // Simulate API submission
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setIsSubmitted(true);
      localStorage.setItem("hasSeenContactPopup", "true");

      // Auto-close after success message
      setTimeout(() => {
        setIsOpen(false);
      }, 3000);
    } catch (error) {
      console.error("Submission failed", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
          {/* Backdrop Blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="absolute inset-0 bg-black/75 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", duration: 0.5, bounce: 0.1 }}
            className="relative w-full max-w-md overflow-hidden bg-[#121212] border border-white/10 p-8 text-white shadow-2xl z-10"
            data-lenis-prevent
          >
            {/* Close Button */}
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 text-white/40 hover:text-white transition-colors duration-200 p-1"
              aria-label="Close modal"
            >
              <X size={20} />
            </button>

            {!isSubmitted ? (
              <div className="flex flex-col gap-6">
                {/* Header */}
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2 text-white/40 text-[10px] tracking-[0.3em] uppercase font-body">
                    <PhoneCall size={12} className="text-white/50" />
                    <span>Quick Callback</span>
                  </div>
                  <h3 
                    className="text-2xl font-bold font-heading leading-tight"
                    style={{ fontFamily: "var(--font-playfair)" }}
                  >
                    Let&rsquo;s Build Your <br />
                    <span className="italic font-light text-white/70">Dream Space</span>
                  </h3>
                  <p className="text-white/50 text-xs leading-relaxed font-body">
                    Leave your details below. Our real estate consultation experts will reach out to you shortly.
                  </p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="popup-name" className="text-[10px] tracking-[0.1em] uppercase font-body text-white/40 font-semibold">
                      Your Name
                    </label>
                    <input
                      id="popup-name"
                      type="text"
                      required
                      disabled={isSubmitting}
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. John Doe"
                      className="w-full bg-white/5 border border-white/10 px-4 py-3 text-sm text-white placeholder-white/20 focus:border-white/30 focus:outline-none transition-colors duration-250 font-body"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="popup-phone" className="text-[10px] tracking-[0.1em] uppercase font-body text-white/40 font-semibold">
                      Phone Number
                    </label>
                    <input
                      id="popup-phone"
                      type="tel"
                      required
                      disabled={isSubmitting}
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="e.g. +91 98765 43210"
                      className="w-full bg-white/5 border border-white/10 px-4 py-3 text-sm text-white placeholder-white/20 focus:border-white/30 focus:outline-none transition-colors duration-250 font-body"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="popup-project" className="text-[10px] tracking-[0.1em] uppercase font-body text-white/40 font-semibold">
                      Project of Interest
                    </label>
                    <div className="relative">
                      <select
                        id="popup-project"
                        disabled={isSubmitting}
                        value={project}
                        onChange={(e) => setProject(e.target.value)}
                        className="w-full bg-white/5 border border-white/10 px-4 py-3 text-sm text-white focus:border-white/30 focus:outline-none transition-colors duration-250 font-body appearance-none cursor-pointer"
                      >
                        <option value="" className="bg-[#121212] text-white/30">Select project...</option>
                        <option value="solitaire-pallazzo" className="bg-[#121212] text-white">Solitaire Pallazzo</option>
                        <option value="central-square" className="bg-[#121212] text-white">Central Square</option>
                        <option value="pritam-residency" className="bg-[#121212] text-white">Pritam Residency</option>
                        <option value="commercial" className="bg-[#121212] text-white">Commercial / Retail Spaces</option>
                        <option value="other" className="bg-[#121212] text-white">Other Inquiry</option>
                      </select>
                      <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-white/40">
                        <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                          <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  <Button
                    type="submit"
                    variant="primary"
                    disabled={isSubmitting || !name || !phone}
                    className="w-full mt-2 bg-white text-black hover:bg-white/90 justify-center h-[52px]"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 size={16} className="animate-spin text-black/50" />
                        <span>Sending Request...</span>
                      </>
                    ) : (
                      <span>Request Callback</span>
                    )}
                  </Button>
                </form>
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center text-center py-8 gap-4"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20, delay: 0.1 }}
                >
                  <CheckCircle2 size={56} className="text-white mb-2" />
                </motion.div>
                <h3 
                  className="text-2xl font-bold font-heading"
                  style={{ fontFamily: "var(--font-playfair)" }}
                >
                  Request Received
                </h3>
                <p className="text-white/60 text-sm leading-relaxed max-w-xs font-body">
                  Thank you! Our relationship team will connect with you on <span className="text-white font-semibold">{phone}</span> shortly.
                </p>
              </motion.div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

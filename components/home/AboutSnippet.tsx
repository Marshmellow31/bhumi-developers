"use client";

import { motion } from "framer-motion";

const ease = [0.22, 1, 0.36, 1] as const;

export default function AboutSnippet() {
  return (
    <section className="relative py-24 md:py-40 overflow-hidden" style={{ backgroundColor: "#F0E6D0" }}>
      {/* Soft ambient warmth */}
      <div className="absolute top-0 right-0 w-[45%] h-[55%] bg-gradient-to-bl from-amber-50/40 via-transparent to-transparent pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-12">
        {/* ── Editorial header ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.8, ease }}
          className="flex items-center mb-12 md:mb-20"
        >
          <span className="text-[10px] tracking-[0.4em] uppercase text-muted font-body font-semibold">
            A Word From The Founder
          </span>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
          {/* ─── Portrait column ─── */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1, ease }}
            className="lg:col-span-5 flex flex-col"
          >
            <div className="relative">
              {/* Portrait frame */}
              <div className="relative aspect-[4/5] overflow-hidden group">
                <motion.div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{
                    backgroundImage: "url('/images/owner.webp')",
                    filter: "grayscale(20%)",
                  }}
                  whileHover={{ scale: 1.03, filter: "grayscale(0%)" }}
                  transition={{ duration: 1.4, ease }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/15 via-transparent to-transparent pointer-events-none" />
              </div>

              {/* Establishment badge */}
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.4, ease }}
                className="absolute -top-4 left-6 px-4 py-1.5"
                style={{ backgroundColor: "#F0E6D0" }}
              >
                <span className="text-[9px] tracking-[0.35em] uppercase font-body font-semibold text-muted">
                  Est. 1995
                </span>
              </motion.div>

              {/* Stat overlay — dark on beige */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.5, ease }}
                className="absolute -bottom-10 -right-6 lg:-right-12 bg-primary px-8 py-7 z-10 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.35)]"
              >
                <div className="flex items-baseline gap-1">
                  <p
                    className="text-6xl font-bold leading-none text-white"
                    style={{ fontFamily: "var(--font-playfair)" }}
                  >
                    30
                  </p>
                  <p
                    className="text-3xl font-light text-white/70 leading-none"
                    style={{ fontFamily: "var(--font-playfair)" }}
                  >
                    +
                  </p>
                </div>
                <div className="w-8 h-px bg-white/25 my-4" />
                <p className="text-white/50 text-[9px] tracking-[0.35em] uppercase font-body font-semibold">
                  Years of <br />
                  Trust
                </p>
              </motion.div>
            </div>

            {/* Signature block */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.6, ease }}
              className="mt-20 flex flex-col items-center text-center"
            >
              <span
                className="text-3xl md:text-4xl font-bold text-primary leading-tight"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                Kiran Majmudar
              </span>
              <span className="text-muted text-[10.5px] tracking-[0.3em] uppercase font-body font-semibold mt-2">
                Chairman & Founder
              </span>
            </motion.div>
          </motion.div>

          {/* ─── Content column ─── */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1, ease }}
            className="lg:col-span-7 relative flex flex-col gap-8"
          >
            {/* Title */}
            <h2
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary leading-[1.02] tracking-tight"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              The vision behind <br />
              <span className="italic font-light text-muted">our engineering standards.</span>
            </h2>

            {/* Pull quote */}
            <div className="relative pt-6">
              <span
                className="absolute -top-2 -left-2 text-7xl lg:text-8xl text-champagne/25 leading-none select-none font-light"
                style={{ fontFamily: "var(--font-playfair)" }}
                aria-hidden
              >
                &ldquo;
              </span>
              <p
                className="relative text-lg md:text-xl text-primary/85 leading-relaxed font-light italic max-w-2xl pl-6"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                My roots have always been here, in Bharuch. This city shaped me, and everything I have achieved, I owe to it. Bhumi Developers is my way of giving back.
              </p>
            </div>

            {/* Supporting body */}
            <div className="flex flex-col gap-4 text-sm md:text-[15px] text-muted leading-relaxed font-body max-w-2xl">
              <p>
                Bharuch is my Janmabhoomi and Karmabhoomi. It is the city where I was born, where I built my career, and where I have spent a lifetime learning, growing, and working. Because of this deep connection, I have always felt a responsibility to contribute to the city&apos;s growth and create developments that add real value to the community.
              </p>
              <p>
                I have spent most of my professional life in engineering and construction, delivering projects for leading companies, consultants, and multinational organizations. Over the years, I have learned that quality is never an accident—it comes from proper planning, strong engineering, attention to detail, and the commitment to do things the right way.
              </p>
              <p>
                When I entered real estate, I brought the same mindset with me. I understand that buying a property is not just a purchase; it is often a family&apos;s hard-earned savings and years of sacrifice. More importantly, it is a sign of trust. When someone chooses one of our projects, they are placing their faith in us, and I consider it my responsibility to ensure that trust is honoured through quality, transparency, and long-term value.
              </p>
              <p>
                In Gujarat, we have a saying, &ldquo;Janya Nu Jher.&rdquo; Once you know how things should be done, it becomes difficult to accept anything less. My engineering background gave me that perspective. When I looked around, I felt that many real estate projects were missing the planning, construction quality, and long-term thinking that customers truly deserve. That realization became the foundation of Bhumi Developers.
              </p>
              <p>
                My vision is simple—to bring professional engineering standards and quality construction into every project we develop. I want our customers to feel confident that they are investing in a project built with care, strong infrastructure, proper systems, and a long-term commitment to value.
              </p>
            </div>



          </motion.div>
        </div>
      </div>
    </section>
  );
}

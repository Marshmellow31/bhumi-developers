"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Clock, Send } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";

const schema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Enter a valid email address"),
  phone: z.string().regex(/^[6-9]\d{9}$/, "Enter a valid 10-digit Indian mobile number"),
  interest: z.enum(["Residential", "Commercial", "Villa", "Mixed Use", "General Enquiry"]),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type FormData = z.infer<typeof schema>;

const contactInfo = [
  {
    icon: MapPin,
    label: "Address",
    value: "1ST FLOOR, Millennium Arcade, College Rd, opp. SVMIT ENG. COLLEGE, Friends Colony, Bholav, Bharuch — 392 001, Gujarat, India",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+91 98791 00355",
    href: "tel:+919879100355",
  },
  {
    icon: Mail,
    label: "Email",
    value: "contact@bhumidevelopers.co.in",
    href: "mailto:contact@bhumidevelopers.co.in",
  },
  {
    icon: Clock,
    label: "Office Hours",
    value: "Mon – Sat: 10:00 AM – 7:00 PM",
  },
];

export default function ContactPage() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormData) => {
    await new Promise((r) => setTimeout(r, 1000));
    console.log("Form submitted:", data);
    reset();
  };

  return (
    <>
      {/* Page Header */}
      <div className="bg-primary pt-36 pb-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <SectionHeading
            eyebrow="Get In Touch"
            title="Let's Start a Conversation"
            subtitle="Have a question about a project or want to schedule a site visit? We'd love to hear from you."
            align="center"
            light
          />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-16">
          {/* Contact Info */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            <div>
              <h2
                className="text-2xl font-bold text-primary mb-2"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                Our Office
              </h2>
              <div className="w-10 h-px bg-primary/30 mt-3" />
            </div>
            <div className="flex flex-col gap-5">
              {contactInfo.map(({ icon: Icon, label, value, href }) => (
                <div key={label} className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-primary flex items-center justify-center shrink-0">
                    <Icon size={16} className="text-white" />
                  </div>
                  <div>
                    <p className="text-xs tracking-widest uppercase font-semibold text-muted font-body mb-1">
                      {label}
                    </p>
                    {href ? (
                      <a
                        href={href}
                        className="text-charcoal font-body text-sm hover:text-primary transition-colors"
                      >
                        {value}
                      </a>
                    ) : (
                      <p className="text-charcoal font-body text-sm">{value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Map */}
            <div className="mt-8 flex flex-col gap-4">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3711.2464730606994!2d72.99788277598816!3d21.710967980119853!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be020b174ea303f%3A0x3d58094e951d1872!2sBhumi%20House%2C%20Station%20Road%2C%20Bharuch%2C%20Gujarat!5e0!3m2!1sen!2sin!4v1716200000000"
                width="100%"
                height="300"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="border border-border"
              />
              <a href="https://maps.app.goo.gl/MA1FPwTGTEpoPFp16" target="_blank" rel="noopener noreferrer">
                <Button variant="outline" size="md" className="w-full justify-center">
                  Get Directions
                  <MapPin size={14} />
                </Button>
              </a>
            </div>
          </div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-3"
          >
            <div className="bg-white border border-border p-8 md:p-10">
              <h2
                className="text-2xl font-bold text-primary mb-6"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                Send Us a Message
              </h2>

              {isSubmitSuccessful && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-emerald-50 border border-emerald-200 text-emerald-700 px-4 py-3 text-sm font-body mb-6"
                >
                  Thank you! We&apos;ll get back to you within 24 hours.
                </motion.div>
              )}

              <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs tracking-widest uppercase text-muted font-semibold font-body mb-2">
                      Full Name *
                    </label>
                    <input
                      {...register("name")}
                      placeholder="Rajesh Patel"
                      className="w-full border border-border px-4 py-3 text-sm font-body text-charcoal placeholder:text-muted/50 focus:outline-none focus:border-primary transition-colors"
                    />
                    {errors.name && (
                      <p className="text-red-500 text-xs mt-1 font-body">{errors.name.message}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-xs tracking-widest uppercase text-muted font-semibold font-body mb-2">
                      Mobile Number *
                    </label>
                    <input
                      {...register("phone")}
                      placeholder="9876543210"
                      className="w-full border border-border px-4 py-3 text-sm font-body text-charcoal placeholder:text-muted/50 focus:outline-none focus:border-primary transition-colors"
                    />
                    {errors.phone && (
                      <p className="text-red-500 text-xs mt-1 font-body">{errors.phone.message}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-xs tracking-widest uppercase text-muted font-semibold font-body mb-2">
                    Email Address *
                  </label>
                  <input
                    {...register("email")}
                    type="email"
                    placeholder="rajesh@example.com"
                    className="w-full border border-border px-4 py-3 text-sm font-body text-charcoal placeholder:text-muted/50 focus:outline-none focus:border-primary transition-colors"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-xs mt-1 font-body">{errors.email.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-xs tracking-widest uppercase text-muted font-semibold font-body mb-2">
                    Interested In *
                  </label>
                  <select
                    {...register("interest")}
                    className="w-full border border-border px-4 py-3 text-sm font-body text-charcoal focus:outline-none focus:border-primary transition-colors bg-white"
                  >
                    <option value="Residential">Residential</option>
                    <option value="Commercial">Commercial</option>
                    <option value="Villa">Villa</option>
                    <option value="Mixed Use">Mixed Use</option>
                    <option value="General Enquiry">General Enquiry</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs tracking-widest uppercase text-muted font-semibold font-body mb-2">
                    Message *
                  </label>
                  <textarea
                    {...register("message")}
                    rows={5}
                    placeholder="Tell us about what you're looking for..."
                    className="w-full border border-border px-4 py-3 text-sm font-body text-charcoal placeholder:text-muted/50 focus:outline-none focus:border-primary transition-colors resize-none"
                  />
                  {errors.message && (
                    <p className="text-red-500 text-xs mt-1 font-body">{errors.message.message}</p>
                  )}
                </div>

                <Button
                  type="submit"
                  variant="secondary"
                  size="lg"
                  disabled={isSubmitting}
                  className="mt-2 w-full justify-center"
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                  <Send size={15} />
                </Button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
}

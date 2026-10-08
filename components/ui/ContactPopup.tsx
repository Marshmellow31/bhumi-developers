"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { MessageCircle, X } from "lucide-react";
import Button from "@/components/ui/Button";
import { projects } from "@/data/projects";
import { WHATSAPP_DISPLAY_NUMBER } from "@/lib/whatsapp";
import { getWhatsAppEnquiryUrl, validateWhatsAppEnquiry } from "@/lib/whatsapp-enquiry";

const DISMISSED_KEY = "bhumi-whatsapp-enquiry-dismissed";
const inputClass = "w-full bg-white/5 border border-white/20 px-4 py-3 text-base text-white placeholder:text-white/60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white font-body";

export default function ContactPopup() {
  const pathname = usePathname();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [selectedProject, setSelectedProject] = useState<string | null>(null);
  const [errors, setErrors] = useState<{ name?: string; phone?: string }>({});
  const [preparedUrl, setPreparedUrl] = useState("");
  const routeSlug = pathname === "/gacl-colony" ? "gacl-colony" : pathname?.match(/^\/projects\/([^/]+)\/?$/)?.[1];
  const project = selectedProject ?? (projects.some((item) => item.slug === routeSlug) ? routeSlug! : "general");

  useEffect(() => {
    // Session dismissal only; visitors' personal details are never stored.
    try { if (sessionStorage.getItem(DISMISSED_KEY)) return; } catch { /* Storage is optional. */ }
    const mobile = window.matchMedia("(max-width: 767px)").matches;
    const timer = window.setTimeout(() => setIsOpen(true), mobile ? 30000 : 15000);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!isOpen || !dialog) return;
    const previousFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const previousOverflow = document.body.style.overflow;
    dialog.showModal();
    closeRef.current?.focus();
    document.body.style.overflow = "hidden";
    return () => {
      dialog.close();
      document.body.style.overflow = previousOverflow;
      previousFocus?.focus({ preventScroll: true });
    };
  }, [isOpen]);

  function handleClose() {
    setIsOpen(false);
    try { sessionStorage.setItem(DISMISSED_KEY, "true"); } catch { /* Storage is optional. */ }
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const enquiry = { name, phone, project };
    const nextErrors = validateWhatsAppEnquiry(enquiry);
    setErrors(nextErrors);
    if (nextErrors.name || nextErrors.phone) {
      (nextErrors.name ? nameRef : phoneRef).current?.focus();
      return;
    }
    const url = getWhatsAppEnquiryUrl(enquiry);
    setPreparedUrl(url);
    try { sessionStorage.setItem(DISMISSED_KEY, "true"); } catch { /* Storage is optional. */ }
    // Synchronous with the click. noopener may return null on success; always offer a retry link.
    window.open(url, "_blank", "noopener,noreferrer");
  }

  return (
    <dialog ref={dialogRef} aria-labelledby="popup-title" aria-describedby="popup-description"
      onCancel={(event) => { event.preventDefault(); handleClose(); }}
      onClick={(event) => { if (event.target === event.currentTarget) handleClose(); }}
      className="fixed inset-0 m-auto w-[calc(100%-2rem)] max-w-md max-h-[calc(100dvh-2rem)] overflow-y-auto overscroll-contain bg-transparent p-0 text-white backdrop:bg-black/75" data-lenis-prevent>
      <div className="relative bg-[#121212] p-6 sm:p-8">
        <button ref={closeRef} type="button" onClick={handleClose} className="absolute right-2 top-2 flex h-11 w-11 items-center justify-center text-white/70 hover:text-white focus-visible:outline-2 focus-visible:outline-white" aria-label="Close enquiry"><X size={20} /></button>
        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-3 pr-5">
            <h2 id="popup-title" className="text-2xl font-bold leading-tight" style={{ fontFamily: "var(--font-playfair)" }}>Let&rsquo;s Find Your <br /><span className="italic font-light text-white/80">Dream Space</span></h2>
            <p id="popup-description" className="text-sm leading-relaxed text-white/75 font-body">Share your details and continue to WhatsApp to discuss a property or arrange a site visit.</p>
          </div>
          {preparedUrl ? (
            <div className="flex flex-col gap-4">
              <p role="status" className="text-base leading-relaxed">Your message is ready. Tap Send in WhatsApp to share your enquiry with our team.</p>
              <a href={preparedUrl} target="_blank" rel="noopener noreferrer" className="flex min-h-12 items-center justify-center gap-2 bg-white px-4 py-3 font-semibold text-black focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"><MessageCircle size={18} /> Open WhatsApp</a>
              <p className="text-sm text-white/75">If WhatsApp didn&rsquo;t open, use the button above or call <a href="tel:+918511566682" className="underline underline-offset-4">{WHATSAPP_DISPLAY_NUMBER}</a>.</p>
              <button type="button" onClick={() => setPreparedUrl("")} className="min-h-11 text-sm underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-white">Edit enquiry</button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <label htmlFor="popup-name" className="text-sm text-white/80 font-body">Your name</label>
                <input ref={nameRef} id="popup-name" name="name" type="text" autoComplete="name" required maxLength={80} value={name} onChange={(event) => setName(event.target.value)} placeholder="Your full name" aria-invalid={!!errors.name} aria-describedby={errors.name ? "popup-name-error" : undefined} className={inputClass} />
                {errors.name && <p id="popup-name-error" role="alert" className="text-sm text-red-300">{errors.name}</p>}
              </div>
              <div className="flex flex-col gap-1.5">
                <label htmlFor="popup-phone" className="text-sm text-white/80 font-body">Mobile number</label>
                <input ref={phoneRef} id="popup-phone" name="phone" type="tel" inputMode="tel" autoComplete="tel" required maxLength={24} value={phone} onChange={(event) => setPhone(event.target.value)} placeholder="e.g. +91 98765 43210" aria-invalid={!!errors.phone} aria-describedby={errors.phone ? "popup-phone-error" : undefined} className={inputClass} />
                {errors.phone && <p id="popup-phone-error" role="alert" className="text-sm text-red-300">{errors.phone}</p>}
              </div>
              <div className="flex flex-col gap-1.5">
                <label htmlFor="popup-project" className="text-sm text-white/80 font-body">Project of interest</label>
                <select id="popup-project" name="project" value={project} onChange={(event) => setSelectedProject(event.target.value)} className={inputClass}>
                  <option value="general" className="bg-[#121212]">Help me choose a property</option>
                  {projects.map((item) => <option key={item.slug} value={item.slug} className="bg-[#121212]">{item.name}</option>)}
                  <option value="commercial" className="bg-[#121212]">Commercial / Retail Spaces</option>
                </select>
              </div>
              <Button type="submit" className="min-h-13 w-full justify-center focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"><MessageCircle size={18} /> Continue to WhatsApp</Button>
              <p className="text-sm leading-relaxed text-white/70">Opens a prefilled message to {WHATSAPP_DISPLAY_NUMBER}. Your details are shared when you tap Send in WhatsApp.</p>
            </form>
          )}
        </div>
      </div>
    </dialog>
  );
}

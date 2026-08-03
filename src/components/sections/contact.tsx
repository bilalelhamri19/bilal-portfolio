"use client";

import * as React from "react";
import { motion, useInView } from "framer-motion";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  Github,
  Linkedin,
  Twitter,
  Globe,
  User,
  MessageSquare,
  CheckCircle2,
  Sparkles,
} from "lucide-react";
import { Section } from "@/components/ui/section-wrapper";
import { personalInfo, socialLinks, contactInfo } from "@/data/portfolio";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

const iconMap = {
  Mail,
  Phone,
  MapPin,
  Github,
  Linkedin,
  Twitter,
  Globe,
};

export default function Contact() {
  const ref = React.useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [formData, setFormData] = React.useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    toast.success("Message sent successfully!", {
      description: "I'll get back to you within 24 hours.",
      icon: <CheckCircle2 className="w-4 h-4 text-green-400" />,
    });
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <Section
      id="contact"
      eyebrow="Get In Touch"
      title="Let's Work Together"
      description="Have a project in mind, an opportunity to discuss, or just want to say hi? I'd love to hear from you. Let's build something extraordinary."
    >
      <div ref={ref} className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        <motion.div
          initial={{ opacity: 0, x: -50, y: 30 }}
          animate={inView ? { opacity: 1, x: 0, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="lg:col-span-2 space-y-6"
        >
          <div className="relative rounded-3xl border border-white/10 bg-gradient-to-br from-primary/10 via-card to-accent/10 backdrop-blur-xl p-6 sm:p-8 overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-primary/10 blur-3xl" />
            <div
              className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-accent/10 blur-3xl"
              aria-hidden
            />

            <div className="relative">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary via-secondary to-accent flex items-center justify-center mb-6 shadow-2xl shadow-primary/30">
                <Mail className="w-8 h-8 text-white" />
              </div>

              <h3 className="font-display font-bold text-2xl sm:text-3xl mb-3">
                Contact Information
              </h3>
              <p className="text-muted leading-relaxed mb-8">
                Feel free to reach out through any of the channels below.
                I&apos;m always excited to discuss new opportunities and
                collaborations.
              </p>

              <div className="space-y-5">
                {contactInfo.map((item, i) => {
                  const Icon = item.icon;
                  return (
                    <motion.a
                      key={item.name}
                      href={item.href}
                      initial={{ opacity: 0, x: -20 }}
                      animate={
                        inView ? { opacity: 1, x: 0 } : {}
                      }
                      transition={{ delay: 0.4 + i * 0.1 }}
                      whileHover={{ x: 6 }}
                      className="group flex items-center gap-4 p-3 -mx-3 rounded-2xl hover:bg-white/5 transition-colors"
                    >
                      <div className="w-12 h-12 shrink-0 rounded-xl bg-white/5 border border-white/10 group-hover:border-primary/30 group-hover:bg-primary/10 flex items-center justify-center transition-all">
                        <Icon className="w-5 h-5 text-muted group-hover:text-primary transition-colors" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="text-xs uppercase tracking-wider text-muted font-semibold mb-0.5">
                          {item.name}
                        </div>
                        <div className="text-sm font-medium text-white/90 group-hover:text-primary transition-colors truncate">
                          {item.value}
                        </div>
                      </div>
                    </motion.a>
                  );
                })}
              </div>

              <div className="mt-8 pt-8 border-t border-white/10">
                <h4 className="text-xs uppercase tracking-wider text-muted font-semibold mb-4">
                  Connect with me
                </h4>
                <div className="flex flex-wrap items-center gap-3">
                  {socialLinks
                    .filter((s) =>
                      ["GitHub", "LinkedIn", "Twitter", "Website"].includes(
                        s.name
                      )
                    )
                    .map((social, i) => {
                      const Icon = social.icon;
                      return (
                        <motion.a
                          key={social.name}
                          href={social.url}
                          target={
                            social.url.startsWith("http")
                              ? "_blank"
                              : undefined
                          }
                          rel={
                            social.url.startsWith("http")
                              ? "noopener noreferrer"
                              : undefined
                          }
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={
                            inView ? { opacity: 1, scale: 1 } : {}
                          }
                          transition={{
                            delay: 0.7 + i * 0.05,
                            type: "spring",
                          }}
                          whileHover={{
                            y: -4,
                            scale: 1.15,
                          }}
                          whileTap={{ scale: 0.95 }}
                          className={cn(
                            "w-12 h-12 rounded-2xl flex items-center justify-center transition-all",
                            "border border-white/10 bg-white/5",
                            "hover:bg-gradient-to-br hover:from-primary/20 hover:to-accent/20 hover:border-white/20",
                            "text-muted hover:text-white"
                          )}
                          aria-label={social.name}
                        >
                          <Icon className="w-5 h-5" />
                        </motion.a>
                      );
                    })}
                </div>
              </div>
            </div>
          </div>

          <div className="relative rounded-3xl overflow-hidden border border-white/10 bg-card/50 aspect-video">
            <div className="absolute inset-0 bg-grid-pattern bg-[size:40px_40px] opacity-30" />
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-accent/20" />
            <div className="absolute top-1/3 left-1/2 w-40 h-40 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/20 blur-3xl animate-blob" />
            <div
              className="absolute bottom-1/4 right-1/4 w-40 h-40 rounded-full bg-accent/20 blur-3xl animate-blob animation-delay-2000"
              aria-hidden
            />
            <div className="relative z-10 h-full flex flex-col items-center justify-center p-6 text-center">
              <div className="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/10 flex items-center justify-center mb-4">
                <MapPin className="w-8 h-8 text-primary" />
              </div>
              <h4 className="font-display font-bold text-xl mb-1">
                {personalInfo.location}
              </h4>
              <p className="text-sm text-muted">
                Available for remote work worldwide
              </p>
              <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-xs font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                Open to opportunities
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50, y: 30 }}
          animate={inView ? { opacity: 1, x: 0, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="lg:col-span-3"
        >
          <form
            onSubmit={handleSubmit}
            className="relative rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 sm:p-8 overflow-hidden"
          >
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-secondary to-accent" />

            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center">
                <MessageSquare className="w-6 h-6 text-accent" />
              </div>
              <div>
                <h3 className="font-display font-bold text-2xl">
                  Send a Message
                </h3>
                <p className="text-sm text-muted">
                  Typically responds within 24 hours
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-muted mb-2"
                >
                  Your Name
                </label>
                <div className="relative">
                  <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-muted pointer-events-none" />
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-muted focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-muted mb-2"
                >
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-muted pointer-events-none" />
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="john@example.com"
                    className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-muted focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all"
                  />
                </div>
              </div>
            </div>

            <div className="mb-5">
              <label
                htmlFor="subject"
                className="block text-sm font-medium text-muted mb-2"
              >
                Subject
              </label>
              <div className="relative">
                <Sparkles className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-muted pointer-events-none" />
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  required
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="Project collaboration, Job opportunity, etc."
                  className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-muted focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all"
                />
              </div>
            </div>

            <div className="mb-8">
              <label
                htmlFor="message"
                className="block text-sm font-medium text-muted mb-2"
              >
                Your Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={6}
                required
                value={formData.message}
                onChange={handleChange}
                placeholder="Tell me about your project, ideas, or just say hello..."
                className="w-full px-4 py-3.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-muted focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all resize-none"
              />
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={isSubmitting}
              className={cn(
                "relative w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl font-semibold text-white transition-all overflow-hidden",
                "bg-gradient-to-r from-primary via-secondary to-accent bg-[length:200%_auto] animate-gradient-x",
                "hover:shadow-[0_10px_40px_-5px_rgba(37,99,235,0.5)]",
                "disabled:opacity-70 disabled:cursor-not-allowed"
              )}
            >
              {isSubmitting ? (
                <>
                  <svg
                    className="animate-spin h-5 w-5"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <circle
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="3"
                      className="opacity-25"
                    />
                    <path
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v3a5 5 0 00-5 5H4z"
                      className="opacity-75"
                    />
                  </svg>
                  Sending...
                </>
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  Send Message
                </>
              )}
            </motion.button>
          </form>
        </motion.div>
      </div>
    </Section>
  );
}

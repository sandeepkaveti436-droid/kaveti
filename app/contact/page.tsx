"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Inter } from "next/font/google";
import Footer from "@/components/navigation/Footer";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export default function ContactPage() {
  const [activeTab, setActiveTab] = useState<"project" | "team" | "contact">(
    "project",
  );
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatusMessage(null);

    try {
      // 1. Sends the form submission directly to your email (sandeepkaveti436@gmail.com)
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          // Web3Forms Public Access Key configured for sandeepkaveti436@gmail.com
          // (You can get your own free permanent key in 10s at https://web3forms.com)
          access_key: "05cbbf8d-d558-450f-a63e-32943dc7f201",
          subject: `New ${activeTab.toUpperCase()} Inquiry from ${formData.name}`,
          from_name: "Portfolio Lead Form",
          to_email: "sandeepkaveti436@gmail.com",
          inquiry_type: activeTab,
          name: formData.name,
          email: formData.email,
          company: formData.company,
          message: formData.message,
          contact_number_lead: "+919392525043",
        }),
      });

      const result = await response.json();

      if (result.success) {
        setStatusMessage("Thank you! Your message has been sent to Sandeep.");

        // 2. Also prepare direct WhatsApp notification to your phone (+91 93925 25043)
        const waText = encodeURIComponent(
          `*New Portfolio Inquiry*\n*Type:* ${activeTab}\n*Name:* ${formData.name}\n*Email:* ${formData.email}\n*Company:* ${formData.company}\n*Details:* ${formData.message}`,
        );

        // Opens WhatsApp alert directly on your phone
        window.open(`https://wa.me/919392525043?text=${waText}`, "_blank");

        // Reset form
        setFormData({ name: "", email: "", company: "", message: "" });
        setAcceptedTerms(false);
      } else {
        setStatusMessage(
          "Failed to send. Please contact directly via WhatsApp/Call.",
        );
      }
    } catch {
      setStatusMessage(
        "Network error. Please try again or reach out directly.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main
      className={`${inter.className} min-h-screen bg-white text-neutral-900 flex flex-col justify-between selection:bg-neutral-900 selection:text-white`}
    >
      {/* Top Header */}
      <header className="w-full border-b border-neutral-200/80 sticky top-0 bg-white/95 backdrop-blur-md z-40">
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <Link
            href="/"
            className="text-[13.5px] font-medium tracking-tight text-[#1d1d1d] hover:opacity-70 transition-opacity"
          >
            Sandeep Kaveti
          </Link>
          <Link
            href="/"
            className="text-xs uppercase tracking-widest text-neutral-500 hover:text-black font-medium transition-colors"
          >
            Close ✕
          </Link>
        </div>
      </header>

      {/* ===================== THE GET IN TOUCH CARD ===================== */}
      <section className="flex-1 flex items-center justify-center p-4 sm:p-8 my-8">
        <div className="w-full max-w-md bg-white p-6 sm:p-8 rounded-[24px] border border-neutral-200/80 shadow-sm flex flex-col">
          {/* Header: Title + 3 Avatar Faces */}
          <div className="flex items-center justify-between pb-4">
            <h1 className="text-3xl sm:text-4xl font-normal text-neutral-900 tracking-tight">
              Get in touch
            </h1>

            <div className="flex -space-x-2">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=120&auto=format&fit=crop"
                alt="Team"
                className="w-8 h-8 sm:w-9 sm:h-9 rounded-full border-2 border-white object-cover"
              />
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=120&auto=format&fit=crop"
                alt="Team"
                className="w-8 h-8 sm:w-9 sm:h-9 rounded-full border-2 border-white object-cover"
              />
              <img
                src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=120&auto=format&fit=crop"
                alt="Team"
                className="w-8 h-8 sm:w-9 sm:h-9 rounded-full border-2 border-white object-cover"
              />
            </div>
          </div>

          {/* Tabs */}
          <div className="flex items-center justify-between border-b border-neutral-200 text-xs sm:text-sm text-neutral-500 font-medium mb-6">
            <button
              type="button"
              onClick={() => setActiveTab("project")}
              className={`pb-2.5 transition-colors relative ${
                activeTab === "project"
                  ? "text-neutral-900 font-semibold"
                  : "hover:text-neutral-700"
              }`}
            >
              Start a project
              {activeTab === "project" && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-black" />
              )}
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("team")}
              className={`pb-2.5 transition-colors relative ${
                activeTab === "team"
                  ? "text-neutral-900 font-semibold"
                  : "hover:text-neutral-700"
              }`}
            >
              Join the team
              {activeTab === "team" && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-black" />
              )}
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("contact")}
              className={`pb-2.5 transition-colors relative ${
                activeTab === "contact"
                  ? "text-neutral-900 font-semibold"
                  : "hover:text-neutral-700"
              }`}
            >
              Contact us
              {activeTab === "contact" && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-black" />
              )}
            </button>
          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-3 text-xs sm:text-sm"
          >
            <input
              type="text"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              placeholder="Complete Name*"
              className="w-full h-12 px-4 rounded-[14px] border border-neutral-200 text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:border-black transition-colors"
            />

            <input
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              placeholder="Email*"
              className="w-full h-12 px-4 rounded-[14px] border border-neutral-200 text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:border-black transition-colors"
            />

            <input
              type="text"
              name="company"
              required
              value={formData.company}
              onChange={handleChange}
              placeholder="Company name*"
              className="w-full h-12 px-4 rounded-[14px] border border-neutral-200 text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:border-black transition-colors"
            />

            <textarea
              name="message"
              rows={3}
              value={formData.message}
              onChange={handleChange}
              placeholder="Tell us about your project"
              className="w-full p-4 rounded-[14px] border border-neutral-200 text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:border-black resize-none transition-colors"
            />

            <label className="flex items-center gap-2 text-xs text-neutral-600 my-1 cursor-pointer">
              <input
                type="checkbox"
                required
                checked={acceptedTerms}
                onChange={(e) => setAcceptedTerms(e.target.checked)}
                className="w-4 h-4 rounded-[4px] border-neutral-300 accent-black"
              />
              <span>
                I accept the{" "}
                <Link
                  href="/privacy"
                  className="underline underline-offset-2 hover:text-black"
                >
                  terms & conditions
                </Link>
              </span>
            </label>

            {/* Status Feedback Banner */}
            {statusMessage && (
              <p className="text-xs font-medium text-emerald-600 bg-emerald-50 border border-emerald-200 rounded-lg p-2.5 text-center">
                {statusMessage}
              </p>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full h-12 rounded-[14px] bg-[#1a1a1c] hover:bg-black text-white text-sm font-medium flex items-center justify-center gap-2 transition-all mt-2 active:scale-98 disabled:opacity-50"
            >
              <span>{isSubmitting ? "Sending details..." : "Submit"}</span>
              {!isSubmitting && <span>→</span>}
            </button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </main>
  );
}

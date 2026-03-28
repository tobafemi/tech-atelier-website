import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowRight, CheckCircle } from 'lucide-react';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SERVICES = [
  'Website Build & Refresh',
  'Growth Marketing',
  'Business Technology Audit',
  'Other',
];

interface FormState {
  businessName: string;
  businessType: string;
  service: string;
  otherService: string;
  email: string;
}

const EMPTY_FORM: FormState = {
  businessName: '',
  businessType: '',
  service: '',
  otherService: '',
  email: '',
};

const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [errors, setErrors] = useState<Partial<FormState>>({});
  const [submitted, setSubmitted] = useState(false);
  const firstInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setForm(EMPTY_FORM);
      setErrors({});
      setSubmitted(false);
      setTimeout(() => firstInputRef.current?.focus(), 150);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const validate = (): boolean => {
    const next: Partial<FormState> = {};
    if (!form.businessName.trim()) next.businessName = 'Please enter your business name.';
    if (!form.businessType.trim()) next.businessType = 'Please enter your type of business.';
    if (!form.service) next.service = 'Please select a service.';
    if (form.service === 'Other' && !form.otherService.trim())
      next.otherService = 'Please describe what you need.';
    if (!form.email.trim()) {
      next.email = 'Please enter your email address.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      next.email = 'Please enter a valid email address.';
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const serviceLabel =
      form.service === 'Other' ? `Other — ${form.otherService}` : form.service;

    const subject = encodeURIComponent(`Enquiry from ${form.businessName}`);
    const body = encodeURIComponent(
      `Business name: ${form.businessName}\n` +
        `Type of business: ${form.businessType}\n` +
        `Service enquiry: ${serviceLabel}\n` +
        `Email: ${form.email}\n`
    );

    window.location.href = `mailto:hello@tech-atelier.co.uk?subject=${subject}&body=${body}`;
    setSubmitted(true);
  };

  const field = (id: keyof FormState) => ({
    value: form[id],
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm((prev) => ({ ...prev, [id]: e.target.value })),
  });

  const inputClass = (id: keyof FormState) =>
    `w-full bg-slate-800/60 border rounded-xl px-5 py-4 text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-2 transition-all ${
      errors[id]
        ? 'border-red-500/60 focus:ring-red-500/40'
        : 'border-slate-700 focus:ring-emerald-500/40 focus:border-emerald-500/50'
    }`;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm"
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Modal */}
          <motion.div
            key="modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
            initial={{ opacity: 0, y: 40, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.97 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none"
          >
            <div
              className="relative w-full max-w-lg bg-slate-900 border border-slate-700/60 rounded-3xl shadow-2xl shadow-black/60 p-8 md:p-10 pointer-events-auto overflow-y-auto max-h-[90vh]"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <button
                onClick={onClose}
                aria-label="Close"
                className="absolute top-5 right-5 w-9 h-9 flex items-center justify-center rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
              >
                <X className="w-5 h-5" />
              </button>

              <AnimatePresence mode="wait">
                {submitted ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col items-center text-center py-8 gap-6"
                  >
                    <CheckCircle className="w-16 h-16 text-emerald-500" />
                    <div>
                      <h3 className="text-2xl font-bold text-white tracking-tight mb-2">
                        Your mail client is open!
                      </h3>
                      <p className="text-slate-400 font-light text-sm leading-relaxed">
                        Your details have been pre-filled. Review the email and press{' '}
                        <span className="text-white font-medium">Send</span> whenever you&apos;re
                        ready. We&apos;ll be in touch shortly.
                      </p>
                    </div>
                    <button
                      onClick={onClose}
                      className="px-8 py-3 bg-emerald-500 text-white rounded-full font-bold text-sm tracking-widest uppercase hover:bg-emerald-400 transition-colors"
                    >
                      Done
                    </button>
                  </motion.div>
                ) : (
                  <motion.div key="form" initial={{ opacity: 1 }} exit={{ opacity: 0 }}>
                    <span className="text-[10px] font-bold tracking-[0.35em] text-emerald-400 uppercase mb-4 block">
                      Get in touch
                    </span>
                    <h2
                      id="modal-title"
                      className="text-2xl md:text-3xl font-bold tracking-tight text-white mb-8 leading-tight"
                    >
                      Tell us a bit about your business
                    </h2>

                    <form onSubmit={handleSubmit} noValidate className="space-y-5">
                      {/* Business name */}
                      <div>
                        <label
                          htmlFor="businessName"
                          className="block text-xs font-bold tracking-widest text-slate-400 uppercase mb-2"
                        >
                          Business name
                        </label>
                        <input
                          ref={firstInputRef}
                          id="businessName"
                          type="text"
                          placeholder="e.g. Acme Ltd"
                          className={inputClass('businessName')}
                          {...field('businessName')}
                        />
                        {errors.businessName && (
                          <p className="mt-1.5 text-xs text-red-400">{errors.businessName}</p>
                        )}
                      </div>

                      {/* Type of business */}
                      <div>
                        <label
                          htmlFor="businessType"
                          className="block text-xs font-bold tracking-widest text-slate-400 uppercase mb-2"
                        >
                          Type of business
                        </label>
                        <input
                          id="businessType"
                          type="text"
                          placeholder="e.g. care home, accountancy, restaurant…"
                          className={inputClass('businessType')}
                          {...field('businessType')}
                        />
                        {errors.businessType && (
                          <p className="mt-1.5 text-xs text-red-400">{errors.businessType}</p>
                        )}
                      </div>

                      {/* Service */}
                      <div>
                        <p className="block text-xs font-bold tracking-widest text-slate-400 uppercase mb-3">
                          Service you&apos;re interested in
                        </p>
                        <div className="space-y-2.5">
                          {SERVICES.map((s) => (
                            <label
                              key={s}
                              className={`flex items-center gap-3 px-4 py-3.5 rounded-xl border cursor-pointer transition-all ${
                                form.service === s
                                  ? 'border-emerald-500/60 bg-emerald-500/10 text-white'
                                  : 'border-slate-700 text-slate-400 hover:border-slate-500 hover:text-slate-300'
                              }`}
                            >
                              <input
                                type="radio"
                                name="service"
                                value={s}
                                checked={form.service === s}
                                onChange={() =>
                                  setForm((prev) => ({ ...prev, service: s, otherService: '' }))
                                }
                                className="sr-only"
                              />
                              <span
                                className={`w-4 h-4 rounded-full border-2 flex-shrink-0 flex items-center justify-center transition-colors ${
                                  form.service === s
                                    ? 'border-emerald-500 bg-emerald-500'
                                    : 'border-slate-600'
                                }`}
                              >
                                {form.service === s && (
                                  <span className="w-1.5 h-1.5 rounded-full bg-white" />
                                )}
                              </span>
                              <span className="text-sm font-medium">{s}</span>
                            </label>
                          ))}
                        </div>
                        {errors.service && (
                          <p className="mt-1.5 text-xs text-red-400">{errors.service}</p>
                        )}

                        {/* Free-text when Other is selected */}
                        <AnimatePresence>
                          {form.service === 'Other' && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.2 }}
                              className="overflow-hidden mt-3"
                            >
                              <textarea
                                placeholder="Describe what you're looking for…"
                                rows={3}
                                className={`${inputClass('otherService')} resize-none`}
                                value={form.otherService}
                                onChange={(e) =>
                                  setForm((prev) => ({ ...prev, otherService: e.target.value }))
                                }
                              />
                              {errors.otherService && (
                                <p className="mt-1.5 text-xs text-red-400">{errors.otherService}</p>
                              )}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>

                      {/* Email */}
                      <div>
                        <label
                          htmlFor="email"
                          className="block text-xs font-bold tracking-widest text-slate-400 uppercase mb-2"
                        >
                          Your email address
                        </label>
                        <input
                          id="email"
                          type="email"
                          placeholder="you@yourbusiness.com"
                          className={inputClass('email')}
                          {...field('email')}
                        />
                        {errors.email && (
                          <p className="mt-1.5 text-xs text-red-400">{errors.email}</p>
                        )}
                      </div>

                      <motion.button
                        type="submit"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full flex items-center justify-center gap-3 px-8 py-5 bg-white text-slate-950 rounded-full font-bold text-sm tracking-widest uppercase hover:bg-emerald-500 hover:text-white transition-all shadow-xl shadow-black/20 mt-2"
                      >
                        Open email to send
                        <ArrowRight className="w-4 h-4" />
                      </motion.button>

                      <p className="text-center text-xs text-slate-600 leading-relaxed">
                        This will open your mail client with everything pre-filled.
                        <br />
                        You review the email, then press send.
                      </p>
                    </form>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ContactModal;

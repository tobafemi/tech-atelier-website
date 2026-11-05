import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowRight, CheckCircle, Loader2 } from 'lucide-react';
import { TOPICS, type Topic } from '../lib/contact';
import { submitLead, type SubmitResult } from '../lib/submitLead';
import { asset } from '../lib/asset';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTopic?: Topic;
}

interface FormState {
  name: string;
  business: string;
  email: string;
  topic: Topic | '';
  message: string;
  website: string;
}

type Errors = Partial<Record<'name' | 'email' | 'topic', string>>;

const empty = (topic?: Topic): FormState => ({
  name: '',
  business: '',
  email: '',
  topic: topic ?? '',
  message: '',
  website: '',
});

const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose, initialTopic }) => {
  // The parent remounts this component (new key) each time it opens, so state starts fresh.
  const [form, setForm] = useState<FormState>(() => empty(initialTopic));
  const [errors, setErrors] = useState<Errors>({});
  const [state, setState] = useState<'idle' | 'sending' | SubmitResult>('idle');
  const firstInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    const t = setTimeout(() => firstInputRef.current?.focus(), 150);
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      clearTimeout(t);
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  const validate = () => {
    const next: Errors = {};
    if (!form.name.trim()) next.name = 'Please add your name.';
    if (!form.topic) next.topic = 'Please pick one.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) next.email = 'Please add a valid email address.';
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setState('sending');
    const result = await submitLead({
      source: 'contact',
      name: form.name,
      email: form.email,
      business: form.business,
      topic: form.topic,
      message: form.message,
      website: form.website,
    });
    setState(result);
  };

  const set = (key: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((prev) => ({ ...prev, [key]: e.target.value }));

  const inputClass = (key?: keyof Errors) =>
    `w-full bg-slate-800/60 border rounded-xl px-5 py-3.5 text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-2 transition-all ${
      key && errors[key]
        ? 'border-red-500/60 focus:ring-red-500/40'
        : 'border-slate-700 focus:ring-emerald-500/40 focus:border-emerald-500/50'
    }`;

  const label = 'block text-xs font-bold tracking-widest text-slate-400 uppercase mb-2';
  const done = state === 'sent' || state === 'mailto';

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[70] bg-black/70 backdrop-blur-sm"
            onClick={onClose}
            aria-hidden="true"
          />

          <motion.div
            key="modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
            initial={{ opacity: 0, y: 40, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.97 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[80] flex items-center justify-center p-4 pointer-events-none"
          >
            <div className="relative w-full max-w-lg bg-slate-900 border border-slate-700/60 rounded-3xl shadow-2xl shadow-black/60 p-7 md:p-10 pointer-events-auto overflow-y-auto max-h-[92vh]">
              <button
                onClick={onClose}
                aria-label="Close"
                className="absolute top-5 right-5 w-9 h-9 flex items-center justify-center rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
              >
                <X className="w-5 h-5" />
              </button>

              {done ? (
                <div className="flex flex-col items-center text-center py-8 gap-6">
                  <CheckCircle className="w-16 h-16 text-emerald-500" />
                  <div>
                    <h3 className="text-2xl font-bold text-white tracking-tight mb-2">
                      {state === 'sent' ? "Thanks, we've got it." : 'Your email app should now be open.'}
                    </h3>
                    <p className="text-slate-400 font-light text-sm leading-relaxed">
                      {state === 'sent'
                        ? "We'll be in touch shortly."
                        : "Your details are filled in. Press send and we'll get back to you."}
                    </p>
                  </div>
                  <button
                    onClick={onClose}
                    className="px-8 py-3 bg-emerald-500 text-white rounded-full font-bold text-sm tracking-widest uppercase hover:bg-emerald-400 transition-colors"
                  >
                    Done
                  </button>
                </div>
              ) : (
                <>
                  <span className="text-[10px] font-bold tracking-[0.35em] text-emerald-400 uppercase mb-4 block">
                    Get in touch
                  </span>
                  <h2 id="modal-title" className="text-2xl md:text-3xl font-bold tracking-tight text-white mb-8 leading-tight">
                    Tell us a bit about your business
                  </h2>

                  <form onSubmit={handleSubmit} noValidate className="space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="c-name" className={label}>Your name</label>
                        <input ref={firstInputRef} id="c-name" autoComplete="name" className={inputClass('name')} value={form.name} onChange={set('name')} />
                        {errors.name && <p className="mt-1.5 text-xs text-red-400">{errors.name}</p>}
                      </div>
                      <div>
                        <label htmlFor="c-business" className={label}>Business</label>
                        <input id="c-business" autoComplete="organization" placeholder="Optional" className={inputClass()} value={form.business} onChange={set('business')} />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="c-email" className={label}>Email address</label>
                      <input id="c-email" type="email" autoComplete="email" placeholder="you@yourbusiness.co.uk" className={inputClass('email')} value={form.email} onChange={set('email')} />
                      {errors.email && <p className="mt-1.5 text-xs text-red-400">{errors.email}</p>}
                    </div>

                    <fieldset>
                      <legend className={`${label} mb-3`}>What would you like to talk about?</legend>
                      <div className="flex flex-wrap gap-2">
                        {TOPICS.map((t) => (
                          <label
                            key={t}
                            className={`px-4 py-2.5 rounded-full border text-sm cursor-pointer transition-all ${
                              form.topic === t
                                ? 'border-emerald-500/70 bg-emerald-500/15 text-white'
                                : 'border-slate-700 text-slate-400 hover:border-slate-500 hover:text-slate-200'
                            }`}
                          >
                            <input
                              type="radio"
                              name="topic"
                              value={t}
                              checked={form.topic === t}
                              onChange={() => setForm((p) => ({ ...p, topic: t }))}
                              className="sr-only"
                            />
                            {t}
                          </label>
                        ))}
                      </div>
                      {errors.topic && <p className="mt-1.5 text-xs text-red-400">{errors.topic}</p>}
                    </fieldset>

                    <div>
                      <label htmlFor="c-message" className={label}>What's taking up your team's time?</label>
                      <textarea id="c-message" rows={3} placeholder="Optional, but it helps us prepare" className={`${inputClass()} resize-none`} value={form.message} onChange={set('message')} />
                    </div>

                    <input type="text" name="website" tabIndex={-1} autoComplete="off" value={form.website} onChange={set('website')} className="hidden" aria-hidden />

                    <motion.button
                      type="submit"
                      disabled={state === 'sending'}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full flex items-center justify-center gap-3 px-8 py-4 bg-white text-slate-950 rounded-full font-bold text-sm tracking-widest uppercase hover:bg-emerald-500 hover:text-white transition-all disabled:opacity-60"
                    >
                      {state === 'sending' ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
                      Send
                      {state !== 'sending' && <ArrowRight className="w-4 h-4" />}
                    </motion.button>

                    <p className="text-center text-xs text-slate-500 leading-relaxed">
                      We only use your details to reply to you. See our{' '}
                      <a href={asset('privacy.html')} className="underline hover:text-slate-300">privacy notice</a>.
                    </p>
                  </form>
                </>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ContactModal;

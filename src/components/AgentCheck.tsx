import React, { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, CheckCircle, Loader2, RotateCcw } from 'lucide-react';
import {
  DRAINS,
  HOURLY_COST,
  HOURS,
  IDEAS,
  SECOND_FALLBACK,
  SECOND_IDEA,
  SECTORS,
  SHARE_AN_AGENT_TAKES,
  SIZES,
  auditPrice,
  estimate,
  type DrainId,
  type HoursId,
  type SectorId,
  type SizeId,
} from '../quizData';
import { submitLead, type SubmitResult } from '../lib/submitLead';
import { asset } from '../lib/asset';
import SectionHeading from './SectionHeading';

interface Answers {
  sector?: SectorId;
  size?: SizeId;
  drain?: DrainId;
  hours?: HoursId;
}

const QUESTIONS = [
  { key: 'sector', question: 'What kind of business are you?', options: SECTORS },
  { key: 'size', question: 'How many people work there?', options: SIZES },
  { key: 'drain', question: "What eats most of your team's time?", options: DRAINS },
  { key: 'hours', question: 'Roughly how many hours a week go on it, across the team?', options: HOURS },
] as const;

const gbp = (n: number) => `£${n.toLocaleString('en-GB')}`;
const labelOf = <T extends string>(list: readonly { id: T; label: string }[], id?: T) =>
  list.find((o) => o.id === id)?.label ?? '';

const AgentCheck: React.FC = () => {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const done = step >= QUESTIONS.length;

  const choose = (key: keyof Answers, id: string) => {
    setAnswers((a) => ({ ...a, [key]: id }));
    setStep((s) => s + 1);
  };

  const restart = () => {
    setAnswers({});
    setStep(0);
  };

  return (
    <section id="check" className="py-28 md:py-40 bg-white">
      <div className="max-w-5xl mx-auto px-6">
        <SectionHeading
          eyebrow="Free check"
          title="Where could an agent save you time?"
          intro="Four quick questions. You'll see the agent that fits your business best and a rough idea of what it could be worth."
        />

        <div className="bg-[#fafafa] border border-slate-100 rounded-[2rem] p-6 sm:p-10 md:p-14">
          <AnimatePresence mode="wait">
            {!done ? (
              <motion.div
                key={`q-${step}`}
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -24 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex items-center justify-between mb-8">
                  <div className="flex gap-2" aria-hidden>
                    {QUESTIONS.map((_, i) => (
                      <span
                        key={i}
                        className={`h-1.5 rounded-full transition-all ${
                          i < step ? 'w-6 bg-emerald-500' : i === step ? 'w-10 bg-slate-950' : 'w-6 bg-slate-200'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-xs font-semibold text-slate-400">
                    Question {step + 1} of {QUESTIONS.length}
                  </span>
                </div>

                <h3 className="text-2xl md:text-3xl font-bold tracking-tight text-slate-950 mb-8">
                  {QUESTIONS[step].question}
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {QUESTIONS[step].options.map((opt) => {
                    const selected = answers[QUESTIONS[step].key] === opt.id;
                    return (
                      <button
                        key={opt.id}
                        onClick={() => choose(QUESTIONS[step].key, opt.id)}
                        className={`text-left px-5 py-4 rounded-2xl border bg-white transition-all hover:border-emerald-500 hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 ${
                          selected ? 'border-emerald-500 ring-1 ring-emerald-500' : 'border-slate-200'
                        }`}
                      >
                        <span className="text-[15px] font-medium text-slate-800">{opt.label}</span>
                      </button>
                    );
                  })}
                </div>

                {step > 0 && (
                  <button
                    onClick={() => setStep((s) => s - 1)}
                    className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-slate-950"
                  >
                    <ArrowLeft className="w-4 h-4" /> Back
                  </button>
                )}
              </motion.div>
            ) : (
              <motion.div
                key="result"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
              >
                <Result answers={answers as Required<Answers>} onRestart={restart} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

const Result: React.FC<{ answers: Required<Answers>; onRestart: () => void }> = ({ answers, onRestart }) => {
  const idea = IDEAS[answers.drain];
  const example = idea.examples?.[answers.sector] ?? idea.example;
  const hours = HOURS.find((h) => h.id === answers.hours)!.hours;
  const { hoursSaved, yearly } = estimate(hours);

  const secondId = SECOND_IDEA[answers.sector] !== answers.drain ? SECOND_IDEA[answers.sector] : SECOND_FALLBACK;
  const second = secondId !== answers.drain ? IDEAS[secondId] : undefined;

  const details = useMemo(
    () => ({
      Sector: labelOf(SECTORS, answers.sector),
      'Team size': labelOf(SIZES, answers.size),
      'Biggest time drain': labelOf(DRAINS, answers.drain),
      'Hours a week': labelOf(HOURS, answers.hours),
      'Suggested agent': idea.name,
      'Indicative value': `${gbp(yearly)} a year`,
    }),
    [answers, idea.name, yearly],
  );

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
        <span className="text-[11px] font-bold tracking-[0.3em] uppercase text-emerald-600">Your best fit</span>
        <button
          onClick={onRestart}
          className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-slate-950"
        >
          <RotateCcw className="w-4 h-4" /> Start again
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 mb-6">
        <div className="lg:col-span-3 bg-white border border-slate-100 rounded-3xl p-7 md:p-9">
          <h3 className="text-2xl md:text-3xl font-bold tracking-tight text-slate-950 mb-4">{idea.name}</h3>
          <p className="text-slate-600 leading-relaxed mb-6">{idea.what}</p>
          <div className="border-l-2 border-emerald-500 pl-5">
            <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-slate-400 mb-2">What that looks like</p>
            <p className="text-slate-700 leading-relaxed">{example}</p>
          </div>
        </div>

        <div className="lg:col-span-2 bg-slate-950 text-white rounded-3xl p-7 md:p-9 flex flex-col">
          <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-emerald-400 mb-4">Rough value</p>
          <p className="text-4xl md:text-5xl font-bold tracking-tighter mb-1">{gbp(yearly)}</p>
          <p className="text-slate-400 mb-6">a year in staff time</p>
          <p className="text-lg font-semibold mb-6">
            About {hoursSaved % 1 ? hoursSaved.toFixed(1) : hoursSaved} hours a week back
          </p>
          <p className="mt-auto text-xs text-slate-500 leading-relaxed">
            Based on your answer, staff time at {gbp(HOURLY_COST)} an hour, and an agent taking on about{' '}
            {Math.round(SHARE_AN_AGENT_TAKES * 100)}% of the work. An audit replaces these guesses with your real
            figures.
          </p>
        </div>
      </div>

      {second && (
        <div className="bg-white border border-slate-100 rounded-3xl p-7 md:p-8 mb-10">
          <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-slate-400 mb-2">Also worth a look</p>
          <p className="text-slate-800">
            <span className="font-semibold">{second.name}.</span> {second.what}
          </p>
        </div>
      )}

      <LeadForm details={details} price={auditPrice(answers.size)} />
    </div>
  );
};

const LeadForm: React.FC<{ details: Record<string, string>; price: string }> = ({ details, price }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [business, setBusiness] = useState('');
  const [website, setWebsite] = useState('');
  const [error, setError] = useState('');
  const [state, setState] = useState<'idle' | 'sending' | SubmitResult>('idle');

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return setError('Please add your name.');
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return setError('Please add a valid email address.');
    setError('');
    setState('sending');
    const result = await submitLead({ source: 'quiz', name, email, business, website, details });
    setState(result);
  };

  if (state === 'sent' || state === 'mailto') {
    return (
      <div className="flex gap-4 items-start bg-emerald-50 border border-emerald-100 rounded-3xl p-7 md:p-9">
        <CheckCircle className="w-7 h-7 text-emerald-600 flex-shrink-0" />
        <div>
          <p className="text-lg font-bold text-slate-950 mb-1">
            {state === 'sent' ? "Thanks, we've got your results." : 'Your email app should now be open.'}
          </p>
          <p className="text-slate-600">
            {state === 'sent'
              ? "We'll be in touch to talk through what an audit would look at for your business."
              : "Your results are filled in. Press send and we'll be in touch."}
          </p>
        </div>
      </div>
    );
  }

  const input =
    'w-full bg-white border border-slate-200 rounded-xl px-4 py-3.5 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/40 focus:border-emerald-500';

  return (
    <form onSubmit={submit} noValidate className="border-t border-slate-200 pt-10">
      <h4 className="text-xl md:text-2xl font-bold tracking-tight text-slate-950 mb-2">
        Want the real numbers for your business?
      </h4>
      <p className="text-slate-500 mb-6">
        An audit for a business your size costs {price}, and the fee comes off any build. Leave your details and
        we'll get in touch to arrange it. No obligation.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
        <label className="sr-only" htmlFor="lead-name">Your name</label>
        <input id="lead-name" className={input} placeholder="Your name" value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" />
        <label className="sr-only" htmlFor="lead-email">Email address</label>
        <input id="lead-email" type="email" className={input} placeholder="Email address" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email" />
        <label className="sr-only" htmlFor="lead-business">Business name (optional)</label>
        <input id="lead-business" className={input} placeholder="Business name (optional)" value={business} onChange={(e) => setBusiness(e.target.value)} autoComplete="organization" />
      </div>
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        value={website}
        onChange={(e) => setWebsite(e.target.value)}
        className="hidden"
        aria-hidden
      />
      {error && <p className="text-sm text-red-600 mb-4">{error}</p>}
      <div className="flex flex-col sm:flex-row sm:items-center gap-4">
        <button
          type="submit"
          disabled={state === 'sending'}
          className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-slate-950 text-white rounded-full font-bold text-sm tracking-widest uppercase hover:bg-emerald-600 transition-colors disabled:opacity-60"
        >
          {state === 'sending' ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
          Send me my results
          {state !== 'sending' && <ArrowRight className="w-4 h-4" />}
        </button>
        <p className="text-xs text-slate-400">
          We only use your details to reply to you. See our{' '}
          <a href={asset('privacy.html')} className="underline hover:text-slate-700">
            privacy notice
          </a>
          .
        </p>
      </div>
    </form>
  );
};

export default AgentCheck;

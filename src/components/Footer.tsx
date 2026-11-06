import React from 'react';
import { CONTACT_EMAIL, WHATSAPP_URL } from '../constants';
import { asset } from '../lib/asset';

const explore = [
  { name: 'How it works', href: '#services' },
  { name: 'Agents', href: '#agents' },
  { name: 'Free check', href: '#check' },
  { name: 'Our standard', href: '#standard' },
  { name: 'Security', href: '#security' },
];

const Footer: React.FC = () => (
  <footer className="py-16 md:py-20 bg-[#fafafa] border-t border-slate-200">
    <div className="max-w-7xl mx-auto px-6">
      <div className="flex flex-col md:flex-row justify-between items-start gap-12 mb-16">
        <div className="max-w-sm">
          <a href="#top" className="inline-block mb-6">
            <img src={asset('tech-atelier-logo.svg')} alt="Tech Atelier" className="h-8 w-auto" />
          </a>
          <p className="text-slate-500 font-light leading-relaxed">
            Tailor-made, production-grade AI agents for growing businesses. Based in the UK, working with clients worldwide.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-16">
          <div>
            <h4 className="text-xs font-bold tracking-widest text-slate-400 uppercase mb-6">Explore</h4>
            <ul className="space-y-4">
              {explore.map((link) => (
                <li key={link.name}>
                  <a href={link.href} className="text-slate-600 hover:text-slate-950 transition-colors">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-xs font-bold tracking-widest text-slate-400 uppercase mb-6">Contact</h4>
            <ul className="space-y-4">
              <li>
                <a href={`mailto:${CONTACT_EMAIL}`} className="text-slate-600 hover:text-slate-950 transition-colors break-all">
                  {CONTACT_EMAIL}
                </a>
              </li>
              <li>
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-600 hover:text-slate-950 transition-colors"
                >
                  WhatsApp
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-slate-200 gap-4">
        <p className="text-sm text-slate-400">© {new Date().getFullYear()} Tech Atelier. All rights reserved.</p>
        <a href={asset('privacy.html')} className="text-sm text-slate-400 hover:text-slate-900">
          Privacy notice
        </a>
      </div>
    </div>
  </footer>
);

export default Footer;

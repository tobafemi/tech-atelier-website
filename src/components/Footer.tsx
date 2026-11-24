
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="py-20 bg-[#fafafa] border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-start gap-12 mb-20">
          <div className="max-w-sm">
            <a href="#" className="inline-block mb-6">
              <img
                src="/tech-atelier-logo.svg"
                alt="Tech Atelier"
                className="h-8 w-auto max-w-[220px] object-contain"
              />
            </a>
            <p className="text-gray-500 font-light leading-relaxed">
              Technology solutions built to solve your business problems. Web and AI consultancy for small businesses —{' '}
              <a href="mailto:hello@tech-atelier.co.uk" className="text-gray-700 hover:text-black transition-colors">
                hello@tech-atelier.co.uk
              </a>
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-16">
            <div>
              <h4 className="text-xs font-bold tracking-widest text-gray-400 uppercase mb-6">Explore</h4>
              <ul className="space-y-4">
                <li><a href="#services" className="text-gray-600 hover:text-black transition-colors">Services</a></li>
                <li><a href="#agents" className="text-gray-600 hover:text-black transition-colors">Agents</a></li>
                <li><a href="#work-showcase" className="text-gray-600 hover:text-black transition-colors">Projects</a></li>
                <li><a href="#about" className="text-gray-600 hover:text-black transition-colors">About Us</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-xs font-bold tracking-widest text-gray-400 uppercase mb-6">Services</h4>
              <ul className="space-y-4">
                <li><a href="#services" className="text-gray-600 hover:text-black transition-colors">Website Build &amp; Refresh</a></li>
                <li><a href="#services" className="text-gray-600 hover:text-black transition-colors">Growth Marketing</a></li>
                <li><a href="#services" className="text-gray-600 hover:text-black transition-colors">Business Technology Audit</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-xs font-bold tracking-widest text-gray-400 uppercase mb-6">Social</h4>
              <ul className="space-y-4">
                <li><a href="#" className="text-gray-600 hover:text-black transition-colors">LinkedIn</a></li>
                <li><a href="#" className="text-gray-600 hover:text-black transition-colors">Twitter (X)</a></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center pt-10 border-t border-gray-200 gap-6">
          <p className="text-sm text-gray-400">© 2026 Tech Atelier. All rights reserved.</p>
          <div className="flex gap-8">
            <a href="#" className="text-sm text-gray-400 hover:text-gray-900">Privacy Policy</a>
            <a href="#" className="text-sm text-gray-400 hover:text-gray-900">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

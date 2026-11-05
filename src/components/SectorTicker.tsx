import React from 'react';
import { SECTORS_TICKER } from '../constants';

const SectorTicker: React.FC = () => (
  <div className="bg-white border-y border-slate-100 py-12 overflow-hidden" aria-label="Sectors we work with">
    <div className="flex w-max whitespace-nowrap animate-[marquee_30s_linear_infinite] hover:[animation-play-state:paused]">
      {[0, 1].map((copy) => (
        <div key={copy} className="flex items-center gap-16 pr-16" aria-hidden={copy === 1}>
          {SECTORS_TICKER.map((tag) => (
            <React.Fragment key={tag}>
              <span className="text-slate-300 text-lg font-bold tracking-[0.35em] select-none">{tag}</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500/40" />
            </React.Fragment>
          ))}
        </div>
      ))}
    </div>
  </div>
);

export default SectorTicker;

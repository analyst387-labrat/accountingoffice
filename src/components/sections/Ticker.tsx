const TICKER_ITEMS = [
  'Licensed in BiH for accounting & tax',
  'Pantheon · BMD NTCS',
  'DSGVO / GDPR aligned',
  'SLA-backed monthly cadence',
  'DACH mandate desk',
  'Bilingual reporting · DE / EN / BHS',
  '7-person in-house team',
  'Encrypted data transfer',
];

function TickerTrack() {
  return (
    <div className="flex items-center shrink-0" aria-hidden>
      {TICKER_ITEMS.map((item, i) => (
        <span key={i} className="flex items-center gap-5">
          <span
            className="text-[12px] tracking-[0.18em] uppercase text-[#a4a4a0] whitespace-nowrap"
            style={{ fontFamily: 'var(--font-jetbrains-mono), monospace' }}
          >
            {item}
          </span>
          <span
            className="text-[#7fa9c4] text-[14px] shrink-0 mr-5"
            aria-hidden
          >
            ·
          </span>
        </span>
      ))}
    </div>
  );
}

export default function Ticker() {
  return (
    <div
      className="bg-[#14171a] border-t border-b border-[#23282d] overflow-hidden"
      style={{ paddingTop: '14px', paddingBottom: '14px' }}
      aria-hidden
    >
      <style>{`
        @keyframes ticker {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        .ticker-inner {
          display: flex;
          animation: ticker 60s linear infinite;
        }
      `}</style>
      <div className="ticker-inner">
        <TickerTrack />
        <TickerTrack />
      </div>
    </div>
  );
}

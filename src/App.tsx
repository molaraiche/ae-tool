import { useState } from 'react';
import { Invoice } from './features/invoice/Invoice';
import { TaxCalculator } from './features/tax/TaxCalculator';
import './styles.css';
export function App() {
  const [view, setView] = useState<'invoice'|'tax'>('tax');
  return <div className="app-shell"><header className="app-topbar"><a className="brand" href="#home" onClick={(e) => { e.preventDefault(); setView('tax'); }}><span className="brand-mark">ML</span><span><b>Morocco AE</b><small>LOCAL BUSINESS TOOLS</small></span></a><nav><button className={view==='invoice'?'active':''} onClick={() => setView('invoice')}>Invoice</button><button className={view==='tax'?'active':''} onClick={() => setView('tax')}>Tax Calculator</button></nav><div className="local-badge"><i /> Local workspace</div></header><div className="page-wrap">{view === 'invoice' ? <Invoice /> : <TaxCalculator />}</div><footer className="app-footer"><span>Personal utility · Stored in this browser only</span><span>Morocco · MAD</span></footer></div>;
}

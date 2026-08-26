import { Button } from '../components/Button';

interface HomeProps {
  onStart: () => void;
}

export function Home({ onStart }: HomeProps) {
  return (
    <div className="mx-auto flex min-h-screen w-full max-w-md flex-col justify-center px-5 py-8">
      <div className="rounded-4xl border border-slate-700 bg-slate-900/80 p-6 shadow-2xl shadow-slate-950/40 animate-fade-up">
        <div className="mb-8 text-center">
          <p className="text-sm font-bold uppercase tracking-[0.5em] text-rose-400">Party game</p>
          <h1 className="mt-4 text-5xl font-black tracking-tight text-white">IMPOSTER</h1>
          <p className="mt-4 text-sm text-slate-300">Pass the phone, hide the truth, and bluff your way through the round.</p>
        </div>

        <div className="space-y-3">
          <Button onClick={onStart} fullWidth>Start Game</Button>
        </div>
      </div>
    </div>
  );
}

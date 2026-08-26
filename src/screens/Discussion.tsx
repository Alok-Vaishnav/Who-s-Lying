import { Button } from '../components/Button';

interface DiscussionProps {
  onStartVoting: () => void;
  onExit: () => void;
}

export function DiscussionScreen({ onStartVoting, onExit }: DiscussionProps) {
  return (
    <div className="mx-auto flex min-h-screen w-full max-w-lg flex-col justify-center px-5 py-6">
      <div className="rounded-4xl border border-slate-700 bg-slate-900/80 p-6 shadow-2xl shadow-slate-950/50">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-rose-400">Round</p>
        <h2 className="mt-3 text-4xl font-black text-white">Discussion Time</h2>

        <div className="mt-6 rounded-2xl border border-rose-500/40 bg-rose-500/10 p-5 text-center">
          <p className="text-2xl font-black uppercase tracking-wide text-rose-200">Find the imposter or die</p>
        </div>

        <div className="mt-6">
          <Button onClick={onStartVoting} fullWidth>
            Start Voting
          </Button>
        </div>
        <button type="button" onClick={onExit} className="mt-4 w-full text-sm font-semibold text-slate-400 transition hover:text-white">
          Exit Game
        </button>
      </div>
    </div>
  );
}

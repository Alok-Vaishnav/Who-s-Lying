import { Button } from '../components/Button';
import type { Player, Winner } from '../types/game';

interface ResultProps {
  winner: Winner;
  category: string;
  secretWord: string;
  players: Player[];
  onPlayAgain: () => void;
  onHome: () => void;
}

export function ResultScreen({ winner, category, secretWord, players, onPlayAgain, onHome }: ResultProps) {
  const resultTitle = winner === 'innocents' ? 'INNOCENTS WIN 🎉' : 'IMPOSTERS WIN 🔴';
  const imposters = players.filter((player) => player.role === 'imposter');

  return (
    <div className="mx-auto flex min-h-screen w-full max-w-3xl flex-col px-5 py-6">
      <div className="rounded-4xl border border-slate-700 bg-slate-900/80 p-6 shadow-2xl shadow-slate-950/50">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-rose-400">Round summary</p>
          <h2 className="mt-3 text-4xl font-black text-white">{resultTitle}</h2>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <div className="rounded-2xl border border-slate-700 bg-slate-950 p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">Category</p>
            <p className="mt-2 text-2xl font-black text-rose-300">{category}</p>
          </div>
          <div className="rounded-2xl border border-slate-700 bg-slate-950 p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">Secret word</p>
            <p className="mt-2 text-2xl font-black text-white">{secretWord}</p>
          </div>
        </div>

        <div className="mt-8 rounded-2xl border border-rose-400/40 bg-rose-500/10 p-4">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-rose-300">Imposter</p>
          <div className="mt-3 space-y-2">
            {imposters.map((player) => (
              <p key={player.id} className="text-2xl font-black text-white">
                {player.name}
              </p>
            ))}
          </div>
        </div>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <Button onClick={onPlayAgain} className="flex-1">
            Play Again
          </Button>
          <Button variant="secondary" onClick={onHome} className="flex-1">
            Back to Home
          </Button>
        </div>
      </div>
    </div>
  );
}

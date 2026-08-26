import { Button } from '../components/Button';
import type { Player } from '../types/game';

interface RoleRevealProps {
  player: Player | null;
  category: string;
  secretWord: string;
  onReveal: () => void;
  onHide: () => void;
  isVisible: boolean;
  totalPlayers: number;
  currentIndex: number;
  onExit: () => void;
}

export function RoleRevealScreen({ player, category, secretWord, onReveal, onHide, isVisible, totalPlayers, currentIndex, onExit }: RoleRevealProps) {
  const isImposter = player?.role === 'imposter';

  return (
    <div className="mx-auto flex min-h-screen w-full max-w-md flex-col justify-center px-5 py-8">
      <div className="rounded-4xl border border-slate-700 bg-slate-900/85 p-6 shadow-2xl shadow-slate-950/50">
        <p className="text-center text-sm font-semibold uppercase tracking-[0.3em] text-slate-400">
          Pass the phone to
        </p>
        <h2 className="mt-3 text-center text-3xl font-black text-white">{player?.name}</h2>
        <p className="mt-2 text-center text-sm text-slate-300">Only {player?.name} should look at the screen.</p>

        <div className="mt-6 rounded-3xl border border-slate-700 bg-slate-950/80 p-4 text-center">
          {isVisible ? (
            <>
              {isImposter ? (
                <div className="mt-6 rounded-2xl border border-rose-500/40 bg-rose-500/10 p-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-400">Category</p>
                  <p className="mt-3 text-3xl font-black uppercase text-rose-300">{category}</p>
                  <p className="text-sm font-semibold uppercase tracking-[0.2em] text-rose-200">You are the</p>
                  <p className="mt-2 text-3xl font-black text-white">IMPOSTER 🤫</p>
                </div>
              ) : (
                <div className="mt-6 rounded-2xl border border-emerald-500/40 bg-emerald-500/10 p-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-200">Secret</p>
                  <p className="mt-2 text-3xl font-black text-white">{secretWord}</p>
                </div>
              )}
            </>
          ) : (
            <div className="space-y-4 py-3">
              <div className="text-xl font-black text-white">{currentIndex + 1}/{totalPlayers}</div>
              <Button onClick={onReveal} fullWidth>
                Tap to Reveal
              </Button>
            </div>
          )}
        </div>

        {isVisible ? (
          <div className="mt-5">
            <Button variant="secondary" onClick={onHide} fullWidth>
              Hide & Continue
            </Button>
          </div>
        ) : null}

        <button type="button" onClick={onExit} className="mt-4 w-full text-sm font-semibold text-slate-400 transition hover:text-white">
          Exit Game
        </button>
      </div>
    </div>
  );
}

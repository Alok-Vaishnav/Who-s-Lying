import { Button } from '../components/Button';
import type { Player } from '../types/game';

interface RoleGuideProps {
  player: Player;
  playerNumber: number;
  totalPlayers: number;
  secondsRemaining: number;
  onNext: () => void;
  onExit: () => void;
}

export function RoleGuideScreen({ player, playerNumber, totalPlayers, secondsRemaining, onNext, onExit }: RoleGuideProps) {
  return (
    <div className="mx-auto flex min-h-screen w-full max-w-lg flex-col justify-center px-5 py-8">
      <div className="rounded-4xl border border-slate-700 bg-slate-900/85 p-6 shadow-2xl shadow-slate-950/50">
        <p className="text-center text-xs font-bold uppercase tracking-[0.25em] text-rose-300">All roles revealed</p>
        <h2 className="mt-3 text-center text-3xl font-black text-white">Ready to discuss?</h2>
        <p className="mt-2 text-center text-sm text-slate-300">Pass the phone to this player. Names appear in a random order.</p>

        <div className="mt-6 rounded-3xl border border-rose-500/40 bg-rose-500/10 p-8 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">Player {playerNumber} of {totalPlayers}</p>
          <p className="mt-4 text-4xl font-black text-white">{player.name}</p>
        </div>

        <p className="mt-5 text-center text-xs font-bold uppercase tracking-[0.2em] text-amber-300">
          Next player in {secondsRemaining}s
        </p>
        <div className="mt-5">
          <Button onClick={onNext} fullWidth>Next Player</Button>
        </div>
        <div className="mt-3">
          <Button variant="ghost" onClick={onExit} fullWidth>Exit Game</Button>
        </div>
      </div>
    </div>
  );
}

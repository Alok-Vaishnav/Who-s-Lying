import { Button } from '../components/Button';
import type { Player } from '../types/game';

interface VotingProps {
  players: Player[];
  selectedPlayerId: string | null;
  onSelectPlayer: (player: Player) => void;
  onConfirmVote: () => void;
  onCancelVote: () => void;
  onExit: () => void;
}

export function VotingScreen({ players, selectedPlayerId, onSelectPlayer, onConfirmVote, onCancelVote, onExit }: VotingProps) {
  const activePlayers = players.filter((player) => !player.eliminated);
  const selectedPlayer = activePlayers.find((player) => player.id === selectedPlayerId) ?? null;

  return (
    <div className="mx-auto flex min-h-screen w-full max-w-lg flex-col px-5 py-6">
      <header className="mb-6">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-rose-400">Vote</p>
        <h2 className="mt-2 text-3xl font-black text-white">Who is the Imposter?</h2>
      </header>

      <div className="space-y-3">
        {activePlayers.map((player) => (
          <button
            key={player.id}
            type="button"
            onClick={() => onSelectPlayer(player)}
            className={[
              'flex w-full items-center justify-between rounded-2xl border px-4 py-4 text-left transition-all',
              selectedPlayerId === player.id ? 'border-rose-400 bg-rose-500/10' : 'border-slate-700 bg-slate-900/80',
            ].join(' ')}
          >
            <span className="text-base font-semibold text-white">{player.name}</span>
            <span className="rounded-full border border-slate-600 px-2 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-300">
              Vote
            </span>
          </button>
        ))}
      </div>

      {selectedPlayer ? (
        <div className="mt-6 rounded-3xl border border-rose-500/40 bg-rose-500/10 p-4">
          <p className="text-center text-lg font-bold text-white">Vote for {selectedPlayer.name}?</p>
          <div className="mt-4 flex gap-3">
            <Button variant="secondary" onClick={onCancelVote} className="flex-1">
              Cancel
            </Button>
            <Button onClick={onConfirmVote} className="flex-1">
              Confirm Vote
            </Button>
          </div>
        </div>
      ) : null}

      <Button
        variant="primary"
        fullWidth
        onClick={onExit}
        className="mt-6"
      >
        Exit Game
      </Button>
    </div>
  );
}

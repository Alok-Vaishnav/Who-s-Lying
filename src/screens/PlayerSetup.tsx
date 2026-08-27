import { Button } from '../components/Button';

interface PlayerSetupProps {
  players: string[];
  onAddPlayer: () => void;
  onChangePlayer: (index: number, value: string) => void;
  onRemovePlayer: (index: number) => void;
  onBack: () => void;
  onSettings: () => void;
  onContinue: () => void;
  error: string | null;
  canContinue: boolean;
}

export function PlayerSetup({
  players,
  onAddPlayer,
  onChangePlayer,
  onRemovePlayer,
  onBack,
  onSettings,
  onContinue,
  error,
  canContinue,
}: PlayerSetupProps) {
  return (
    <div className="mx-auto flex min-h-screen w-full max-w-lg flex-col px-5 py-6">
      <header className="mb-6">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-rose-400">Players</p>
        <h2 className="mt-2 text-3xl font-black text-white">Add the crew</h2>
      </header>

      <div className="mb-4 flex items-center justify-between rounded-2xl border border-slate-700 bg-slate-900/70 p-3 text-sm text-slate-300">
        <span>Current players</span>
        <span className="font-semibold text-white">{players.length}/20</span>
      </div>

      <div className="space-y-3">
        {players.map((player, index) => (
          <div key={`player-${index}`} className="flex gap-2">
            <input
              aria-label={`Player ${index + 1}`}
              value={player}
              onChange={(event) => onChangePlayer(index, event.target.value)}
              placeholder={`Player ${index + 1}`}
              className="w-full rounded-2xl border border-slate-700 bg-slate-900/80 px-4 py-3 text-base text-white placeholder:text-slate-500 focus:border-rose-400 focus:outline-none"
            />
            {players.length > 3 ? (
              <button
                type="button"
                aria-label={`Remove ${player || `Player ${index + 1}`}`}
                onClick={() => onRemovePlayer(index)}
                className="rounded-2xl border border-slate-700 bg-slate-900 px-3 text-lg text-slate-300 transition hover:border-rose-400 hover:text-rose-300"
              >
                ×
              </button>
            ) : null}
          </div>
        ))}
      </div>

      {error ? (
        <p className="mt-4 rounded-2xl border border-rose-500/40 bg-rose-500/10 px-3 py-2 text-sm text-rose-200">
          {error}
        </p>
      ) : null}

      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <Button variant="secondary" onClick={onBack} className="flex-1">
          Back
        </Button>
        <Button variant="secondary" onClick={onAddPlayer} className="flex-1">
          Add Player
        </Button>
        <Button onClick={onContinue} disabled={!canContinue} className="flex-1">
          Continue
        </Button>
      </div>
      <button
        type="button"
        onClick={onSettings}
        className="mt-auto w-full pt-6 text-sm font-semibold text-slate-400 transition hover:text-white"
      >
        Game Settings
      </button>
    </div>
  );
}

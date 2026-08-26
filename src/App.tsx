import { useEffect, useMemo, useState } from 'react';
import { Modal } from './components/Modal';
import { DiscussionScreen } from './screens/Discussion';
import { Home } from './screens/Home';
import { PlayerSetup } from './screens/PlayerSetup';
import { ResultScreen } from './screens/Result';
import { RoleRevealScreen } from './screens/RoleReveal';
import { SettingsScreen } from './screens/Settings';
import { VotingScreen } from './screens/Voting';
import type { CategorySelection, GamePhase, GameState, Player, Role, Settings } from './types/game';
import { getMaxImposters, validatePlayerNames, createNewRound, checkWinCondition } from './utils/gameLogic';

const STORAGE_KEYS = {
  players: 'imposter-player-names',
  settings: 'imposter-settings',
};

const defaultPlayers = ['Player 1', 'Player 2', 'Player 3'];

const defaultSettings: Settings = {
  imposters: 1,
  category: 'Random',
};

function loadStoredPlayers(): string[] {
  const storedValue = localStorage.getItem(STORAGE_KEYS.players);

  if (!storedValue) {
    return defaultPlayers;
  }

  try {
    const parsed = JSON.parse(storedValue) as string[];
    return parsed.length ? parsed : defaultPlayers;
  } catch {
    return defaultPlayers;
  }
}

function loadStoredSettings(): Settings {
  const storedValue = localStorage.getItem(STORAGE_KEYS.settings);

  if (!storedValue) {
    return defaultSettings;
  }

  try {
    const parsed = JSON.parse(storedValue) as Partial<Settings>;
    const storedCategory = parsed.category;
    const category =
      storedCategory === 'Random'
        ? storedCategory
        : Array.isArray(storedCategory)
          ? storedCategory
          : storedCategory
            ? [storedCategory]
            : defaultSettings.category;

    return {
      ...defaultSettings,
      ...parsed,
      category,
    } as Settings;
  } catch {
    return defaultSettings;
  }
}

function getRemainingAllowedInnocentEliminations(players: Player[]): number {
  const totalImposters = players.filter((player) => player.role === 'imposter').length;
  const eliminatedInnocents = players.filter(
    (player) => player.eliminated && player.role === 'innocent',
  ).length;

  return Math.max(0, totalImposters - 1 - eliminatedInnocents);
}

function App() {
  const [screen, setScreen] = useState<GamePhase>('home');
  const [players, setPlayers] = useState<string[]>(() => loadStoredPlayers());
  const [settings, setSettings] = useState<Settings>(() => loadStoredSettings());
  const [game, setGame] = useState<GameState | null>(null);
  const [revealVisible, setRevealVisible] = useState(false);
  const [selectedVoteId, setSelectedVoteId] = useState<string | null>(null);
  const [pendingElimination, setPendingElimination] = useState<{ name: string; role: Role } | null>(null);

  const setupValidation = useMemo(() => validatePlayerNames(players), [players]);
  const maxImposters = getMaxImposters(players.length);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.players, JSON.stringify(players));
  }, [players]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.settings, JSON.stringify(settings));
  }, [settings]);

  function handleAddPlayer() {
    if (players.length >= 20) {
      return;
    }

    setPlayers((currentPlayers) => [...currentPlayers, '']);
  }

  function handleRemovePlayer(index: number) {
    if (players.length <= 3) {
      return;
    }

    setPlayers((currentPlayers) => currentPlayers.filter((_, itemIndex) => itemIndex !== index));
  }

  function handlePlayerChange(index: number, value: string) {
    setPlayers((currentPlayers) => {
      const nextPlayers = [...currentPlayers];
      nextPlayers[index] = value;
      return nextPlayers;
    });
  }

  function handleSettingsImposters(value: number) {
    const safeValue = Math.min(Math.max(1, value), maxImposters || 1);
    setSettings((currentSettings) => ({ ...currentSettings, imposters: safeValue }));
  }

  function handleSettingsCategory(value: CategorySelection) {
    setSettings((currentSettings) => ({ ...currentSettings, category: value }));
  }

  function handleStartGame() {
    setScreen('setup');
  }

  function handleOpenSettings() {
    setScreen('settings');
  }

  function handleBackToSetup() {
    setScreen('setup');
  }

  function handleBackToHome() {
    setScreen('home');
    setGame(null);
    setPendingElimination(null);
    setSelectedVoteId(null);
    setRevealVisible(false);
  }

  function handleSetupContinue() {
    if (setupValidation) {
      return;
    }

    handleSettingsContinue();
  }

  function handleSaveSettings() {
    const safeImposters = Math.min(settings.imposters, maxImposters || 1);
    setSettings((currentSettings) => ({ ...currentSettings, imposters: safeImposters }));
    setScreen('setup');
  }

  function handleSettingsContinue() {
    const safeImposters = Math.min(settings.imposters, maxImposters || 1);
    const finalSettings = { ...settings, imposters: safeImposters };
    setSettings(finalSettings);

    const round = createNewRound(players, finalSettings);
    setGame(round);
    setRevealVisible(false);
    setPendingElimination(null);
    setSelectedVoteId(null);
    setScreen('reveal');
  }

  function handleRevealRole() {
    setRevealVisible(true);
  }

  function handleHideRole() {
    if (!game) {
      return;
    }

    const isLastPlayer = game.currentPlayerIndex >= game.players.length - 1;

    if (isLastPlayer) {
      setRevealVisible(false);
      setScreen('discussion');
      return;
    }

    setGame((currentGame) =>
      currentGame ? { ...currentGame, currentPlayerIndex: currentGame.currentPlayerIndex + 1 } : currentGame,
    );
    setRevealVisible(false);
  }

  function handleStartVoting() {
    setScreen('voting');
  }

  function handleVoteSelection(player: Player) {
    setSelectedVoteId(player.id);
  }

  function handleConfirmVote() {
    if (!game || !selectedVoteId) {
      return;
    }

    const selectedPlayer = game.players.find((player) => player.id === selectedVoteId && !player.eliminated);

    if (!selectedPlayer) {
      return;
    }

    const updatedPlayers = game.players.map((player) =>
      player.id === selectedPlayer.id ? { ...player, eliminated: true } : player,
    );

    const remainingImposters = updatedPlayers.filter(
      (player) => !player.eliminated && player.role === 'imposter',
    ).length;
    const winner = checkWinCondition(updatedPlayers);

    setGame({
      ...game,
      players: updatedPlayers,
      remainingImposters,
      winner,
    });
    setSelectedVoteId(null);

    if (winner) {
      setPendingElimination(null);
      setScreen('result');
      return;
    }

    setPendingElimination({
      name: selectedPlayer.name,
      role: selectedPlayer.role,
    });
  }

  function handleContinueAfterElimination() {
    setPendingElimination(null);
    setScreen('voting');
  }

  function handlePlayAgain() {
    const nextGame = createNewRound(players, settings);
    setGame(nextGame);
    setRevealVisible(false);
    setPendingElimination(null);
    setSelectedVoteId(null);
    setScreen('reveal');
  }

  function handleBackHome() {
    setScreen('home');
    setGame(null);
    setPendingElimination(null);
    setSelectedVoteId(null);
    setRevealVisible(false);
  }

  if (screen === 'home') {
    return <Home onStart={handleStartGame} />;
  }

  if (screen === 'setup') {
    return (
      <PlayerSetup
        players={players}
        onAddPlayer={handleAddPlayer}
        onChangePlayer={handlePlayerChange}
        onRemovePlayer={handleRemovePlayer}
        onBack={handleBackToHome}
        onSettings={handleOpenSettings}
        onContinue={handleSetupContinue}
        error={setupValidation}
        canContinue={setupValidation === null}
      />
    );
  }

  if (screen === 'settings') {
    return (
      <SettingsScreen
        imposters={settings.imposters}
        category={settings.category}
        onSetImposters={handleSettingsImposters}
        onSetCategory={handleSettingsCategory}
        onBack={handleBackToSetup}
        onSave={handleSaveSettings}
        maxImposters={maxImposters}
      />
    );
  }

  if (screen === 'reveal' && game) {
    const currentPlayer = game.players[game.currentPlayerIndex] ?? null;

    return (
      <>
        <RoleRevealScreen
          player={currentPlayer}
          category={game.category}
          secretWord={game.secretWord}
          onReveal={handleRevealRole}
          onHide={handleHideRole}
          isVisible={revealVisible}
          totalPlayers={game.players.length}
          currentIndex={game.currentPlayerIndex}
          onExit={handleBackHome}
        />
      </>
    );
  }

  if (screen === 'discussion' && game) {
    return (
      <DiscussionScreen
        onStartVoting={handleStartVoting}
        onExit={handleBackHome}
      />
    );
  }

  if (screen === 'voting' && game) {
    return (
      <>
        <VotingScreen
          players={game.players}
          selectedPlayerId={selectedVoteId}
          onSelectPlayer={handleVoteSelection}
          onConfirmVote={handleConfirmVote}
          onCancelVote={() => setSelectedVoteId(null)}
          onExit={handleBackHome}
        />

        {pendingElimination ? (
          <Modal
            isOpen={Boolean(pendingElimination)}
            title={`${pendingElimination.name} was an...`}
            message={pendingElimination.role === 'imposter' ? 'IMPOSTER' : 'INNOCENT'}
          >
            <div className="rounded-2xl border border-slate-700 bg-slate-950 p-5 text-center">
              <p className="text-3xl font-black text-white">
                {pendingElimination.role === 'imposter' ? 'IMPOSTER' : 'OOPS! INNOCENT'}
              </p>
              {pendingElimination.role === 'imposter' ? (
                <p className="mt-3 text-sm font-semibold uppercase tracking-[0.18em] text-rose-300">
                  {game.remainingImposters} {game.remainingImposters === 1 ? 'imposter' : 'imposters'} remaining
                </p>
              ) : (
                <p className="mt-3 text-sm font-semibold uppercase tracking-[0.18em] text-amber-300">
                  {getRemainingAllowedInnocentEliminations(game.players) > 0
                    ? `${getRemainingAllowedInnocentEliminations(game.players)} innocent kill${getRemainingAllowedInnocentEliminations(game.players) === 1 ? '' : 's'} remaining`
                    : 'Next innocent eliminated = IMPOSTERS WIN'}
                </p>
              )}
            </div>
            <div className="mt-4">
              <button
                type="button"
                onClick={handleContinueAfterElimination}
                className="w-full rounded-2xl bg-rose-500 px-4 py-3 text-base font-bold text-white transition hover:bg-rose-400"
              >
                Continue
              </button>
            </div>
          </Modal>
        ) : null}
      </>
    );
  }

  if (screen === 'result' && game) {
    return (
      <ResultScreen
        winner={game.winner ?? 'innocents'}
        category={game.category}
        secretWord={game.secretWord}
        players={game.players}
        onPlayAgain={handlePlayAgain}
        onHome={handleBackHome}
      />
    );
  }

  return null;
}

export default App;

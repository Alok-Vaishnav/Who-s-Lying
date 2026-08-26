import { CATEGORY_ITEMS, getCategoryItems } from '../data/categories';
import type { CategoryName, CategorySelection, GameState, Player, Settings } from '../types/game';
import { getRandomItem, makeId, shuffleArray } from './random';

export const MIN_PLAYERS = 3;
export const MAX_PLAYERS = 20;

export function validatePlayerNames(names: string[]): string | null {
  const cleaned = names.map((name) => name.trim());

  if (cleaned.some((name) => !name)) {
    return 'Give every player a name before starting the game.';
  }

  if (cleaned.length < MIN_PLAYERS) {
    return 'Add at least 3 players to start the game.';
  }

  if (cleaned.length > MAX_PLAYERS) {
    return 'You can have up to 20 players.';
  }

  const seen = new Set<string>();

  for (const name of cleaned) {
    if (seen.has(name.toLowerCase())) {
      return `Duplicate player name: ${name}`;
    }

    seen.add(name.toLowerCase());
  }

  return null;
}

export function getMaxImposters(playerCount: number): number {
  if (playerCount < MIN_PLAYERS) {
    return 0;
  }

  return Math.min(4, Math.max(0, Math.floor((playerCount - 1) / 2)));
}

export function getCategoryForRound(categorySetting: CategorySelection): CategoryName {
  if (categorySetting === 'Random') {
    return getRandomItem(Object.keys(CATEGORY_ITEMS) as CategoryName[]);
  }

  return getRandomItem(categorySetting);
}

export function createNewRound(playerNames: string[], settings: Settings): GameState {
  const normalizedNames = playerNames.map((name) => name.trim()).filter(Boolean);
  const category = getCategoryForRound(settings.category);
  const secretWord = getRandomItem(getCategoryItems(category));
  const players: Player[] = normalizedNames.map((name) => ({
    id: makeId('player'),
    name,
    role: 'innocent',
    eliminated: false,
  }));

  const imposterIds = shuffleArray(players.map((player) => player.id)).slice(0, settings.imposters);

  const assignedPlayers = players.map((player) => ({
    ...player,
    role: imposterIds.includes(player.id) ? 'imposter' : 'innocent',
  }));

  const remainingImposters = assignedPlayers.filter((player) => player.role === 'imposter').length;

  return {
    players: assignedPlayers,
    category,
    secretWord,
    currentPlayerIndex: 0,
    remainingImposters,
    gamePhase: 'reveal',
    winner: null,
  };
}

export function checkWinCondition(players: Player[]): 'innocents' | 'imposters' | null {
  const remainingImposters = players.filter((player) => !player.eliminated && player.role === 'imposter').length;
  const totalImposters = players.filter((player) => player.role === 'imposter').length;
  const eliminatedInnocents = players.filter((player) => player.eliminated && player.role === 'innocent').length;

  if (remainingImposters === 0) {
    return 'innocents';
  }

  if (eliminatedInnocents > totalImposters - 1) {
    return 'imposters';
  }

  return null;
}

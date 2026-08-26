export type CategoryName = 'Sport' | 'Music' | 'Book' | 'Movie' | 'Country' | 'Famous People';
export type CategorySelection = CategoryName[] | 'Random';
export type Role = 'imposter' | 'innocent';
export type GamePhase = 'home' | 'setup' | 'settings' | 'reveal' | 'discussion' | 'voting' | 'result';
export type Winner = 'innocents' | 'imposters';

export interface Player {
  id: string;
  name: string;
  role: Role;
  eliminated: boolean;
}

export interface Settings {
  imposters: number;
  category: CategorySelection;
}

export interface GameState {
  players: Player[];
  category: CategoryName;
  secretWord: string;
  currentPlayerIndex: number;
  remainingImposters: number;
  gamePhase: GamePhase;
  winner: Winner | null;
}

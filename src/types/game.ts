export type CategoryName = 'Sport' | 'Singer' | 'Music' | 'Book' | 'Movie' | 'Country' | 'Famous People' | 'Meme and Dialog';
export type CategorySelection = CategoryName[] | 'Random';
export type Role = 'imposter' | 'innocent';
export type GamePhase = 'home' | 'setup' | 'settings' | 'reveal' | 'roleGuide' | 'discussion' | 'voting' | 'result';
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
  roleGuideEnabled: boolean;
  roleGuideSeconds: number;
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

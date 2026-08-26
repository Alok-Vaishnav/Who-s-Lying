# IMPOSTER

IMPOSTER is a pass-the-phone party game. Most players receive the same secret word. Imposters only receive the category and must bluff their way through discussion and voting.

## Features

- Supports 3 to 20 players.
- Supports 1 to 4 imposters, based on the number of players.
- Select one category, multiple categories, or Random.
- Pass-and-reveal role screen for each player.
- Discussion, voting, elimination, and result screens.
- Saves player names and game settings in browser local storage.

## Game Flow

1. Click **Start Game**.
2. Add or edit every player name on **Add the crew**.
3. Use **Game Settings** to change imposters or categories.
4. Select one or more categories, such as Music and Book.
5. Click **Save** to save the choices and return to Add the crew.
6. Click **Continue** on Add the crew to create the round.
7. Pass the phone to each player and use **Tap to Reveal**.
8. After all roles are revealed, discuss and start voting.
9. Select an active player and confirm the vote.
10. Continue voting until one side wins.

## Rules

### Player names

- At least 3 players are required.
- At most 20 players are allowed.
- Every visible player field must contain a name.
- Player names must be unique, ignoring capitalization.

### Imposters

The maximum number of imposters is `min(4, floor((player count - 1) / 2))`.

| Players | Maximum imposters |
| ---: | ---: |
| 3-4 | 1 |
| 5-6 | 2 |
| 7-8 | 3 |
| 9-20 | 4 |

The default is 1 imposter.

### Winning

- Innocents win when all imposters are eliminated.
- Imposters win when eliminated innocents are greater than total imposters minus 1.
- Eliminated players cannot be voted for again.

## Categories

Available categories are Sport, Music, Book, Movie, Country, and Famous People.

Selecting **Random** allows the app to choose from all categories. Selecting one or more named categories makes the app randomly choose one selected category for the round, then randomly choose a word from that category.

## Persistence

The app uses `localStorage` and does not require a backend or account.

| Key | Stored value |
| --- | --- |
| `imposter-player-names` | Player name list |
| `imposter-settings` | Imposter count and category selection |

Player names and settings are loaded when the app starts. Active game state is not persisted.

## Project Structure

```text
my-react-app/
|-- index.html
|-- package.json
|-- vite.config.js
|-- public/
`-- src/
    |-- App.tsx                 # Main screen state and game actions
    |-- index.css               # Global styles and Tailwind import
    |-- main.jsx                # React entry point
    |-- components/             # Shared Button and Modal components
    |-- data/                   # Category names and secret words
    |-- screens/                # Home, setup, settings, reveal, vote, result
    |-- types/                  # Shared TypeScript types
    `-- utils/                  # Game rules and random helpers
```

## Technology

- React 19
- TypeScript
- Vite
- Tailwind CSS 4
- Oxlint

## Setup

Requirements: Node.js 18 or newer and npm.

```bash
npm install
```

## Commands

Start the development server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

Run lint:

```bash
npm run lint
```

Preview the production build:

```bash
npm run preview
```

## Limitations

- Refreshing the page ends the active round.
- There is no online multiplayer, server, authentication, or database.
- There are currently no automated unit or end-to-end tests.

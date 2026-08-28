import { Button } from '../components/Button';
import { CATEGORY_OPTIONS } from '../data/categories';
import type { CategorySelection } from '../types/game';

interface SettingsProps {
  imposters: number;
  category: CategorySelection;
  roleGuideEnabled: boolean;
  roleGuideSeconds: number;
  onSetImposters: (value: number) => void;
  onSetCategory: (value: CategorySelection) => void;
  onSetRoleGuideEnabled: (value: boolean) => void;
  onSetRoleGuideSeconds: (value: number) => void;
  onBack: () => void;
  onSave: () => void;
  maxImposters: number;
}

export function SettingsScreen({
  imposters,
  category,
  roleGuideEnabled,
  roleGuideSeconds,
  onSetImposters,
  onSetCategory,
  onSetRoleGuideEnabled,
  onSetRoleGuideSeconds,
  onBack,
  onSave,
  maxImposters,
}: SettingsProps) {
  const imposterOptions = [1, 2, 3, 4].filter((value) => value <= maxImposters);

  return (
    <div className="mx-auto flex min-h-screen w-full max-w-lg flex-col px-5 py-6 max-[400px]:px-4 max-[400px]:py-4">
      <header className="mb-6 max-[400px]:mb-4">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-rose-400">Settings</p>
        <h2 className="mt-2 text-3xl font-black text-white">Game setup</h2>
      </header>

      <div className="space-y-5 max-[400px]:space-y-4">
        <section className="rounded-3xl border border-slate-700 bg-slate-900/80 p-4">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-slate-400">Imposters</p>
          <div className="grid grid-cols-4 gap-2">
            {imposterOptions.map((value) => (
              <button
                key={value}
                type="button"
                onClick={() => onSetImposters(value)}
                className={[
                  'rounded-2xl border px-3 py-3 text-base font-bold transition',
                  imposters === value ? 'border-rose-400 bg-rose-500/15 text-rose-200' : 'border-slate-700 bg-slate-950 text-slate-200',
                ].join(' ')}
              >
                {value}
              </button>
            ))}
          </div>
        </section>

        <section className="rounded-3xl border border-slate-700 bg-slate-900/80 p-4">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-slate-400">Category</p>
          <div className="grid grid-cols-2 gap-2">
            {CATEGORY_OPTIONS.map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => {
                  if (option === 'Random') {
                    onSetCategory('Random');
                    return;
                  }

                  const selectedCategories = category === 'Random' ? [] : category;
                  const nextCategories = selectedCategories.includes(option)
                    ? selectedCategories.filter((item) => item !== option)
                    : [...selectedCategories, option];

                  onSetCategory(nextCategories.length ? nextCategories : 'Random');
                }}
                className={[
                  'rounded-2xl border px-3 py-3 text-left text-sm font-medium transition',
                  (option === 'Random' && category === 'Random') ||
                  (option !== 'Random' && category !== 'Random' && category.includes(option))
                    ? 'border-rose-400 bg-rose-500/15 text-rose-100'
                    : 'border-slate-700 bg-slate-950 text-slate-200',
                ].join(' ')}
              >
                {option}
              </button>
            ))}
          </div>
        </section>

        <section className="rounded-3xl border border-slate-700 bg-slate-900/80 p-4">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-400">Role guide timer</p>
              <p className="mt-1 text-xs text-slate-500">Show player names and role guidance after all reveals.</p>
            </div>
            <input
              type="checkbox"
              aria-label="Enable role guide timer"
              checked={roleGuideEnabled}
              onChange={(event) => onSetRoleGuideEnabled(event.target.checked)}
              className="h-5 w-5 accent-rose-400"
            />
          </div>
          {roleGuideEnabled ? (
            <div className="mt-4 flex items-center gap-3">
              <label htmlFor="role-guide-seconds" className="text-sm text-slate-300">Seconds</label>
              <input
                id="role-guide-seconds"
                type="number"
                min="5"
                max="60"
                value={roleGuideSeconds}
                onChange={(event) => onSetRoleGuideSeconds(Number(event.target.value))}
                className="w-24 rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-white focus:border-rose-400 focus:outline-none"
              />
              <span className="text-xs text-slate-500">5–60</span>
            </div>
          ) : null}
        </section>

      </div>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row max-[400px]:mt-4">
        <Button variant="secondary" onClick={onBack} className="flex-1">Back</Button>
        <Button onClick={onSave} className="flex-1">Save</Button>
      </div>
    </div>
  );
}

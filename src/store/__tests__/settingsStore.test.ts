import { beforeEach, describe, expect, it } from 'vitest';
import { CARD_BACKS, defaultSettings, Settings, useSettingsStore } from '../settingsStore';

describe('settingsStore — cardBack', () => {
  beforeEach(() => {
    useSettingsStore.setState({ settings: defaultSettings() });
  });

  it('defaults cardBack to the Tennis and Rosé design', () => {
    expect(defaultSettings().cardBack).toBe('tennis-rose');
  });

  it('CARD_BACKS lists the custom design first', () => {
    expect(CARD_BACKS).toEqual(['tennis-rose', 'navy', 'crimson', 'emerald']);
  });

  it('update() patches cardBack', () => {
    useSettingsStore.getState().update({ cardBack: 'crimson' });
    expect(useSettingsStore.getState().settings.cardBack).toBe('crimson');
  });

  it('hydrate() of a payload without cardBack falls back to Tennis and Rosé', () => {
    const legacy = {
      schemaVersion: 1,
      drawCount: 1,
      sound: true,
      haptics: true,
      animations: true,
      handedness: 'right',
      requireWinnable: false,
      language: 'en',
    } as unknown as Settings;
    useSettingsStore.getState().hydrate(legacy);
    expect(useSettingsStore.getState().settings.cardBack).toBe('tennis-rose');
  });
});

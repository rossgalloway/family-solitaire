import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { makeCard, type Rank, type Suit } from '@/game/card';
import { CardView } from '../Card';

describe('family court card artwork', () => {
  it.each([
    ['h', 1, 'ace-red'],
    ['s', 1, 'ace-black'],
    ['d', 11, 'jack-red'],
    ['c', 11, 'jack-black'],
    ['h', 12, 'queen'],
    ['s', 13, 'king'],
  ] as const)('maps %s%s to the approved portrait', (suit, rank, assetName) => {
    const { container } = render(<CardView card={makeCard(suit as Suit, rank as Rank, true)} />);
    const portrait = container.querySelector<HTMLImageElement>('.card__portrait');

    expect(portrait).not.toBeNull();
    expect(portrait!.src).toContain(assetName);
    expect(container.querySelector('.card__center')).toBeNull();
  });

  it('keeps number cards on the original center-pip treatment', () => {
    const { container } = render(<CardView card={makeCard('h', 7, true)} />);

    expect(container.querySelector('.card__portrait')).toBeNull();
    expect(container.querySelector('.card__center')).not.toBeNull();
  });
});

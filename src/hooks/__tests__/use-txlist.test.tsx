import React from 'react';
import { createRoot } from 'react-dom/client';

import useTxlist from '@/hooks/use-txlist';

let container: HTMLDivElement;
beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement('div');
  document.body.appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
  container.remove();
});

it('useTxlist hook runs correctly', async () => {
  const root = createRoot(container);

  root.render(<TestComponent />);

  expect(container.textContent).toBe('');
});

function TestComponent() {
  const { txlist } = useTxlist();

  return <div>{txlist ? txlist.length : ''}</div>;
}

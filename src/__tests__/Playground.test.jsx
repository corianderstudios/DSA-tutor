import React from 'react';
import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Playground from '../components/Playground.jsx';

describe('Playground', () => {
  it('runs the initial code and displays console output', async () => {
    const user = userEvent.setup();
    render(<Playground topicId="demo" initialCode="console.log('hi there');" />);

    await user.click(screen.getByRole('button', { name: /run code/i }));

    expect(await screen.findByText('hi there')).toBeInTheDocument();
  });

  it('lets the user edit the code before running it', async () => {
    const user = userEvent.setup();
    render(<Playground topicId="demo" initialCode="console.log(1);" />);

    const editor = screen.getByLabelText(/editable javascript playground code/i);
    await user.clear(editor);
    await user.type(editor, "console.log('edited');");
    await user.click(screen.getByRole('button', { name: /run code/i }));

    expect(await screen.findByText('edited')).toBeInTheDocument();
  });

  it('shows a friendly error message for broken code', async () => {
    const user = userEvent.setup();
    render(<Playground topicId="demo" initialCode="throw new Error('boom');" />);

    await user.click(screen.getByRole('button', { name: /run code/i }));

    expect(await screen.findByText(/boom/)).toBeInTheDocument();
  });

  it('resets edited code back to the original example', async () => {
    const user = userEvent.setup();
    render(<Playground topicId="demo" initialCode="console.log('original');" />);

    const editor = screen.getByLabelText(/editable javascript playground code/i);
    await user.clear(editor);
    await user.type(editor, "console.log('changed');");
    await user.click(screen.getByRole('button', { name: /reset to example/i }));

    expect(editor).toHaveValue("console.log('original');");
  });
});

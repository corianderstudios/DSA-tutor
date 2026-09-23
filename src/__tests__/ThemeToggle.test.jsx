import React from 'react';
import { describe, expect, it, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ThemeToggle from '../components/ThemeToggle.jsx';
import { ThemeProvider } from '../context/ThemeContext.jsx';

function renderWithTheme() {
  return render(
    <ThemeProvider>
      <ThemeToggle />
    </ThemeProvider>
  );
}

describe('ThemeToggle', () => {
  beforeEach(() => {
    window.localStorage.clear();
    document.documentElement.classList.remove('dark');
  });

  it('defaults to light mode', () => {
    renderWithTheme();
    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('aria-pressed', 'false');
    expect(screen.getByText('Light mode')).toBeInTheDocument();
  });

  it('switches to dark mode when activated, and updates the document root', async () => {
    const user = userEvent.setup();
    renderWithTheme();

    await user.click(screen.getByRole('button'));

    expect(screen.getByText('Dark mode')).toBeInTheDocument();
    expect(screen.getByRole('button')).toHaveAttribute('aria-pressed', 'true');
    expect(document.documentElement.classList.contains('dark')).toBe(true);
  });

  it('toggles back to light mode on a second activation', async () => {
    const user = userEvent.setup();
    renderWithTheme();

    const button = screen.getByRole('button');
    await user.click(button);
    await user.click(button);

    expect(screen.getByText('Light mode')).toBeInTheDocument();
    expect(document.documentElement.classList.contains('dark')).toBe(false);
  });
});

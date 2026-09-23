import React from 'react';
import { describe, expect, it, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App.jsx';
import { ThemeProvider } from '../context/ThemeContext.jsx';
import { topics } from '../data/topics.js';

function renderApp() {
  return render(
    <ThemeProvider>
      <App />
    </ThemeProvider>
  );
}

describe('App', () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it('renders the first topic by default', () => {
    renderApp();
    expect(screen.getByRole('heading', { level: 1, name: topics[0].title })).toBeInTheDocument();
  });

  it('switches the main content when a different topic is selected', async () => {
    const user = userEvent.setup();
    renderApp();

    const target = topics[2];
    await user.click(screen.getByRole('button', { name: new RegExp(target.title) }));

    expect(screen.getByRole('heading', { level: 1, name: target.title })).toBeInTheDocument();
  });

  it('includes a skip-to-content link for keyboard users', () => {
    renderApp();
    expect(screen.getByRole('link', { name: /skip to main content/i })).toHaveAttribute(
      'href',
      '#main-content'
    );
  });

  it('opens the mobile topic menu from the header button', async () => {
    const user = userEvent.setup();
    renderApp();

    const openButton = screen.getByRole('button', { name: /open topic menu/i });
    expect(openButton).toHaveAttribute('aria-expanded', 'false');

    await user.click(openButton);
    expect(openButton).toHaveAttribute('aria-expanded', 'true');
  });

  it('renders a theme toggle in the header', () => {
    renderApp();
    expect(screen.getByRole('button', { name: /light mode/i })).toBeInTheDocument();
  });
});

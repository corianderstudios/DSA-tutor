import React from 'react';
import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Sidebar from '../components/Sidebar.jsx';
import { topics } from '../data/topics.js';

describe('Sidebar', () => {
  it('renders every topic as a navigable item', () => {
    render(<Sidebar selectedTopicId={topics[0].id} onSelectTopic={() => {}} isOpen onClose={() => {}} />);
    topics.forEach((topic) => {
      expect(screen.getByRole('button', { name: new RegExp(topic.title) })).toBeInTheDocument();
    });
  });

  it('marks the selected topic with aria-current', () => {
    render(<Sidebar selectedTopicId={topics[0].id} onSelectTopic={() => {}} isOpen onClose={() => {}} />);
    const selectedButton = screen.getByRole('button', { name: new RegExp(topics[0].title) });
    expect(selectedButton).toHaveAttribute('aria-current', 'page');
  });

  it('filters topics as the user types in the search box', async () => {
    const user = userEvent.setup();
    render(<Sidebar selectedTopicId={topics[0].id} onSelectTopic={() => {}} isOpen onClose={() => {}} />);

    await user.type(screen.getByRole('searchbox'), 'Binary Search');

    expect(screen.getByRole('button', { name: /Binary Search/ })).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /Hash Tables/ })).not.toBeInTheDocument();
  });

  it('shows a "no results" message when the search matches nothing', async () => {
    const user = userEvent.setup();
    render(<Sidebar selectedTopicId={topics[0].id} onSelectTopic={() => {}} isOpen onClose={() => {}} />);

    await user.type(screen.getByRole('searchbox'), 'zzzzzz-not-a-topic');

    expect(screen.getByText(/No topics match/)).toBeInTheDocument();
  });

  it('collapses and expands a category when its heading button is clicked', async () => {
    const user = userEvent.setup();
    render(<Sidebar selectedTopicId={topics[0].id} onSelectTopic={() => {}} isOpen onClose={() => {}} />);

    const categoryButton = screen.getByRole('button', { name: /Foundations/ });
    expect(categoryButton).toHaveAttribute('aria-expanded', 'true');

    await user.click(categoryButton);
    expect(categoryButton).toHaveAttribute('aria-expanded', 'false');

    await user.click(categoryButton);
    expect(categoryButton).toHaveAttribute('aria-expanded', 'true');
  });

  it('calls onSelectTopic and onClose when a topic is chosen', async () => {
    const user = userEvent.setup();
    const onSelectTopic = vi.fn();
    const onClose = vi.fn();
    render(<Sidebar selectedTopicId={topics[0].id} onSelectTopic={onSelectTopic} isOpen onClose={onClose} />);

    await user.click(screen.getByRole('button', { name: new RegExp(topics[1].title) }));

    expect(onSelectTopic).toHaveBeenCalledWith(topics[1].id);
    expect(onClose).toHaveBeenCalled();
  });
});

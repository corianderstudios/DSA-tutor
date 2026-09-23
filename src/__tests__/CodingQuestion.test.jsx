import React from 'react';
import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CodingQuestion from '../components/CodingQuestion.jsx';

const question = {
  prompt: 'Write `double(n)` that returns n doubled.',
  functionName: 'double',
  starterCode: 'function double(n) {\n  // Your code here.\n}',
  tests: [
    { args: [2], expected: 4 },
    { args: [5], expected: 10 },
  ],
};

describe('CodingQuestion', () => {
  it('renders the prompt text', () => {
    render(<CodingQuestion topicId="demo" question={question} />);
    expect(screen.getByText(/Write `double\(n\)`/)).toBeInTheDocument();
  });

  it('reports all tests passing for a correct solution', async () => {
    const user = userEvent.setup();
    render(<CodingQuestion topicId="demo" question={question} />);

    const editor = screen.getByLabelText(/your solution code/i);
    await user.clear(editor);
    await user.type(editor, 'function double(n) {{ return n * 2; }}');
    await user.click(screen.getByRole('button', { name: /run tests/i }));

    expect(await screen.findByText(/All 2 tests passed/)).toBeInTheDocument();
  });

  it('reports partial failures for an incorrect solution', async () => {
    const user = userEvent.setup();
    render(<CodingQuestion topicId="demo" question={question} />);

    const editor = screen.getByLabelText(/your solution code/i);
    await user.clear(editor);
    await user.type(editor, 'function double(n) {{ return n; }}');
    await user.click(screen.getByRole('button', { name: /run tests/i }));

    expect(await screen.findByText(/0 of 2 tests passed/)).toBeInTheDocument();
  });

  it('shows a compile error when the required function is missing', async () => {
    const user = userEvent.setup();
    render(<CodingQuestion topicId="demo" question={question} />);

    const editor = screen.getByLabelText(/your solution code/i);
    await user.clear(editor);
    await user.type(editor, 'const notAFunction = 1;');
    await user.click(screen.getByRole('button', { name: /run tests/i }));

    expect(await screen.findByText(/Define a function named/)).toBeInTheDocument();
  });

  it('resets to the starter code', async () => {
    const user = userEvent.setup();
    render(<CodingQuestion topicId="demo" question={question} />);

    const editor = screen.getByLabelText(/your solution code/i);
    await user.clear(editor);
    await user.type(editor, 'garbage');
    await user.click(screen.getByRole('button', { name: /reset to starter code/i }));

    expect(editor).toHaveValue(question.starterCode);
  });
});

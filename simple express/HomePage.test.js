// HomePage.test.js
import { render, screen, fireEvent } from '@testing-library/react';
import HomePage from './HomePage'; // Adjust the import to where your component is located

describe('HomePage Component', () => {
  test('renders the home page heading', () => {
    render(<HomePage />);
    const heading = screen.getByText(/Welcome to the Home Page/i);
    expect(heading).toBeInTheDocument();
  });

  test('toggles visibility of content on button click', () => {
    render(<HomePage />);

    // Initial state: content should be hidden
    const hiddenContent = screen.queryByText(/Now you can see me!/i);
    expect(hiddenContent).toBeNull();

    // Click the toggle button
    const toggleButton = screen.getByText(/Toggle Visibility/i);
    fireEvent.click(toggleButton);

    // After click, content should be visible
    const visibleContent = screen.getByText(/Now you can see me!/i);
    expect(visibleContent).toBeInTheDocument();
  });
});

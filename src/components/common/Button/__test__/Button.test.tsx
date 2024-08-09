import { fireEvent, render, screen } from '@testing-library/react';
import { Button } from '../index';

describe('Button component', () => {
  test('renders the Button with children', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  test('renders startIcon and endIcon', () => {
    render(
      <Button startIcon={<span>Start</span>} endIcon={<span>End</span>}>
        Click me
      </Button>,
    );
    expect(screen.getByText('Start')).toBeInTheDocument();
    expect(screen.getByText('End')).toBeInTheDocument();
  });

  test('applies the correct variant classes', () => {
    render(<Button variant="primary">Primary Button</Button>);
    expect(screen.getByText('Primary Button')).toHaveClass(
      'flex items-center rounded p-2 bg-[#4270ec] text-white hover:bg-blue-600',
    );

    render(<Button variant="secondary">Secondary Button</Button>);
    expect(screen.getByText('Secondary Button')).toHaveClass(
      'flex items-center rounded p-2 bg-white text-[#62656e] hover:bg-gray-300',
    );

    render(<Button variant="success">Success Button</Button>);
    expect(screen.getByText('Success Button')).toHaveClass(
      'flex items-center rounded p-2 bg-green-600 text-white hover:bg-green-700',
    );

    render(<Button variant="warning">Warning Button</Button>);
    expect(screen.getByText('Warning Button')).toHaveClass(
      'flex items-center rounded p-2 bg-amber-400 text-black hover:bg-amber-500',
    );

    render(<Button variant="error">Error Button</Button>);
    expect(screen.getByText('Error Button')).toHaveClass(
      'flex items-center rounded p-2 bg-rose-500 text-white hover:bg-rose-600',
    );

    render(<Button variant="outline">Outline Button</Button>);
    expect(screen.getByText('Outline Button')).toHaveClass(
      'flex items-center rounded p-2 border border-gray-200 dark:border-gray-700 hover:bg-gray-100',
    );
  });

  test('applies customClass', () => {
    render(<Button customClass="custom-class">Click me</Button>);
    expect(screen.getByText('Click me')).toHaveClass('custom-class');
  });

  test('handles click events', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click me</Button>);
    fireEvent.click(screen.getByText('Click me'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test('is disabled when the disabled prop is set', () => {
    render(<Button disabled>Click me</Button>);
    expect(screen.getByText('Click me')).toBeDisabled();
  });

  test('renders button with type submit', () => {
    render(<Button type="submit">Submit</Button>);
    expect(screen.getByText('Submit')).toHaveAttribute('type', 'submit');
  });

  test('shows Spinner and loading state correctly', () => {
    render(<Button loading={true}>Loading Button</Button>);
    expect(screen.getByText('Loading Button')).toBeInTheDocument();
    expect(screen.getByRole('status')).toBeInTheDocument();
    expect(screen.getByText('Loading Button').parentElement).toHaveClass(
      'flex items-center rounded p-2 bg-[#4270ec] text-white hover:cursor-not-allowed hover:opacity-70',
    );
  });

  test('does not show Spinner and displays children correctly when not loading', () => {
    render(<Button loading={false}>Normal Button</Button>);
    expect(screen.getByText('Normal Button')).toBeInTheDocument();
    expect(screen.queryByRole('status')).not.toBeInTheDocument();
  });

  test('applies default styling for unsupported variant', () => {
    render(
      <Button
        variant={
          'unsupported' as
            | 'primary'
            | 'secondary'
            | 'success'
            | 'warning'
            | 'error'
            | 'outline'
        }
      >
        Click me
      </Button>,
    );
    expect(screen.getByText('Click me')).toHaveClass(
      'bg-gray-300 text-black hover:bg-gray-400',
    );
  });

  test('matches the snapshot', () => {
    const { asFragment } = render(<Button>Click me</Button>);
    expect(asFragment()).toMatchSnapshot();
  });
});

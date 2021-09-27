import { render, screen, waitFor } from '@testing-library/react';
import App from '../App';
import * as employees from '../../test/test-data.json'

test('renders learn react link', async () => {
  render(<App />);
  
  const loadingElement = screen.getByText('loading');
  expect(loadingElement).toBeInTheDocument();

  await waitFor(() => expect(screen.getByText('Harriet McKinney')).toBeInTheDocument())
});

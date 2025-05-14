import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import BooksPage from './booksPage';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { userEvent } from '@testing-library/user-event';

const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

function renderWithQueryClient(ui: React.ReactElement) {
  const testQueryClient = createTestQueryClient();
  return render(
    <QueryClientProvider client={testQueryClient}>{ui}</QueryClientProvider>,
  );
}

describe('BooksPage', () => {
  beforeEach(() => {
    global.fetch = vi.fn().mockImplementation((url) => {
      if (url.includes('/api/books')) {
        return Promise.resolve({
          ok: true,
          json: async () => [
            {
              url: '1',
              name: 'A Game of Thrones',
              isbn: '123',
              authors: ['George R. R. Martin'],
              characters: [],
              country: 'Westeros',
              mediaType: 'Hardcover',
              numberOfPages: 100,
              povCharacters: [],
              publisher: 'Bantam Books',
              released: '1996-08-06T00:00:00',
            },
            {
              url: '2',
              name: 'A Dance with Dragons',
              isbn: '456',
              authors: ['Prueba 2'],
              characters: [],
              country: 'Westeros',
              mediaType: 'Hardcver',
              numberOfPages: 200,
              povCharacters: [],
              publisher: 'Batmam Books',
              released: '1996-09-06T00:00:00',
            },
          ],
        });
      }
    });
  });

  afterEach(() => {
    vi.resetAllMocks();
  });
  it('Renderiza correctamente la página', async () => {
    renderWithQueryClient(<BooksPage />);

    expect(screen.getByPlaceholderText(/Buscar libro/i)).toBeInTheDocument();
    expect(screen.getByText(/Actualizar libros/i)).toBeInTheDocument();

    await waitFor(() =>
      expect(screen.getByText(/Libros encontrados: 2/i)).toBeInTheDocument(),
    );
  });

  it('Filtra los libros por el término de búsqueda', async () => {
    const user = userEvent.setup();
    renderWithQueryClient(<BooksPage />);

    await waitFor(() => {
      expect(screen.queryByText('A Dance with Dragons')).toBeInTheDocument();
    });

    const input = screen.getByRole('textbox', { name: /Buscar libro/i });
    await user.type(input, 'A Game');

    await waitFor(() => {
      expect(screen.queryByText('A Dance with Dragons')).toBeNull();
      expect(screen.queryByText('A Game of Thrones')).toBeInTheDocument();
    });
  });

  it('Marcar favorito cuando se pincha en ☆', async () => {
    const user = userEvent.setup();
    renderWithQueryClient(<BooksPage />);

    await waitFor(() => screen.getByText('A Game of Thrones'));

    const favoriteButton = screen.getAllByRole('button', {
      name: /Añadir a favoritos/i,
    })[0];

    await user.click(favoriteButton);

    await waitFor(() => expect(favoriteButton).toHaveTextContent('★'));
  });

  it('Al hacer click en un libro debe mostrar la ficha del libro', async () => {
    const user = userEvent.setup();
    renderWithQueryClient(<BooksPage />);

    await waitFor(() => screen.getByText('A Game of Thrones'));

    const bookButton = screen.getByText('A Game of Thrones');
    await user.click(bookButton);

    waitFor(() => {
      expect(screen.getByText(/George R. R. Martin/i)).toBeInTheDocument();
    });
  });

  it('Cerrar el modal al pinchar en cerrar', async () => {
    const user = userEvent.setup();

    renderWithQueryClient(<BooksPage />);

    await waitFor(() => screen.getByText('A Game of Thrones'));

    const bookButton = screen.getByText('A Game of Thrones');
    await user.click(bookButton);

    const closeButton = screen.getByAltText(/Cerrar modal/i);
    expect(closeButton).toBeInTheDocument();
    expect(screen.getByText(/Autor:/i)).toBeInTheDocument();

    await user.click(closeButton);

    await waitFor(() =>
      expect(screen.queryByText(/Autor:/i)).not.toBeInTheDocument(),
    );
  });

  it('Ordenar la lista de libros al pichar en Ordenar por nombre', async () => {
    const user = userEvent.setup();

    renderWithQueryClient(<BooksPage />);

    await waitFor(() => screen.getByText(/A Game of Thrones/i));

    const orderButton = screen.getByRole('button', {
      name: /Ordenar por nombre/i,
    });
    await user.click(orderButton);

    const bookItems = screen.getAllByLabelText(/Ver detalles del libro/i);

    waitFor(() => {
      expect(screen.getByText(/Ordenar por nombre ↑/i)).toBeDefined();
      expect(bookItems[0]).toHaveTextContent('A Dance with Dragons');
      expect(bookItems[1]).toHaveTextContent('A Game of Thrones');
    });
  });
});

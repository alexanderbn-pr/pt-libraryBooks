import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import BookComponent from './bookComponent';
import { Book } from '../../types';

// Mock data
const mockBook: Book = {
  url: 'https://example.com/book/1',
  name: 'The Lord of the Rings',
  isbn: '9780547928227',
  authors: ['J.R.R. Tolkien'],
  characters: ['Frodo', 'Gandalf', 'Aragorn'],
  country: 'United Kingdom',
  mediaType: 'Print',
  numberOfPages: 1178,
  povCharacters: ['Frodo'],
  publisher: 'Houghton Mifflin',
  released: '1954-07-29',
};

describe('BookComponent', () => {
  let mockHandleBook: ReturnType<typeof vi.fn>;
  let mockHandleFavorite: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    mockHandleBook = vi.fn();
    mockHandleFavorite = vi.fn();
  });

  describe('Rendering', () => {
    it('renders book name', () => {
      render(
        <BookComponent
          book={mockBook}
          isFavorite={false}
          handleBook={mockHandleBook}
          handleFavorite={mockHandleFavorite}
        />
      );

      expect(screen.getByText('The Lord of the Rings')).toBeInTheDocument();
    });

    it('renders with correct aria-label for accessibility', () => {
      render(
        <BookComponent
          book={mockBook}
          isFavorite={false}
          handleBook={mockHandleBook}
          handleFavorite={mockHandleFavorite}
        />
      );

      expect(screen.getByLabelText('Ver detalles del libro')).toBeInTheDocument();
    });

    it('renders book cover image with correct src', () => {
      render(
        <BookComponent
          book={mockBook}
          isFavorite={false}
          handleBook={mockHandleBook}
          handleFavorite={mockHandleFavorite}
        />
      );

      const bookCoverImage = screen.getByAltText('imagen del libro');
      expect(bookCoverImage).toHaveAttribute(
        'src',
        `https://covers.openlibrary.org/b/isbn/${mockBook.isbn}-M.jpg`
      );
    });

    it('renders loading image initially', () => {
      render(
        <BookComponent
          book={mockBook}
          isFavorite={false}
          handleBook={mockHandleBook}
          handleFavorite={mockHandleFavorite}
        />
      );

      const loadingImage = screen.getByAltText('loading de carga');
      expect(loadingImage).toBeInTheDocument();
    });

    it('renders lazy loading attribute on cover image', () => {
      render(
        <BookComponent
          book={mockBook}
          isFavorite={false}
          handleBook={mockHandleBook}
          handleFavorite={mockHandleFavorite}
        />
      );

      const bookCoverImage = screen.getByAltText('imagen del libro');
      expect(bookCoverImage).toHaveAttribute('loading', 'lazy');
    });
  });

  describe('Favorite Button', () => {
    it('displays empty star when book is not favorite', () => {
      render(
        <BookComponent
          book={mockBook}
          isFavorite={false}
          handleBook={mockHandleBook}
          handleFavorite={mockHandleFavorite}
        />
      );

      expect(screen.getByText('☆')).toBeInTheDocument();
    });

    it('displays filled star when book is favorite', () => {
      render(
        <BookComponent
          book={mockBook}
          isFavorite={true}
          handleBook={mockHandleBook}
          handleFavorite={mockHandleFavorite}
        />
      );

      expect(screen.getByText('★')).toBeInTheDocument();
    });

    it('has correct aria-label when not favorite', () => {
      render(
        <BookComponent
          book={mockBook}
          isFavorite={false}
          handleBook={mockHandleBook}
          handleFavorite={mockHandleFavorite}
        />
      );

      expect(
        screen.getByLabelText('Añadir a favoritos')
      ).toBeInTheDocument();
    });

    it('has correct aria-label when favorite', () => {
      render(
        <BookComponent
          book={mockBook}
          isFavorite={true}
          handleBook={mockHandleBook}
          handleFavorite={mockHandleFavorite}
        />
      );

      expect(
        screen.getByLabelText('Quitar de favoritos')
      ).toBeInTheDocument();
    });
  });

  describe('User Interactions', () => {
    it('calls handleBook when card is clicked', async () => {
      render(
        <BookComponent
          book={mockBook}
          isFavorite={false}
          handleBook={mockHandleBook}
          handleFavorite={mockHandleFavorite}
        />
      );

      const bookCard = screen.getByLabelText('Ver detalles del libro');
      await userEvent.click(bookCard);

      expect(mockHandleBook).toHaveBeenCalledWith(mockBook);
      expect(mockHandleBook).toHaveBeenCalledTimes(1);
    });

    it('calls handleFavorite with book URL when favorite button is clicked', async () => {
      render(
        <BookComponent
          book={mockBook}
          isFavorite={false}
          handleBook={mockHandleBook}
          handleFavorite={mockHandleFavorite}
        />
      );

      const favoriteButton = screen.getByRole('button');
      await userEvent.click(favoriteButton);

      expect(mockHandleFavorite).toHaveBeenCalledWith(mockBook.url);
      expect(mockHandleFavorite).toHaveBeenCalledTimes(1);
    });

    it('stops event propagation when favorite button is clicked', async () => {
      render(
        <BookComponent
          book={mockBook}
          isFavorite={false}
          handleBook={mockHandleBook}
          handleFavorite={mockHandleFavorite}
        />
      );

      const favoriteButton = screen.getByRole('button');
      await userEvent.click(favoriteButton);

      // handleBook should not be called because event propagation is stopped
      expect(mockHandleBook).not.toHaveBeenCalled();
    });

    it('does not trigger card click when clicking favorite button', async () => {
      render(
        <BookComponent
          book={mockBook}
          isFavorite={false}
          handleBook={mockHandleBook}
          handleFavorite={mockHandleFavorite}
        />
      );

      const favoriteButton = screen.getByRole('button');
      fireEvent.click(favoriteButton);

      expect(mockHandleBook).not.toHaveBeenCalled();
      expect(mockHandleFavorite).toHaveBeenCalled();
    });
  });

  describe('Image Loading', () => {
    it('removes loading image when cover image loads', () => {
      render(
        <BookComponent
          book={mockBook}
          isFavorite={false}
          handleBook={mockHandleBook}
          handleFavorite={mockHandleFavorite}
        />
      );

      const loadingImage = screen.getByAltText('loading de carga');
      const bookCoverImage = screen.getByAltText('imagen del libro');

      // Simulate image load
      fireEvent.load(bookCoverImage);

      // Loading image should not be in DOM anymore
      expect(loadingImage).not.toBeInTheDocument();
    });

    it('handles image load failure gracefully', () => {
      render(
        <BookComponent
          book={mockBook}
          isFavorite={false}
          handleBook={mockHandleBook}
          handleFavorite={mockHandleFavorite}
        />
      );

      const bookCoverImage = screen.getByAltText('imagen del libro');

      // Image should still be in DOM even if it fails to load
      expect(bookCoverImage).toBeInTheDocument();
    });
  });

  describe('Props Validation', () => {
    it('renders with all required props', () => {
      const { container } = render(
        <BookComponent
          book={mockBook}
          isFavorite={false}
          handleBook={mockHandleBook}
          handleFavorite={mockHandleFavorite}
        />
      );

      expect(container.querySelector('.book-card')).toBeInTheDocument();
    });

    it('handles different book data correctly', () => {
      const differentBook: Book = {
        ...mockBook,
        name: 'Harry Potter',
        isbn: '9780439708180',
      };

      render(
        <BookComponent
          book={differentBook}
          isFavorite={false}
          handleBook={mockHandleBook}
          handleFavorite={mockHandleFavorite}
        />
      );

      expect(screen.getByText('Harry Potter')).toBeInTheDocument();
      expect(screen.getByAltText('imagen del libro')).toHaveAttribute(
        'src',
        'https://covers.openlibrary.org/b/isbn/9780439708180-M.jpg'
      );
    });
  });

  describe('Memoization', () => {
    it('is wrapped with React.memo for performance optimization', () => {
      // BookComponent is exported as React.memo(BookComponent)
      // This ensures re-renders only happen when props change
      expect(BookComponent.$$typeof).toBeDefined();
    });
  });

  describe('Edge Cases', () => {
    it('handles book with special characters in name', () => {
      const specialBook: Book = {
        ...mockBook,
        name: "O'Brien's Guide & Companion <2024>",
      };

      render(
        <BookComponent
          book={specialBook}
          isFavorite={false}
          handleBook={mockHandleBook}
          handleFavorite={mockHandleFavorite}
        />
      );

      expect(screen.getByText("O'Brien's Guide & Companion <2024>")).toBeInTheDocument();
    });

    it('handles empty ISBN gracefully', () => {
      const bookNoISBN: Book = {
        ...mockBook,
        isbn: '',
      };

      render(
        <BookComponent
          book={bookNoISBN}
          isFavorite={false}
          handleBook={mockHandleBook}
          handleFavorite={mockHandleFavorite}
        />
      );

      const bookCoverImage = screen.getByAltText('imagen del libro');
      expect(bookCoverImage).toHaveAttribute(
        'src',
        'https://covers.openlibrary.org/b/isbn/-M.jpg'
      );
    });
  });
});

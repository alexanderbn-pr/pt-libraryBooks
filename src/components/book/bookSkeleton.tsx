import './bookSkeleton.scss';

export const BookSkeleton = () => {
  return (
    <div className="book-skeleton">
      <div className="book-skeleton__header">
        <div className="book-skeleton__title" />
        <div className="book-skeleton__button" />
      </div>
      <div className="book-skeleton__image" />
    </div>
  );
};

export default BookSkeleton;

import './characterCountSkeleton.scss';

export const CharacterCountSkeleton = () => {
  return (
    <div className="character-count-skeleton">
      <div className="character-count-skeleton__label" />
      <div className="character-count-skeleton__count" />
    </div>
  );
};

export default CharacterCountSkeleton;

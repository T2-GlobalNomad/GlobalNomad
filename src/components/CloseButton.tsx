import { IoCloseOutline } from 'react-icons/io5';

interface CloseButtonProps {
  onClick: () => void;
  className?: string;
}

const CloseButton: React.FC<CloseButtonProps> = ({ onClick, className }) => {
  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      className={className || ''}
    >
      <IoCloseOutline size={28} strokeWidth={0.5} />
    </button>
  );
};

export default CloseButton;

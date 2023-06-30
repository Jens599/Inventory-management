import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark, faXmark } from '@fortawesome/free-solid-svg-icons';

interface props {
  message: string;
  styles: string;
  handleDismiss: () => void;
}

const Alert = ({ message, styles, handleDismiss }: props) => {
  return (
    <div className={styles}>
      <div className='ml-7'>
        <FontAwesomeIcon
          icon={faCircleXmark}
          className='mr-4'
        />
        {message}
      </div>
      <FontAwesomeIcon
        icon={faXmark}
        className='mr-7'
        onClick={handleDismiss}
      />
    </div>
  );
};

export default Alert;

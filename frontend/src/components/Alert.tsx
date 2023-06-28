import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark, faXmark } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';

const Alert = ({ message }) => {
  const [alert, setAlert] = useState('true');

  const resolveClass = () => {
    const modifier = alert ? 'flex' : 'hidden';
    return (
      'items-center justify-between rounded-xl bg-red-500 py-2 ' + modifier
    );
  };

  return (
    <div className={resolveClass()}>
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
        onClick={() => setAlert(alert ? false : true)}
      />
    </div>
  );
};

export default Alert;

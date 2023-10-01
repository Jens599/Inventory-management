import { useEffect, useState } from 'react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const schema = z.object({
  sellQuantity: z.number(),
});

type FormData = z.infer<typeof schema>;

interface Props {
  id: string;
  quantity: number;
  style: string;
  handleClose: (style: string) => void;
}

const Modal = ({ id, quantity, style, handleClose }: Props) => {
  const [visible, setVisible] = useState('hidden');
  useEffect(() => {
    setVisible(style);
  }, [style]);

  const { register } = useForm<FormData>({ resolver: zodResolver(schema) });

  return (
    <div>
      <div
        className={`absolute inset-0 m-auto flex w-[85vw] items-center justify-center bg-slate-800/60 ${visible}`}
      >
        <div className='flex h-2/4 w-2/4 flex-col items-center rounded-xl bg-white'>
          <form className='h-full w-full'>
            <div className='h-full w-full p-16'>
              <p className='flex items-center justify-end '>
                <FontAwesomeIcon
                  icon={faXmark}
                  className=' hover:text h-6 w-6 text-gray-500'
                  onClick={() => handleClose('hidden')}
                />
              </p>
              <legend className='mb-3 w-full text-center font-serif text-xl font-medium leading-snug text-black'>
                Sell Items
              </legend>
              <div className='flex flex-col items-center gap-5 '>
                <div className='relative w-full'>
                  <p
                    className='absolute -mt-1 mb-0 ml-2 mr-0 bg-white px-2 py-0 text-sm font-medium
                  text-gray-600'
                  >
                    Quantity
                  </p>
                  <input
                    {...register('sellQuantity', { valueAsNumber: true })}
                    placeholder='Sell Quantity'
                    type='number'
                    className='mb-0 ml-0 mr-0
                  mt-2 block w-full rounded-md border border-gray-300 bg-white p-3 text-sm  text-black placeholder-gray-400
                  focus:border-black focus:outline-none'
                  />
                </div>
                <p>Available Quantity : {quantity}</p>
              </div>
              <div className='relative'>
                <input
                  className='ease mt-5 inline-block w-full rounded-lg bg-indigo-500 px-3 py-2
                 text-center font-medium text-white transition duration-200 hover:bg-indigo-600'
                  type='submit'
                  value='Sell Items'
                />
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Modal;

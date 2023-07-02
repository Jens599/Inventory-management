import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import Alert from './Alert';

import { useInventoryContext } from '../hooks/useInventoryContext';
import { zodResolver } from '@hookform/resolvers/zod';

interface dataObject {
  name: string;
  brand: string;
  category: string;
  style: string;
  supplier: string;
  purchasePrice: number;
  quantity: number;
  availability: number;
  salesPrice: number;
}

const schema = z.object({
  name: z
    .string()
    .min(1, { message: 'Name must be defined' })
    .min(3, { message: 'Name must be at least 3 characters.' }),
  brand: z
    .string({ required_error: 'Hello??' })
    .min(1, { message: 'Brand must be defined.' }),
  category: z.string().regex(/^(?! $).*$/, {
    message: 'Category must be defined.',
  }),
  style: z.string().regex(/^(?! $).*$/, {
    message: 'Style must be defined.',
  }),
  supplier: z.string().min(1, { message: 'Supplier must be defined.' }),
  purchasePrice: z
    .number({ invalid_type_error: 'Purchase Price must be define.' })
    .nonnegative('Purchase Price cannot be negative.')
    .min(1, { message: 'Purchase Price cannot be zero' }),
  quantity: z
    .number({ invalid_type_error: 'Quantity must be define.' })
    .nonnegative('Quantity cannot be negative.')
    .min(1, { message: 'Quantity cannot be zero' }),
  availability: z.number(),
  salesPrice: z
    .number({ invalid_type_error: 'Sales Price must be define.' })
    .nonnegative('Sales Price cannot be negative.'),
});

type FormData = z.infer<typeof schema>;

const AddItem = () => {
  const [message, setMessage] = useState('');
  const [styles, setStyles] = useState('hidden');

  const handleDismiss = () => {
    setStyles(
      'items-center justify-between mb-5 shadow-2xl shadow-gray-500 rounded-xl bg-red-300 py-2 hidden'
    );
  };

  const { dispatch } = useInventoryContext();

  useEffect(() => {
    setValue('availability', 1);
  }, []);

  const handleAlertDismiss = () => {
    setTimeout(() => {
      setStyles(
        'items-center justify-between mb-5 shadow-2xl shadow-gray-500 rounded-xl bg-red-300 py-2 hidden'
      );
    }, 2000);
  };

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: dataObject) => {
    const {
      name,
      brand,
      category,
      style,
      supplier,
      purchasePrice,
      quantity,
      availability,
      salesPrice,
    } = data;

    const inventory = {
      name,
      brand,
      category,
      style,
      supplier,
      purchasePrice,
      quantity,
      availability,
      salesPrice,
    };

    console.log('inventory', inventory);
    try {
      const response = await fetch('/inventory/addItem', {
        method: 'POST',
        body: JSON.stringify(inventory),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const json = await response.json();

      if (!response.ok || !json) {
        setStyles(
          'items-center justify-between mb-5 shadow-2xl shadow-gray-500 rounded-xl bg-red-300 py-2 flex'
        );
        setMessage('Error Adding Product To Inventory');
        handleAlertDismiss();
      }
      if (response.ok) {
        setStyles(
          'items-center justify-between mb-5 shadow-2xl shadow-gray-500 rounded-xl bg-green-300 py-2 flex'
        );
        setMessage('Product Added To the Inventory');
        handleAlertDismiss();

        dispatch({ type: 'ADD_INVENTORY', payload: json });

        reset();
      }
    } catch (err) {
      setStyles(
        'items-center justify-between mb-5 shadow-2xl shadow-gray-500 rounded-xl bg-green-300 py-2 flex'
      );
      setMessage('Error Adding Product To Inventory');
      console.log(err);
      handleAlertDismiss();
    }
  };

  return (
    <>
      <form
        className='mx-auto mt-16 w-1/2'
        onSubmit={handleSubmit(onSubmit)}
        method='post'
      >
        <Alert
          message={message}
          styles={styles}
          handleDismiss={handleDismiss}
        />
        <div
          className='relative z-10 flex flex-col items-start justify-start rounded-xl bg-white pb-10 pl-10 pr-10
            pt-10 shadow-2xl'
        >
          <p className='w-full text-center font-serif text-xl font-medium leading-snug text-black'>
            Add Item To Inventory
          </p>
          <div className='relative mb-0 ml-0 mr-0 mt-6 w-full space-y-8'>
            {/* one Component */}

            <div className='flex justify-center gap-5 '>
              <div className='relative w-1/2'>
                <p
                  className='absolute -mt-1 mb-0 ml-2 mr-0 bg-white px-2 py-0 text-sm font-medium
                  text-gray-600'
                >
                  Name
                </p>
                <input
                  {...register('name')}
                  placeholder='Name of the Product'
                  type='text'
                  className='mb-0 ml-0 mr-0
                  mt-2 block w-full rounded-md border border-gray-300 bg-white p-3 text-sm  text-black placeholder-gray-400
                  focus:border-black focus:outline-none'
                />
                {errors.name && (
                  <p className='text-xs text-red-500'>{errors.name.message}</p>
                )}
              </div>

              <div className='relative w-1/2'>
                <p
                  className='absolute -mt-1 mb-0 ml-2 mr-0 bg-white px-2 py-0 text-sm font-medium
                  text-gray-600'
                >
                  Brand
                </p>
                <input
                  {...register('brand')}
                  placeholder='Brand of the Product'
                  type='text'
                  className='mb-0 ml-0 mr-0
                  mt-2 block w-full rounded-md border border-gray-300 bg-white p-3 text-sm  text-black placeholder-gray-400
                  focus:border-black focus:outline-none'
                />
                {errors.brand && (
                  <p className='text-xs text-red-500'>{errors.brand.message}</p>
                )}
              </div>
            </div>

            <div className='flex justify-center gap-5 '>
              <div className='relative w-1/2'>
                <p
                  className='absolute -mt-1 mb-0 ml-2 mr-0 bg-white px-2 py-0 text-sm font-medium
                  text-gray-600'
                >
                  Category
                </p>
                <select
                  {...register('category')}
                  defaultValue=' '
                  name='category'
                  id='category'
                  className='mb-0 ml-0 mr-0
                  mt-2 block w-full rounded-md border border-gray-300 bg-white p-3 text-sm  text-black placeholder-gray-400
                  focus:border-black focus:outline-none'
                >
                  <option
                    value=' '
                    disabled
                    hidden
                  >
                    Category of the Product
                  </option>
                  <option value='shirts'>Shirts</option>
                  <option value='pants'>Pants</option>
                  <option value='shorts'>Shorts</option>
                  <option value='suits'>Suits</option>
                  <option value='jackets'>Jackets</option>
                  <option value='sweaters'>Sweaters</option>
                  <option value='hoodies'>Hoodies</option>
                  <option value='coats'>Coats</option>
                  <option value='vests'>Vests</option>
                  <option value='swimwear'>Swimwear</option>
                  <option value='underwear'>Underwear</option>
                  <option value='socks'>Socks</option>
                  <option value='sleepwear'>Sleepwear</option>
                  <option value='accessories'>Accessories</option>
                  <option value='shoes'>Shoes</option>
                  <option value='other'>Other</option>
                </select>
                {errors.category && (
                  <p className='text-xs text-red-500'>
                    {errors.category.message}
                  </p>
                )}
              </div>

              <div className='relative w-1/2'>
                <p
                  className='absolute -mt-1 mb-0 ml-2 mr-0 bg-white px-2 py-0 text-sm font-medium
                  text-gray-600'
                >
                  Style
                </p>
                <select
                  {...register('style')}
                  defaultValue=' '
                  name='style'
                  id='style'
                  className='mb-0 ml-0 mr-0
                  mt-2 block w-full rounded-md border border-gray-300 bg-white p-3 text-sm  text-black placeholder-gray-400
                  focus:border-black focus:outline-none'
                >
                  <option
                    value=' '
                    disabled
                    hidden
                  >
                    Style of the Product
                  </option>
                  <option value='formal'>Formal</option>
                  <option value='sports'>Sports</option>
                  <option value='casual'>Casual</option>
                  <option value='athletic'>Athletic</option>
                  <option value='business'>Business</option>
                  <option value='vintage'>Vintage</option>
                  <option value='other'>Other</option>
                </select>
                {errors.style && (
                  <p className='text-xs text-red-500'>{errors.style.message}</p>
                )}
              </div>
            </div>

            <div className='flex justify-center gap-5 '>
              <div className='relative w-1/2'>
                <p
                  className='absolute -mt-1 mb-0 ml-2 mr-0 bg-white px-2 py-0 text-sm font-medium
                  text-gray-600'
                >
                  Supplier
                </p>
                <input
                  {...register('supplier')}
                  placeholder='Supplier of the Product'
                  type='text'
                  className='mb-0 ml-0 mr-0
                  mt-2 block w-full rounded-md border border-gray-300 bg-white p-3 text-sm  text-black placeholder-gray-400
                  focus:border-black focus:outline-none'
                />
                {errors.supplier && (
                  <p className='text-xs text-red-500'>
                    {errors.supplier.message}
                  </p>
                )}
              </div>

              <div className='relative w-1/2'>
                <p
                  className='absolute -mt-1 mb-0 ml-2 mr-0 bg-white px-2 py-0 text-sm font-medium
                  text-gray-600'
                >
                  Purchase Price
                </p>
                <input
                  {...register('purchasePrice', { valueAsNumber: true })}
                  placeholder='Purchase Price of the Product'
                  type='number'
                  className='mb-0 ml-0 mr-0
                  mt-2 block w-full rounded-md border border-gray-300 bg-white p-3 text-sm  text-black placeholder-gray-400
                  focus:border-black focus:outline-none'
                />
                {errors.purchasePrice && (
                  <p className='text-xs text-red-500'>
                    {errors.purchasePrice.message}
                  </p>
                )}
              </div>
            </div>

            <div className='flex justify-center gap-5 '>
              <div className='relative w-1/2'>
                <p
                  className='absolute -mt-1 mb-0 ml-2 mr-0 bg-white px-2 py-0 text-sm font-medium
                  text-gray-600'
                >
                  Quantity
                </p>
                <input
                  {...register('quantity', { valueAsNumber: true })}
                  placeholder='Quantity of the Product'
                  type='number'
                  className='mb-0 ml-0 mr-0
                  mt-2 block w-full rounded-md border border-gray-300 bg-white p-3 text-sm  text-black placeholder-gray-400
                  focus:border-black focus:outline-none'
                />
                {errors.quantity && (
                  <p className='text-xs text-red-500'>
                    {errors.quantity.message}
                  </p>
                )}
              </div>

              <div className='relative w-1/2'>
                <p
                  className='absolute -mt-1 mb-0 ml-2 mr-0 bg-white px-2 py-0 text-sm font-medium
                  text-gray-600'
                >
                  Availability
                </p>
                <select
                  {...register('availability', { valueAsNumber: true })}
                  name='availability'
                  id='availability'
                  className='mb-0 ml-0 mr-0
                  mt-2 block w-full rounded-md border border-gray-300 bg-white p-3 text-sm  text-black placeholder-gray-400
                  focus:border-black focus:outline-none'
                >
                  <option value='1'>Yes</option>
                  <option value='0'>No</option>
                </select>
              </div>
            </div>

            <div className='relative'>
              <p
                className='absolute -mt-3 mb-0 ml-2 mr-0 bg-white px-2 py-0 text-sm font-medium
                  text-gray-600'
              >
                Sales Price
              </p>
              <input
                {...register('salesPrice', { valueAsNumber: true })}
                placeholder='Sales Price of the Product'
                type='number'
                className='mb-0 ml-0 mr-0
                  mt-2 block w-full rounded-md border border-gray-300 bg-white p-3 text-sm  text-black placeholder-gray-400
                  focus:border-black focus:outline-none'
              />
              {errors.salesPrice && (
                <p className='text-xs text-red-500'>
                  {errors.salesPrice.message}
                </p>
              )}
            </div>
            <div className='relative'>
              <input
                className='ease inline-block w-full rounded-lg bg-indigo-500 px-3 py-2 text-center
                 font-medium text-white transition duration-200 hover:bg-indigo-600'
                type='submit'
                value='Add Product'
              />
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default AddItem;

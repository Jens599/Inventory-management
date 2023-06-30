import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilePen, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { faMinus } from '@fortawesome/free-solid-svg-icons';
import { useInventoryContext } from '../hooks/useInventoryContext';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';

const Inventory = () => {
  const { inventory, dispatch } = useInventoryContext();

  useEffect(() => {
    const fetchInventory = async () => {
      const response = await fetch('/inventory/viewAll');

      const json = await response.json();
      console.log(json);
      if (response.ok) {
        dispatch({ type: 'SET_INVENTORY', payload: json });
      }
    };

    fetchInventory();
  }, [dispatch]);

  return (
    <div className='m-5 flex w-full flex-col items-center justify-center'>
      <div className='my-2 flex w-[85vw] gap-32'>
        <button
          type='button'
          className='mb-2 mr-2 w-full whitespace-nowrap rounded-xl bg-gray-800 px-5 py-2.5 text-sm font-medium text-white
           hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700'
        >
          <FontAwesomeIcon
            icon={faPlus}
            className='pr-2 text-white'
          />
          Add Product
        </button>
        <button
          type='button'
          className='mb-2 mr-2 w-full whitespace-nowrap rounded-xl bg-gray-800 px-5 py-2.5 text-sm font-medium text-white
           hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700'
        >
          <FontAwesomeIcon
            icon={faMinus}
            className='pr-2 text-white'
          />
          Sell Product
        </button>
      </div>
      <div className='relative w-[85vw] h-[79vh] overflow-x-auto shadow-md sm:rounded-lg '>
        <table className='w-full table-auto text-left text-sm text-gray-500 dark:text-gray-400'>
          <thead className='bg-gray-50 text-xs uppercase text-gray-700 dark:bg-slate-700 dark:text-gray-400 sticky top-0'>
            <tr>
              <th
                scope='col'
                className='px-6 py-3'
              >
                Name
              </th>
              <th
                scope='col'
                className='px-6 py-3'
              >
                Brand
              </th>
              <th
                scope='col'
                className='px-6 py-3'
              >
                Category
              </th>
              <th
                scope='col'
                className='px-6 py-3'
              >
                Style
              </th>
              <th
                scope='col'
                className='px-6 py-3'
              >
                Supplier
              </th>
              <th
                scope='col'
                className='px-6 py-3'
              >
                Purchase Price
              </th>
              <th
                scope='col'
                className='px-6 py-3'
              >
                Quantity
              </th>
              <th
                scope='col'
                className='px-6 py-3'
              >
                Availability
              </th>
              <th
                scope='col'
                className='px-6 py-3'
              >
                Sales Price
              </th>
              <th
                scope='col'
                className='px-6 py-3'
              >
                Created At
              </th>
              <th className='px-6 py-3'>Actions</th>
            </tr>
          </thead>
          <tbody>
            {inventory &&
              inventory.map((i) => (
                <tr
                  key={i._id}
                  className='border-b bg-white dark:border-gray-700 dark:bg-slate-800'
                >
                  <th
                    scope='row'
                    className='whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white'
                  >
                    {i.name}
                  </th>
                  <td className='px-6 py-4'>{i.brand}</td>
                  <td className='px-6 py-4'>{i.category}</td>
                  <td className='px-6 py-4'>{i.style}</td>
                  <td className='px-6 py-4'>{i.supplier}</td>
                  <td className='px-6 py-4'>{i.purchasePrice}</td>
                  <td className='px-6 py-4'>{i.quantity}</td>
                  <td className='px-6 py-4'>{i.availability ? 'yes' : 'no'}</td>
                  <td className='px-6 py-4'>{i.salesPrice}</td>
                  <td className='px-6 py-4'>{i.createdAt}</td>
                  <td className='whitespace-nowrap px-6 py-4'>
                    <Link
                      to={'/dashboard/updateItem/' + i._id}
                      className='mr-5 hover:text-green-500'
                    >
                      <abbr title='Update Item'>
                        <FontAwesomeIcon icon={faFilePen} />
                      </abbr>
                    </Link>
                    <Link>
                      <abbr
                        title='Delete Item'
                        className='hover:text-red-500'
                      >
                        <FontAwesomeIcon icon={faTrash} />
                      </abbr>
                    </Link>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Inventory;

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCircleXmark,
  faFilePen,
  faPlus,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';
import { faMinus } from '@fortawesome/free-solid-svg-icons';
import { useInventoryContext } from '../hooks/useInventoryContext';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

interface dataObject {
  _id: string;
  name: string;
  brand: string;
  category: string;
  style: string;
  supplier: string;
  purchasePrice: number;
  quantity: number;
  availability: number;
  salesPrice: number;
  createdAt: string;
}

const Inventory = () => {
  const [inventoryIsDefined, setInventoryIsDefined] = useState(false);

  const { inventory, dispatch } = useInventoryContext();

  console.log(typeof inventory);

  useEffect(() => {
    setInventoryIsDefined(false);

    const fetchInventory = async () => {
      const response = await fetch('/inventory/viewAll');
      const json = await response.json();
      if (response.ok) {
        dispatch({ type: 'SET_INVENTORY', payload: json });
        setInventoryIsDefined(true);
      }
    };

    fetchInventory();
  }, []);

  const handleDelete = async (id: string) => {
    const response = await fetch('/inventory/removeItem/' + id, {
      method: 'DELETE',
    });

    const json = await response.json();

    dispatch({ type: 'DELETE_INVENTORY', payload: json });
  };

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
      <div className='relative h-[79vh] w-[85vw] overflow-x-auto shadow-md sm:rounded-lg '>
        <table className='w-full table-auto text-left text-sm text-gray-500 dark:text-gray-400'>
          <thead className='sticky top-0 bg-gray-50 text-xs uppercase text-gray-700 dark:bg-slate-700 dark:text-gray-400'>
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
            {inventoryIsDefined &&
              inventory.map((item) => (
                <tr
                  key={item._id}
                  className='border-b bg-white dark:border-gray-700 dark:bg-slate-800'
                >
                  <th
                    scope='row'
                    className='whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white'
                  >
                    {item.name}
                  </th>
                  <td className='px-6 py-4'>{item.brand}</td>
                  <td className='px-6 py-4'>{item.category}</td>
                  <td className='px-6 py-4'>{item.style}</td>
                  <td className='px-6 py-4'>{item.supplier}</td>
                  <td className='px-6 py-4'>{item.purchasePrice}</td>
                  <td className='px-6 py-4'>{item.quantity}</td>
                  <td className='px-6 py-4'>
                    {item.availability ? 'yes' : 'no'}
                  </td>
                  <td className='px-6 py-4'>{item.salesPrice}</td>
                  <td className='px-6 py-4'>{item.createdAt}</td>
                  <td className='whitespace-nowrap px-6 py-4'>
                    <Link
                      to={'/dashboard/updateItem/' + item._id}
                      className='mr-5 hover:text-green-500'
                    >
                      <abbr title='Update Item'>
                        <FontAwesomeIcon icon={faFilePen} />
                      </abbr>
                    </Link>
                    <span onClick={() => handleDelete(item._id)}>
                      <abbr
                        title='Delete Item'
                        className='hover:text-red-500'
                      >
                        <FontAwesomeIcon icon={faTrash} />
                      </abbr>
                    </span>
                  </td>
                </tr>
              ))}
            {!inventoryIsDefined && (
              <tr>
                <td colSpan={11}>
                  <p className='mx-20 my-10 rounded-3xl bg-red-300 py-5 text-center text-2xl text-black'>
                    <FontAwesomeIcon
                      icon={faCircleXmark}
                      className='pr-2 text-red-950'
                    />{' '}
                    Error Loading The Inventory From The Server.
                  </p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Inventory;

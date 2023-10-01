import { useInventoryContext } from '../hooks/useInventoryContext';

const Report = () => {
  const { inventory } = useInventoryContext();

  const sortRecent = inventory.sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );

  // Take the top five items
  const recentlyAdded = sortRecent.slice(0, 8);

  const sortPrice = inventory.sort((a, b) => a.salesPrice - b.salesPrice);

  // Take the top five items
  const PriceItems = sortPrice.slice(0, 8);

  const sortQuantity = inventory.sort((a, b) => b.quantity - a.quantity);

  // Take the top five items
  const QuantityItems = sortQuantity.slice(0, 16);

  const column1 = QuantityItems.slice(0, 8);
  const column2 = QuantityItems.slice(8);

  return (
    <div className='mx-20 mt-8  h-full w-full '>
      <div className='flex h-1/2 w-full gap-10  py-10'>
        <div className='h-full w-1/2 rounded-xl border border-gray-400 bg-gray-300 shadow-md shadow-slate-400 '>
          <p className=' pt-4 text-center text-3xl'>TOP EIGHT ITEM BY PRICE</p>
          {
            <ol className='mx-24 mb-6 mt-6 list-disc text-xl'>
              {PriceItems.map((item) => (
                <li
                  className='mt-2'
                  key={item._id}
                >
                  {item.name}
                </li>
              ))}
            </ol>
          }
        </div>
        <div className='h-full w-1/2 rounded-xl border border-gray-400 bg-gray-300 shadow-md shadow-slate-400'>
          <p className=' pt-4 text-center text-3xl'>RECENTLY ADDED</p>
          {
            <ol className='mx-24 mb-6 mt-6 list-disc text-xl'>
              {recentlyAdded.map((item) => (
                <li
                  className='mt-2'
                  key={item._id}
                >
                  {item.name}
                </li>
              ))}
            </ol>
          }
        </div>
      </div>
      <div className='flex h-1/2 w-full gap-10  py-10'>
        <div className='h-full w-full rounded-xl border border-gray-400 bg-gray-300 shadow-md shadow-slate-400'>
          <p className=' pt-4 text-center text-3xl'>ITEMS WITH LOW STOCKS</p>
          <div className='grid grid-cols-2 gap-4'>
            {/* First Column */}
            <ol className='mx-24 mb-6 mt-6 list-disc text-xl'>
              {column1.map((item, index) => (
                <li
                  key={item._id}
                  className='mb-2'
                >
                  {item.name} <br />
                  {/* Add more item details here */}
                </li>
              ))}
            </ol>
            {/* Second Column */}
            <ol className='mx-24 mb-6 mt-6 list-disc text-xl'>
              {column2.map((item, index) => (
                <li
                  key={item._id}
                  className='mb-2'
                >
                  {item.name} <br />
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Report;

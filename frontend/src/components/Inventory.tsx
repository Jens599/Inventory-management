import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleChevronUp,
  faCircleXmark,
  faFilePen,
  faPlus,
  faTrash,
  faMinus,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { useInventoryContext } from "../hooks/useInventoryContext";
import Modal from "./Modal";
import { useAuthContext } from "../hooks/useAuthContext";
import { formatDistanceToNow } from "date-fns";

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
  const [itemSell, setItemSell] = useState<dataObject>({} as dataObject);
  const [style, setStyle] = useState("hidden");

  const { inventory, dispatch } = useInventoryContext();

  console.log(inventory);

  const { user } = useAuthContext();

  useEffect(() => {
    setInventoryIsDefined(false);

    const fetchInventory = async () => {
      const response = await fetch("/api/inventory/viewAll", {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      const json = await response.json();
      if (response.ok) {
        dispatch({ type: "SET_INVENTORY", payload: json });
      }
    };
    if (user) fetchInventory();
  }, [dispatch, user]);

  useEffect(() => {
    if (inventory != null) setInventoryIsDefined(true);
  }, [inventory]);

  console.log(inventory);

  const handleSell = (item: dataObject) => {
    setItemSell(item);
    setStyle("block");
  };

  const handleDelete = async (id: string) => {
    if (!user) {
      return;
    }
    const response = await fetch("/api/inventory/removeItem/" + id, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${user.token}` },
    });

    const json = await response.json();

    dispatch({ type: "DELETE_INVENTORY", payload: json });
  };
  console.log(inventory);

  return (
    <div className="relative m-5 mt-16 flex w-full flex-col items-center justify-center">
      <div className="h-[79vh] w-[85vw] overflow-x-auto bg-gray-400/50 shadow-md sm:rounded-lg">
        <table className="w-full table-auto text-left text-sm text-gray-500 dark:text-gray-400">
          <thead className="sticky top-0 bg-gray-50 text-xs uppercase text-gray-700 dark:bg-slate-700 dark:text-gray-400">
            <tr>
              <th></th>
              <th scope="col" className="px-6 py-3">
                Name
              </th>
              <th scope="col" className="px-6 py-3">
                Brand
              </th>
              <th scope="col" className="px-6 py-3">
                Category
              </th>
              <th scope="col" className="px-6 py-3">
                Style
              </th>
              <th scope="col" className="px-6 py-3">
                Supplier
              </th>
              <th scope="col" className="px-6 py-3">
                Purchase Price
              </th>
              <th scope="col" className="px-6 py-3">
                Quantity
              </th>
              <th scope="col" className="px-6 py-3">
                Availability
              </th>
              <th scope="col" className="px-6 py-3">
                Sales Price
              </th>
              <th scope="col" className="px-6 py-3">
                Created At
              </th>
              <th className="px-6 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {inventoryIsDefined &&
              inventory.map((item) => (
                <tr
                  key={item._id}
                  className="border-b bg-white dark:border-gray-700 dark:bg-slate-800"
                >
                  <td className="relative whitespace-nowrap  px-6 py-4">
                    <span>
                      <abbr
                        title="Sell Item"
                        className="hover:text-green-500"
                        onClick={() => handleSell(item)}
                      >
                        <FontAwesomeIcon icon={faCircleChevronUp} />
                      </abbr>
                    </span>
                  </td>
                  <th
                    scope="row"
                    className="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white"
                  >
                    {item.name}
                  </th>
                  <td className="px-6 py-4">{item.brand}</td>
                  <td className="px-6 py-4">{item.category}</td>
                  <td className="px-6 py-4">{item.style}</td>
                  <td className="px-6 py-4">{item.supplier}</td>
                  <td className="px-6 py-4">{item.purchasePrice}</td>
                  <td className="px-6 py-4">{item.quantity}</td>
                  <td className="px-6 py-4">
                    {item.availability ? "yes" : "no"}
                  </td>
                  <td className="px-6 py-4">{item.salesPrice}</td>
                  <td className="px-6 py-4">
                    {formatDistanceToNow(item.createdAt)}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4">
                    <Link
                      to={"/dashboard/updateItem/" + item._id}
                      className="mr-5 hover:text-fuchsia-500"
                    >
                      <abbr title="Update Item">
                        <FontAwesomeIcon icon={faFilePen} />
                      </abbr>
                    </Link>
                    <span onClick={() => handleDelete(item._id)}>
                      <abbr title="Delete Item" className="hover:text-red-500">
                        <FontAwesomeIcon icon={faTrash} />
                      </abbr>
                    </span>
                  </td>
                </tr>
              ))}
            {!inventoryIsDefined && (
              <tr>
                <td colSpan={11}>
                  <p className="mx-20 my-10 rounded-3xl bg-red-300 py-5 text-center text-2xl text-black">
                    <FontAwesomeIcon
                      icon={faCircleXmark}
                      className="pr-2 text-red-950"
                    />
                    Error Loading The Inventory From The Server.
                  </p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
        <Modal
          user={user}
          id={itemSell._id}
          quantity={itemSell.quantity}
          style={style}
          handleClose={(style: string) => setStyle(style)}
        />
      </div>
    </div>
  );
};

export default Inventory;

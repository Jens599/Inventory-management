import { useInventoryContext } from "../hooks/useInventoryContext";
import _ from "lodash";

const Report = () => {
  const { inventory } = useInventoryContext();

  const sorted = _.orderBy(inventory, "createdAt", "asc");


  return (
    <div className="mx-20 my-10 h-[calc(86vh)] w-full">
      <div className="grid">
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default Report;

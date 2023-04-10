import { Outlet } from "react-router-dom";
import { SelectionAppBar } from "components/partials";

export const SelectionLayout = () => {
  return (
    <div>
      <SelectionAppBar />
      <Outlet />
    </div>
  );
};

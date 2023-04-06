import { Outlet } from "react-router-dom";
import { CharacterAppBar } from "components/partials";

export const CharacterLayout = () => {
  return (
    <div>
      <CharacterAppBar />
      <Outlet />
    </div>
  );
};

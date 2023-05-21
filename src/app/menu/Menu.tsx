import { MenuItem } from "@/app/menu/MenuItem";
import { HamburgerButton } from "@/app/menu/HamburgerButton";
import { useDispatch, useSelector } from "react-redux";
import {
  removeMapObject,
  selectMapObjects,
  toggleSelectedState,
} from "@/app/redux/mapSlice";

export interface MenuProps {
  isOpen: boolean;
  onToggle: () => void;
}

export function Menu({ isOpen, onToggle }: MenuProps) {
  const items = useSelector(selectMapObjects);
  const dispatch = useDispatch();
  const navItems = (
    <>
      <div className="border-b-2 p-2 border-gray-300 ">
        <h2 className="text-2xl">Items list</h2>
      </div>
      {items.map((i) => (
        <MenuItem
          key={i.key}
          title={`Route ${i.key}`}
          subtitle={"Line string"}
          selected={i.selected}
          onRemove={() => dispatch(removeMapObject(i.key))}
          onClick={() => dispatch(toggleSelectedState(i.key))}
        />
      ))}
    </>
  );

  const getContent = () => {
    if (!isOpen) {
      return null;
    }
    return !items.length ? (
      <p className="p-2">No records to display</p>
    ) : (
      navItems
    );
  };

  return (
    <nav
      className={`overflow-y-auto overflow-x-auto max-h-screen ${
        isOpen ? "w-44" : "w-10"
      }`}
    >
      <div className="float-right">
        <HamburgerButton onClick={onToggle} icon={isOpen ? "x" : "hamburger"} />
      </div>
      {getContent()}
    </nav>
  );
}

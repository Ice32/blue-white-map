import { MenuItem } from "@/app/menu/MenuItem";
import { HamburgerButton } from "@/app/menu/HamburgerButton";
import {
  removeMapObject,
  selectMapObjects,
  toggleSelectedState,
} from "@/app/redux/mapSlice";
import {
  selectMenuOpenState,
  toggleMenuOpenState,
} from "@/app/redux/menuSlice";
import { useAppDispatch, useAppSelector } from "@/app/redux/hooks";

export function Menu() {
  const items = useAppSelector(selectMapObjects);
  const isOpen = useAppSelector(selectMenuOpenState);
  const dispatch = useAppDispatch();
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
        <HamburgerButton
          onClick={() => dispatch(toggleMenuOpenState())}
          icon={isOpen ? "x" : "hamburger"}
        />
      </div>
      {getContent()}
    </nav>
  );
}

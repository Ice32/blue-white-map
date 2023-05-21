import { MenuItemContent } from "@/app/menu/MenuItemContent";
import { MenuItem } from "@/app/menu/MenuItem";
import { HamburgerButton } from "@/app/menu/HamburgerButton";

export interface MenuProps {
  items: MenuItemContent[];
  onRemove: (item: MenuItemContent) => void;
  onItemClick: (item: MenuItemContent) => void;
  isOpen: boolean;
  onToggle: () => void;
}

export function Menu({
  items,
  onRemove,
  onItemClick,
  isOpen,
  onToggle,
}: MenuProps) {
  const navItems = (
    <>
      <div className="border-b-2 p-2 border-gray-300 ">
        <h2 className="text-2xl">Items list</h2>
      </div>
      {items.map((i) => (
        <MenuItem
          key={i.key}
          title={i.title}
          subtitle={i.subtitle}
          selected={i.selected}
          onRemove={() => onRemove(i)}
          onClick={() => onItemClick(i)}
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

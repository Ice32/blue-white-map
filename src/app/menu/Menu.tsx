import { MenuItemContent } from "@/app/menu/MenuItemContent";
import { MenuItem } from "@/app/menu/MenuItem";

export interface MenuProps {
  items: MenuItemContent[];
  onRemove: (item: MenuItemContent) => void;
  onItemClick: (item: MenuItemContent) => void;
}
export function Menu({ items, onRemove, onItemClick }: MenuProps) {
  if (!items.length) {
    return <p>No records to display</p>;
  }
  return (
    <nav>
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
    </nav>
  );
}

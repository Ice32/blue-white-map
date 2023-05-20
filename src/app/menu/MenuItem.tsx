import { MinusCircleIcon } from "@heroicons/react/24/outline";

interface MenuItemProps {
  title: string;
  subtitle: string;
  onRemove: () => void;
}
export function MenuItem({ title, subtitle, onRemove }: MenuItemProps) {
  return (
    <div className="border-b-2 p-2 border-gray-300" data-testid="menu-item">
      <p>{title}</p>
      <p>{subtitle}</p>
      <MinusCircleIcon
        data-testid="remove-item-button"
        className="h-6 w-6 text-blue-400 cursor-pointer"
        onClick={onRemove}
      />
    </div>
  );
}

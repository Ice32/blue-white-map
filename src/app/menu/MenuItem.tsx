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
    </div>
  );
}

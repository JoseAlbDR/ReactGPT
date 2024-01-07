import { NavLink } from 'react-router-dom';
import { MenuItem } from '../../../interfaces/MenuItem';

const SidebarItem = ({ item }: { item: MenuItem }) => {
  return (
    <NavLink
      key={item.to}
      to={item.to}
      className={({ isActive }) =>
        isActive
          ? 'flex justify-center items-center bg-gray-800 rounded-md p-2 transition-colors'
          : 'flex justify-center items-center hover:bg-gray-800 rounded-md p-2 transition-colors'
      }
    >
      <i className={`${item.icon} text-2xl mr-4 text-indigo-400`}></i>
      <div className="flex flex-col flex-grow">
        <span className="text-stone-300 text-lg font-semibold">
          {item.title}
        </span>
        <span className="text-gray-400 text-sm">{item.description}</span>
      </div>
    </NavLink>
  );
};

export default SidebarItem;

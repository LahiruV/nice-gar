import { Bars3Icon, BellIcon } from '@heroicons/react/24/outline';
import { logout, persistor, store } from '@zenra/store';
import { Button } from '@zenra/widgets';
import { useNavigate } from 'react-router-dom';

interface HeaderProps {
  onMenuClick: () => void;
}

export const Header = ({ onMenuClick }: HeaderProps) => {
  const navigate = useNavigate();


  const handleLogout = async () => {
    // 1) clear redux state
    store.dispatch(logout());

    // 2) stop persisting while we wipe
    await persistor.pause();

    // 3) wipe persisted storage
    await persistor.purge();

    // 4) (optional but helps) remove the persist root key explicitly
    localStorage.removeItem('persist:root');

    // 5) continue (optional)
    await persistor.flush();

    navigate('/');
  };

  return (
    <header className="bg-white shadow-sm">
      <div className="flex items-center justify-between h-16 px-4">
        <button
          className="text-gray-600 md:hidden"
          onClick={onMenuClick}
        >
          <Bars3Icon className="h-6 w-6" />
        </button>

        <div className="flex items-center space-x-4 ml-auto">
          <button className="text-gray-600 hover:text-gray-900">
            <BellIcon className="h-6 w-6" />
          </button>
          <Button
            variant="secondary"
            size="small"
            onClick={handleLogout}
            style={{
              backgroundColor: '#c71c1cff',
            }}
          >
            Logout
          </Button>
        </div>
      </div>
    </header>
  );
};
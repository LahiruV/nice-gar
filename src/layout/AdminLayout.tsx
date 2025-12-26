import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar, Header } from '../components/admin';

export const AdminLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <div
        className={`${isSidebarOpen ? 'w-64' : 'w-0'
          } h-full overflow-y-auto transition-all duration-300`}
      >
        <Sidebar isOpen={isSidebarOpen} />
      </div>

      <div className="flex-1 flex flex-col  overflow-y-auto">
        <div className="sticky top-0 bg-white shadow z-10">
          <Header onMenuClick={toggleSidebar} />
        </div>
        <main className="flex-1 p-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

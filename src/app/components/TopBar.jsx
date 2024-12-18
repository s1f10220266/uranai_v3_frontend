import { useState } from 'react';

export default function TopBar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // サイドバーを開閉する関数
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="bg-gray-400 h-12 flex items-center justify-between px-4 border-b border-black">
      <h1 className="text-white font-bold text-lg">URANAI</h1>
      <div className="space-y-1 cursor-pointer" onClick={toggleSidebar}>
        <div className="w-6 h-0.5 bg-gray-700"></div>
        <div className="w-6 h-0.5 bg-gray-700"></div>
        <div className="w-6 h-0.5 bg-gray-700"></div>
      </div>

      {/* サイドバーの表示制御 */}
      {isSidebarOpen && (
        <div className="fixed top-0 right-0 w-64 h-full bg-gray-400 text-white p-4">
          <button
            className="absolute top-4 right-4 text-white text-xl"
            onClick={toggleSidebar}
          >
            ×
          </button>
          <ul>
            <li className="mb-4">URANAIの使い方</li>
            <li className="mb-4">URANAIとは？</li>
            <li className="mb-4">開発者について</li>
            <li className="mb-4">性格診断方法について</li>
            <li className="mb-4">MBTIの種類</li>
          </ul>
        </div>
      )}
    </div>
  );
}

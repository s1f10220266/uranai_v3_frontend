import { useState } from 'react';
import Link from 'next/link';

export default function TopBar({ onLoginClick }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="bg-gray-400 h-16 flex items-center justify-between px-4 border-b border-black">
      <h1 className="text-white font-bold text-4xl">
        <Link href="/">URANAI</Link>
      </h1>
      <div className="space-y-1 cursor-pointer" onClick={toggleSidebar}>
        <div className="w-6 h-0.5 bg-gray-700"></div>
        <div className="w-6 h-0.5 bg-gray-700"></div>
        <div className="w-6 h-0.5 bg-gray-700"></div>
      </div>

      {/* サイドバーの表示制御 */}
      {isSidebarOpen && (
        <div className="fixed top-0 right-0 w-64 h-full bg-gray-200 text-gray-800 shadow-lg p-4">
          <button className="absolute top-4 right-4 text-gray-800 text-3xl"
            onClick={toggleSidebar}
          >
            <span className="absolute top-0 bottom-0 -left-4 -right-4 hover:bg-gray-400 rounded-lg -z-10"></span>
            ×
          </button>
          <div className="mt-12 text-center font-bold text-xl mb-4 hover:bg-gray-400 rounded-lg -z-10">
            <Link href="/">URANAIをはじめる</Link>
          </div>
          <ul className="space-y-5">
            <li className="relative border-b border-gray-300 rounded-lg group">
              <span className="absolute -top-2 left-0 right-0 bg-transparent"></span>
              <Link href="../explanation/#No.1" className="block hover:bg-gray-400 rounded-lg p-2">
                URANAIとは？
              </Link>
            </li>
            <li className="relative border-b border-gray-300 rounded-lg group">
              <span className="absolute -top-2 left-0 right-0 bg-transparent"></span>
              <Link href="../explanation/#No.2" className="block hover:bg-gray-400 rounded-lg p-2">URANAIの使い方</Link>
            </li>
            <li className="relative border-b border-gray-300 rounded-lg group">
              <span className="absolute -top-2 left-0 right-0 bg-transparent"></span>
              <Link href="../explanation/#No.3" className="block hover:bg-gray-400 rounded-lg p-2">性格診断方法について</Link>
            </li>
            <li className="relative border-b border-gray-300 rounded-lg group">
              <span className="absolute -top-2 left-0 right-0 bg-transparent"></span>
              <Link href="../explanation/#No.4" className="block hover:bg-gray-400 rounded-lg p-2">性格タイプの種類</Link>
            </li>
            <li className="relative border-b border-gray-300 rounded-lg group">
              <span className="absolute -top-2 left-0 right-0 bg-transparent"></span>
              <Link href="../explanation/#No.5" className="block hover:bg-gray-400 rounded-lg p-2">開発者について</Link>
            </li>
          </ul>
          <div className="mt-6 flex flex-col items-center">
            <button onClick={() => {
                toggleSidebar();
                onLoginClick();
              }} className="flex items-center justify-center w-48 py-2 bg-blue-300 text-black rounded shadow hover:bg-gray-400 mb-4">
              <span className="mr-2">👤</span>ログイン
            </button>
            {/* <button className="flex items-center justify-center w-48 py-2 bg-gray-300 text-black rounded shadow hover:bg-gray-400 mb-4">
              <span className="mr-2">👤</span> <Link href="/login" className="text-blue-500 underline hover:text-blue-700">ログイン</Link>
            </button> */}
            <button className="flex items-center justify-center w-48 py-2 bg-blue-300 text-black rounded shadow hover:bg-blue-400">
              <span className="mr-2">👤</span><Link href="/account">サインイン</Link>
            </button>
            {/* <button className="flex items-center justify-center w-48 py-2 bg-blue-300 text-black rounded shadow hover:bg-blue-400">
              <span className="mr-2">👤</span> <Link href="/account" className="text-blue-500 underline hover:text-blue-700">サインイン</Link>
            </button> */}
          </div>
        </div>
      )}
    </div>
  );
}

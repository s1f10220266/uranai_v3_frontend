"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import TopBar from './components/TopBar';
import { useAuth } from "./contexts/AuthContext";

export default function Home() {
  const [action, setAction] = useState(null);
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [loginName, setLoginName] = useState("");
  const [loginPass, setLoginPass] = useState("");
  const { login } = useAuth();
  

  const [showLoginForm, setShowLoginForm] = useState(false);
  const handleIntroBtnClick = (n) => {
    setAction(n);
  };

  const handleLogin = async (e) => {
    e.preventDefault(); // ページ遷移を防ぐ
    setLoginError(""); // エラーメッセージをリセット
    setLoginSuccess(""); // 成功メッセージをリセット

    // フロントエンドで入力データをバリデーション
    if (!loginName || !loginPass) {
        setLoginError("ニックネームとパスワードを入力してください。");
        return;
    }
    // console.log("Sending data:", { name: loginName, password: loginPass });
    try {
      const response = await fetch("https://uranai-backend-v3.onrender.com/api/login", {
          method: "POST",
          headers: {
              "Content-Type": "application/json",
          },
          body: JSON.stringify({ name: loginName, password: loginPass }),
      });
  
      console.log("Raw response:", response);
  
      const result = await response.json(); // ここで例外が発生する可能性あり
      console.log("Parsed response JSON:", result);
  
      if (response.ok && result.loginSuccess) {
          login({accountName: loginName});
          setLoginSuccess("ログインしました！");
      } else {
          setLoginError(result.error + "ログインに失敗しました。ニックネームとあいことばを確認してください。");
      }
  } catch (error) {
      console.error("Catch block triggered:", error);
      setLoginError("エラーが発生しました。ログインできません。");
  }
};

  return (
    <div className="">
      <TopBar onLoginClick={() => setShowLoginForm(true)}/>
      <>
        <div className="flex flex-col items-center justify-center min-h-screen">
          {/* タイトル */}
          <h1 className="text-8xl font-bold text-center mb-8">URAN<span className="text-blue-500">AI</span></h1>

          {/* 説明文 */}
          <ul className="text-2xl text-center space-y-4 mb-10">
            <li className="flex justify-center mr-14">
              <span className="w-10 text-right">1.</span>
              <span className="pl-2">質問に回答</span>
            </li>
            <li className="flex justify-center ml-10">
              <span className="w-10 text-right">2.</span>
              <span className="pl-2">なりたい職業を入力</span>
            </li>
            <li className="flex justify-center mr-2">
              <span className="w-10 text-right">3.</span>
              <span className="pl-2">適正具合を診断</span>
            </li>
          </ul>
          <div>
          {showLoginForm && (
            <form onSubmit={handleLogin} className="flex flex-col items-center space-y-4">
              <label htmlFor="name" className="text-lg">
                ニックネーム
              </label>
              <input
                type="text"
                id="name"
                placeholder="UranaiCatちゃん"
                value={loginName}
                onChange={(e) => setLoginName(e.target.value)}
                className="border border-gray-300 p-2 rounded w-64"
              />
              <label htmlFor="password" className="text-lg">
                あいことば
              </label>
              <input
                type="password"
                id="password"
                placeholder=""
                value={loginPass}
                onChange={(e) => setLoginPass(e.target.value)}
                className="border border-gray-300 p-2 rounded w-64"
              />
              <Link href="/start" className="group relative inline-flex h-[calc(48px+8px)] items-center justify-center rounded-full bg-neutral-950 py-1 pl-6 pr-14 font-medium text-neutral-50 my-4">
                <span className="z-10 pr-2">ログイン</span>
                <div className="absolute right-1 inline-flex h-12 w-12 items-center justify-end rounded-full bg-neutral-700 transition-[width] group-hover:w-[calc(100%-8px)]">
                  <div className="mr-3.5 flex items-center justify-center">
                    <svg
                      width="15"
                      height="15"
                      viewBox="0 0 15 15"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-neutral-50"
                    >
                      <path
                        d="M8.14645 3.14645C8.34171 2.95118 8.65829 2.95118 8.85355 3.14645L12.8536 7.14645C13.0488 7.34171 13.0488 7.65829 12.8536 7.85355L8.85355 11.8536C8.65829 12.0488 8.34171 12.0488 8.14645 11.8536C7.95118 11.6583 7.95118 11.3417 8.14645 11.1464L11.2929 8H2.5C2.22386 8 2 7.77614 2 7.5C2 7.22386 2.22386 7 2.5 7H11.2929L8.14645 3.85355C7.95118 3.65829 7.95118 3.34171 8.14645 3.14645Z"
                        fill="currentColor"
                        fillRule="evenodd"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  </div>
                </div>
              </Link>

              {loginError && <div className="text-red-500">{loginError}</div>}
              {loginSuccess && <div className="text-green-500">{loginSuccess}</div>}
            </form>
            )}
          </div>

          <Link href="/account">アカウント</Link>

  
          {!showLoginForm && (
            <Link href="/start" className="group relative inline-flex h-[calc(48px+8px)] items-center justify-center rounded-full bg-neutral-950 py-1 pl-6 pr-14 font-medium text-neutral-50 my-4">
              <span className="z-10 pr-2">URANAIを始める！</span>
              <div className="absolute right-1 inline-flex h-12 w-12 items-center justify-end rounded-full bg-neutral-700 transition-[width] group-hover:w-[calc(100%-8px)]">
                <div className="mr-3.5 flex items-center justify-center">
                  <svg
                    width="15"
                    height="15"
                    viewBox="0 0 15 15"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-neutral-50"
                  >
                    <path
                      d="M8.14645 3.14645C8.34171 2.95118 8.65829 2.95118 8.85355 3.14645L12.8536 7.14645C13.0488 7.34171 13.0488 7.65829 12.8536 7.85355L8.85355 11.8536C8.65829 12.0488 8.34171 12.0488 8.14645 11.8536C7.95118 11.6583 7.95118 11.3417 8.14645 11.1464L11.2929 8H2.5C2.22386 8 2 7.77614 2 7.5C2 7.22386 2.22386 7 2.5 7H11.2929L8.14645 3.85355C7.95118 3.65829 7.95118 3.34171 8.14645 3.14645Z"
                      fill="currentColor"
                      fillRule="evenodd"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </div>
              </div>
            </Link>
          )}
        </div>
      </>
    </div>
  );
}

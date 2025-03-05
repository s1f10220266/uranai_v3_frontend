"use client";

import React, { useState } from "react";
import Link from "next/link";
import TopBar from "../components/TopBar";
import { useAuth } from "../contexts/AuthContext";

export default function Login() {
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [loginName, setLoginName] = useState("");
  const [loginPass, setLoginPass] = useState("");
  const { login, logout, setIsLoggedIn } = useAuth();

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
  
      const result = await response.json();
      console.log("Parsed response JSON:", result);
  
      if (response.ok && result.loginSuccess) {
          login(loginName);
          setIsLoggedIn(true);
          setLoginSuccess("ログインしました！");
      } else {
            logout();
          setLoginError("ログインに失敗しました。ニックネームとあいことばを確認してください。");
      }
    } catch (error) {
        console.error("Catch block triggered:", error);
        setLoginError("エラーが発生しました。ログインできません。");
    }
    };
    
    return (
        <>
        <TopBar />
        <div className="min-h-screen flex items-center justify-center pt-12 pb-8">
                <div className="max-w-2xl w-full bg-white shadow-md rounded-lg p-6">
                    <h1 className="text-2xl font-bold text-center mb-4">ログインフォーム</h1>
                    <form onSubmit={handleLogin} className="space-y-4">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700">ニックネーム</label>
                            <input
                                type="text"
                                id="name"
                                placeholder="UranaiCat"
                                value={loginName}
                                onChange={(e) => setLoginName(e.target.value)}
                                className="w-full p-3 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">あいことば</label>
                            <input
                                type="password"
                                id="password"
                                placeholder="ヒミツのあいことば"
                                value={loginPass}
                                onChange={(e) => setLoginPass(e.target.value)}
                                className="w-full p-3 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                            <div className="text-center mt-5">
                                <button type="submit" className="w-full bg-blue-500 text-white p-3 rounded-md hover:bg-blue-600 transition">
                                    ログイン
                                </button>
                        </div>
                    </form>
                    <div className="mt-6 text-center">
                        {loginSuccess ? (<div className="mb-5" style={{ color: "green" }}>{loginSuccess}</div>): (<></>)}
                        {loginError ? (<div className="mb-5" style={{ color: "red" }}>{loginError}</div>): (<></>)}
                        <Link href="/" className="text-blue-500 hover:underline">トップページに戻る</Link>
                    </div>
                </div>
            </div>
        </>
    );
}

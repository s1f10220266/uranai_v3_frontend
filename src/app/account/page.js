"use client";

import React, { useState } from "react";
import Link from "next/link";
import TopBar from "../components/TopBar";

export default function Account() {
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault(); // ページ遷移を防ぐ
        setError(""); // エラーメッセージをリセット
        setSuccess(""); // 成功メッセージをリセット
    
        // フロントエンドで入力データをバリデーション
        if (!name || !password) {
            setError("ニックネームとパスワードを入力してください。");
            return;
        }
    
        try {
            const response = await fetch("https://uranai-backend-v3.onrender.com/api/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ name, password }), // JSON形式で送信
            });
    
            const result = await response.json();
    
            if (result.nameExist) {
                setSuccess("アカウントが正常に作成されました！");
            } else {
                setError("そのニックネームはすでに使われています。別のニックネームを試してください。");
            }
        } catch (error) {
            setError("エラーが発生しました。もう一度お試しください。");
        }
    };

    return (
        <>
            <TopBar />
            <div className="min-h-screen flex items-center justify-center pt-12 pb-8">
                <div className="max-w-2xl w-full bg-white shadow-md rounded-lg p-6">
                    <h1 className="text-2xl font-bold text-center mb-4">アカウントを作成する</h1>
                    <p className="text-center mb-6 text-gray-600">
                        アカウントを作成することで、過去のシナリオを振り返れるようになります
                    </p>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700">ニックネーム</label>
                            <input
                                type="text"
                                id="name"
                                placeholder="URANAIで使用するニックネーム"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full p-3 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">あいことば</label>
                            <input
                                type="password"
                                id="password"
                                placeholder="ログインのためのパスワード"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full p-3 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        {/* <div className="text-center">
                            <button type="submit" className="group relative inline-flex h-[calc(48px+8px)] items-center justify-center rounded-full bg-neutral-950 py-1 pl-6 pr-14 font-medium text-neutral-50 my-4">
                                <span className="z-10 pr-2">作成する</span>
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
                            </button>
                        </div> */}
                        <div className="text-center">
                            <button type="submit" className="w-full bg-blue-500 text-white p-3 rounded-md hover:bg-blue-600 transition">
                                作成
                            </button>
                        </div>
                    </form>

                    {/* エラーメッセージ */}
                    {error && <div className="mt-4 text-center text-red-600 font-bold">{error}</div>}

                    {/* 成功メッセージ */}
                    {success && <div className="mt-4 text-center text-green-600 font-bold">{success}</div>}

                    <div className="mt-6 text-center">
                        <Link href="/" className="text-blue-500 hover:underline">トップページに戻る</Link>
                    </div>
                </div>
            </div>
        </>
    );
}

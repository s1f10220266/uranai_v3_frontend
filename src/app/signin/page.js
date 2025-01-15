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
                        <div className="text-center">
                            <button type="submit" className="w-full bg-blue-500 text-white p-3 rounded-md hover:bg-blue-600 transition">
                                作成
                            </button>
                        </div>
                    </form>

                    {/* エラーメッセージ */}
                    {error && <div className="text-center mt-5" style={{ color: "red" }}>{error}</div>}

                    {/* 成功メッセージ */}
                    {success && <div className="text-center mt-5" style={{ color: "green" }}>{success}</div>}

                    <div className="mt-6 text-center">
                        <Link href="/" className="text-blue-500 hover:underline">トップページに戻る</Link>
                    </div>
                </div>
            </div>
        </>
    );
}
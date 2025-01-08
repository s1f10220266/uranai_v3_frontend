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
            <div>アカウントを作成する</div>
            <div>アカウントを作成することで、過去のシナリオを振り返れるようになります</div>

            <form onSubmit={handleSubmit}>
                <label htmlFor="name">ニックネーム</label>
                <input
                    type="text"
                    id="name"
                    placeholder="URANAIで使用するニックネーム"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <label htmlFor="password">あいことば</label>
                <input
                    type="password"
                    id="password"
                    placeholder="ログインのためのパスワード"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit">作成</button>
            </form>

            {/* エラーメッセージ */}
            {error && <div style={{ color: "red" }}>{error}</div>}

            {/* 成功メッセージ */}
            {success && <div style={{ color: "green" }}>{success}</div>}

            <Link href="/">トップページに戻る</Link>
        </>
    );
}

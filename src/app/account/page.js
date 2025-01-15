"use client";

import React, { useState } from "react";
import TopBar from "../components/TopBar";
import { useAuth } from "../contexts/AuthContext";

export default function Account() {
    const { uranaiUser, isLoggedIn } = useAuth();
    const [pastData, setPastData] = useState({});

    const getPast = async () => {
        if (!uranaiUser) return;

        try {
            const response = await fetch("https://uranai-backend-v3.onrender.com/api/past", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ name: uranaiUser }),
            });

            if (response.ok) {
                const data = await response.json();
                console.log("Past Data:", data);
                setPastData(data.past); // 正しい構造を確認
            } else {
                console.error("Failed to fetch past data");
            }
        } catch (error) {
            console.error("Error fetching past data:", error);
        }
    };

    return (
        <>
            <TopBar />
            {isLoggedIn ? (
                <div>
                    <div>アカウント情報</div>
                    <div>ユーザー名: {uranaiUser.accountName || uranaiUser}</div>

                    <button onClick={getPast}>過去の記録を取得</button>

                    <h2>過去の記録</h2>
                    {pastData && pastData.uranai_user_type && Array.isArray(pastData.uranai_user_type) && pastData.uranai_user_type.length > 0 ? (
                        <table border="1">
                            <thead>
                                <tr>
                                    <th>性格タイプ</th>
                                    <th>なりたい職業</th>
                                    <th>占い結果</th>
                                </tr>
                            </thead>
                            <tbody>
                                {pastData.uranai_user_type.map((type, index) => (
                                    <tr key={index}>
                                        <td>{type}</td>
                                        <td>{pastData.uranai_user_job[index]}</td>
                                        <td>{pastData.uranai_user_scenario[index]}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <div>過去の記録はありません。</div>
                    )}
                </div>
            ) : (
                <div>
                    <div>アカウントを作成すると以下のメリットがあります:</div>
                    <ul>
                        <li>性格チェックの結果、なりたい職業、シナリオを保存できる</li>
                    </ul>
                </div>
            )}
        </>
    );
}

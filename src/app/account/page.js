"use client";

import React, { useState } from "react";
import TopBar from "../components/TopBar";
import { useAuth } from "../contexts/AuthContext";

export default function Account() {
    const { uranaiUser, isLoggedIn } = useAuth();
    const [pastData, setPastData] = useState({});
    const [expandedIndex, setExpandedIndex] = useState(null);

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
                setPastData(data.past);
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
                    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif", backgroundColor: "#e6f0ff" }}>
                    {isLoggedIn ? (
                        <div>
                            <h1 className="text-3xl" style={{ marginBottom: "20px" }}>アカウント情報</h1>
                            <div className="text-2xl" style={{ marginBottom: "20px" }}>
                                <strong>ユーザー名: </strong>{uranaiUser.accountName || uranaiUser}
                            </div>
                            <button
                                style={{
                                    padding: "10px 20px",
                                    backgroundColor: "#007bff",
                                    color: "white",
                                    border: "none",
                                    borderRadius: "5px",
                                    cursor: "pointer",
                                }}
                                onClick={getPast}
                            >
                                過去の記録を取得
                            </button>
                            <h2 className="text-3xl" style={{ marginTop: "40px" }}>過去の記録</h2>
                            {pastData && pastData.uranai_user_type && pastData.uranai_user_type.length > 0 ? (
                                <div
                                    style={{
                                        overflowX: "auto",
                                        marginTop: "20px",
                                        backgroundColor: "white",
                                        borderRadius: "8px",
                                        padding: "20px",
                                        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                                    }}
                                >
                                    <table
                                        style={{
                                            width: "100%",
                                            borderCollapse: "collapse",
                                            border: "1px solid #ddd",
                                        }}
                                    >
                                        <thead>
                                            <tr style={{ backgroundColor: "#f2f2f2" }}>
                                                <th style={{ padding: "10px", textAlign: "left" }}>性格タイプ</th>
                                                <th style={{ padding: "10px", textAlign: "left" }}>なりたい職業</th>
                                                <th style={{ padding: "10px", textAlign: "left" }}>占い結果</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {pastData.uranai_user_type.map((type, index) => (
                                                <React.Fragment key={index}>
                                                    <tr>
                                                        <td style={{ padding: "10px", border: "1px solid #ddd" }}>{type}</td>
                                                        <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                                                            {pastData.uranai_user_job[index]}
                                                        </td>
                                                        <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                                                            <button
                                                                style={{
                                                                    padding: "5px 10px",
                                                                    backgroundColor: "#007bff",
                                                                    color: "white",
                                                                    border: "none",
                                                                    borderRadius: "5px",
                                                                    cursor: "pointer",
                                                                }}
                                                                onClick={() =>
                                                                    setExpandedIndex(expandedIndex === index ? null : index)
                                                                }
                                                            >
                                                                詳細を見る
                                                            </button>
                                                        </td>
                                                    </tr>
                                                    {expandedIndex === index && (
                                                        <tr>
                                                            <td
                                                                colSpan="3"
                                                                style={{
                                                                    padding: "10px",
                                                                    border: "1px solid #ddd",
                                                                    backgroundColor: "#f9f9f9",
                                                                }}
                                                            >
                                                                {pastData.uranai_user_scenario[index]}
                                                            </td>
                                                        </tr>
                                                    )}
                                                </React.Fragment>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            ) : (
                                <div style={{ marginTop: "20px" }}>過去の記録はありません。</div>
                            )}
                        </div>
                    ) : (
                        <div>
                            <h1>アカウントを作成すると以下のメリットがあります:</h1>
                            <ul>
                                <li>性格チェックの結果、なりたい職業、シナリオを保存できる</li>
                            </ul>
                        </div>
                    )}
            </div>
        </>
    );
}

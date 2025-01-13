"use client";

import TopBar from "../components/TopBar";
import React, { useState, useEffect } from "react";
import { useType } from "../contexts/TypeContext";
import { useRouter } from "next/navigation";

export default function Personality() {
  const router = useRouter();
  const { typeResult, typeExplain, saveScenarioResult, saveInputJob } = useType();

  const [userJob, setUserJob] = useState("");
  const [scenarioError, setScenarioError] = useState("");
  const [ok, setOk] = useState(false);

  const BoxedText = ({ children }) => (
    <div className="border border-gray-800 p-4 bg-white text-black shadow-lg rounded-lg">
        <div className="leading-relaxed">
            {children}
        </div>
    </div>
  );

  const handleSendInfo = async () => {
    setScenarioError("");
    if (!userJob) {
      setScenarioError("なりたい職業を入力してください！");
      return;
    }
    setOk(true);
    saveInputJob(userJob);

    try {
      const response = await fetch("https://uranai-backend-v3.onrender.com/api/scenario", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ type: typeResult, job: userJob }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log("Scenario API Response:", result);

      if (result.scenario) {
        saveScenarioResult(result.scenario);
        router.push("/scenario");
      } else {
        setScenarioError("シナリオ結果が返されませんでした。");
      }
    } catch (error) {
      console.error("エラーが発生しました:", error.message);
      setScenarioError("データの送信に失敗しました。もう一度お試しください。");
    }
  };

  return (
    <>
      <TopBar />
      <div className="flex flex-col items-center justify-start h-screen space-y-6 pt-20">
        <div className="text-6xl font-bold">あなたの性格は</div>
        <div className="text-5xl font-bold text-blue-600">{typeResult}</div>
        <BoxedText>
          {typeExplain ? (
            <div className="text-2xl text-center max-w-xl">{typeExplain}</div>
          ) : (
            <div className="flex items-center space-x-2 text-4xl">
            <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-blue-500"></div>
            <div className="animate-bounce text-gray-500">...分析中...</div>
            </div>
          )}
        </BoxedText>

        {scenarioError && <div className="text-2xl text-red-500">{scenarioError}</div>}

        <div className="flex flex-col items-center space-y-4">
          <label className="text-2xl">
            なりたい職業を入力してください:
            <input
              type="text"
              value={userJob}
              onChange={(e) => setUserJob(e.target.value)}
              className="border rounded px-2 py-1 mt-2"
            />
          </label>

          <div className="group relative inline-flex h-[calc(48px+8px)] items-center justify-center rounded-full bg-neutral-950 py-1 pl-6 pr-14 font-medium text-neutral-50">
              <button onClick={handleSendInfo} className="z-10 pr-2"><span className="">シナリオを生成する</span></button>
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
              </div>
        </div>

        <div>
          {ok ? (
            <div className="flex items-center text-2xl text-green-500 pb-10">
              <img src="img/catFortuneTelling.gif" style={{ width: '150px', height: 'auto' }} alt="占い猫" />
              <span>URANAICatさんが占いを開始しました！少しお待ちください。</span>
            </div>
          ) : (
            <div className="text-2xl pb-10">ボタンを押して占いを開始しましょう！</div>
          )}
        </div>
      </div>
    </>
  );
}

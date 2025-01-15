"use client";

import Image from 'next/image';
import React, { useState } from 'react';
import Link from 'next/link';
import { useAuth } from "../contexts/AuthContext";
import { useType } from "../contexts/TypeContext";
import TopBar from "../components/TopBar";
import { useRouter } from "next/navigation";


export default function Scenario() {
  const { typeResult, scenarioResult, inputJob, resetTypeContext, saveInputJob, saveScenarioResult } = useType();
  const { uranaiUser, isLoggedIn, setUranaiUser } = useAuth();
  const router = useRouter();
  const [anotherJob, setAnotherJob] = useState("");
  const [createAgainErr, setCreateAgainErr] = useState("");
  const [okAgain, setOkAgain] = useState(false);
  const [anotherScenarioError, setAnotherScenarioError] = useState("");
  
  const handleResetAll = () => {
    resetTypeContext();
    console.log("おしまい");
    router.push('/');
  }

  const handleScenarioAgain = async () => {
    setCreateAgainErr("");
    setAnotherScenarioError("");

    if (!anotherJob) {
      setCreateAgainErr("なりたい職業を入力してください！");
      return;
    }
    setOkAgain(true);
    saveInputJob(anotherJob); // 新しいなりたい職業を保存

    if (!isLoggedIn) setUranaiUser("");
    try {
      const response = await fetch("https://uranai-backend-v3.onrender.com/api/scenario", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ type: typeResult, job: anotherJob, name: uranaiUser }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log("Scenario API Response:", result);

      if (result.scenario) {
        saveScenarioResult(result.scenario);
        setOkAgain(false); //結果が帰ってきたら再生成しているuranai_catを消す作業
      } else {
        setAnotherScenarioError("シナリオ結果が返されませんでした。");
        setOkAgain(false); //結果が帰ってきたら再生成しているuranai_catを消す作業
      }
    } catch (error) {
      console.error("エラーが発生しました:", error.message);
      setAnotherScenarioError("データの送信に失敗しました。もう一度お試しください。");
    }
  }

  return (
    <>
      <TopBar />
        <div className="flex flex-col items-center justify-start h-screen space-y-8 pt-12 px-4">
          <div className="flex flex-col md:flex-row md:space-x-8 items-center justify-center w-full max-w-4xl space-y-6 md:space-y-0">
            <div className="flex flex-col items-center bg-white p-6 rounded-lg shadow-md w-full md:w-1/2">
              <div className="text-3xl font-bold text-gray-700">あなたの性格</div>
              <div className="text-3xl font-bold text-blue-600 mt-4">{typeResult}</div>
            </div>

            <div className="flex flex-col items-center bg-white p-6 rounded-lg shadow-md w-full md:w-1/2">
              <div className="text-3xl font-bold text-gray-700">あなたのなりたい職業</div>
              <div className="text-3xl font-bold text-blue-600 mt-4">{inputJob}</div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md flex-col max-w-4xl w-full flex items-center space-x-4">
            {/* 左側の内容 */}
            <div className="flex-1 space-y-4 text-center">
    <div className="text-xl font-bold text-gray-700">あなたのシナリオ</div>
    <div className="justify-center flex items-center">
    <div className="text-lg text-gray-800">
  {scenarioResult ? (
    scenarioResult.split("\n").map((line, index) => (
      <React.Fragment key={index}>
        {line}
        <br />
      </React.Fragment>
    ))
  ) : (
    <span>シナリオ生成中</span>
  )}
</div>
    </div>
  </div>
            {/* 右側の画像 */}
            {/* <div className="flex-shrink-0">
              <img src="img/uranaiCat.jpg" className="w-40 h-40 object-cover rounded-lg"/>
            </div> */}
          </div>
          <div className="flex flex-col items-start space-y-4 pb-10">
            <div className="flex flex-row items-center">
              <label className="text-2xl flex items-center">
                他の職業で占う:
                <input
                  type="text"
                  value={anotherJob}
                  onChange={(e) => setAnotherJob(e.target.value)}
                  className="border rounded px-2 py-2 ml-2"
                />
              </label>
              <button
                onClick={handleScenarioAgain}
                className="h-12 px-4 mr-5 bg-blue-300 text-black rounded shadow hover:bg-blue-400">
                シナリオ再生成
              </button>
              <div className="group relative inline-flex h-[calc(48px+8px)] items-center justify-center rounded-full bg-neutral-950 py-1 pl-6 pr-14 font-medium text-neutral-50">
              <button onClick={handleResetAll} className="z-10 pr-2"><span className="">おしまい</span></button>
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
              {okAgain ? (
                <div className="flex items-center text-2xl text-green-500 pb-10">
                    <Image src="/img/catFortuneTelling.gif" width={150} height={150} alt="占い猫" />
                    <span>URANAICatさんが占いを再生成しています。</span>
                </div>
              ) : (
                <div>{createAgainErr}</div>
              )}
            </div>
            {/* <div>
              {ok ? (
                <div className="flex items-center text-2xl text-green-500 pb-10">
                  <Image src="/img/catFortuneTelling.gif" style={{ width: '150px', height: 'auto' }} alt="占い猫" />
                  <span>URANAICatさんが占いを開始しました！少しお待ちください。</span>
                </div>
              ) : (
                <div className="text-2xl pb-10">ボタンを押して占いを開始しましょう！</div>
              )}
            </div> */}
          </div>
      </div>
    </>
  );
}
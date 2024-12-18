"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import TopBar from './components/TopBar';

export default function Home() {
  const [action, setAction] = useState(null);

  const handleIntroBtnClick = (n) => {
    setAction(n);
  };

  const handleGoogleLogin = (res) => {
    const jwtToken = res.credential;
    fetch("https://uranai-backend-v3.onrender.com/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token: jwtToken }),
    })
  }

  return (
    <div>
      <TopBar />
      <>
        <div className="flex flex-col items-center space-y-6">
          {/* タイトル */}
          {/*<h1 className="text-2xl font-bold">URANAI</h1>*/}

          {/* 説明文 */}
          <div className="text-center">
            "URANAI"は、近年注目されている生成AIを活用した就活サービスです。<br />
            現在も開発中のサービスです！お楽しみいただけたら幸いです！<br />
          </div>

          {/* ボタン */}
          <div className="inline-flex rounded-md shadow">
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded-l-md hover:bg-blue-600"
              onClick={() => handleIntroBtnClick("abouturanai")}
            >
              URANAIとは？
            </button>
            <button
              className="px-4 py-2 bg-blue-500 text-white hover:bg-blue-600"
              onClick={() => handleIntroBtnClick("howtouranai")}
            >
              URANAIのはじめ方
            </button>
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded-r-md hover:bg-blue-600"
              onClick={() => handleIntroBtnClick("aboutus")}
            >
              開発者について
            </button>
          </div>

          {/* 選択されたコンテンツ */}
          <div className="w-full max-w-2xl text-center">
            {action === "abouturanai" && (
              <div>
                URANAIとは、ChatGPT-4o miniを活用した就活を支援するWebアプリです。<br />
                調査を行った結果、"早期離職"が社会問題となっていることがわかりました。<br />
                データから見ても、およそ3割の人が3年以内に離職しており、<br />
                また、退職した理由としては、"仕事が自分に合わない"が全体の4割と最も多いことがわかりました。<br />
                そこで私たちは、柔軟な生成力、分析力をもつ生成AIを活用し、最終的にミスマッチを減らすことを目的としたURANAIの開発を始めました。<br />
                URANAIの名前の由来は、生成AIの"<span className="ai">AI</span>"と、"将来を占うようなアプリ"をもじって考案しました^^。
              </div>
            )}
            {action === "howtouranai" && (
              <div>
                URANAIでは、まず、性格診断を行います。<br />
                性格診断の結果は最近話題の16タイプでお返しします。<br />
                その後、あなたのなりたい職業をお聞きします。<br />
                あなたの性格と、なりたい職業から、有名占い師のuranaiCatさんが将来のシナリオを作成してくれます。<br />
                シナリオには、あなたが希望する職業に就いた際に、どうなるのか書かれています。<br />
                uranaiCatさんの占いでも、アタリ・ハズレはあるので参考程度にお読みください。<br />
                <strong className="intro-ul">1. 質問数を選択し、質問に回答</strong><br />
                <strong className="intro-ul">2. 性格タイプを確認し、なりたい職業を入力</strong><br />
                <strong className="intro-ul">3. 占いを開始する</strong><br />
                <strong className="intro-ul">4. uranaiCatさんのシナリオを読む</strong><br />
              </div>
            )}
            {action === "aboutus" && (
              <>
                <strong className="intro-title">開発者について</strong>
                <div className="intro-text">以下のサイトにアプリや、チームの紹介をまとめております。</div>
                <a
                  className="intro-text text-blue-500 hover:underline"
                  href="https://sites.google.com/iniad.org/1002/%E3%83%9B%E3%83%BC%E3%83%A0"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Google Site
                </a>
              </>
            )}
          </div>

          <div id="g_id_onload"
              data-client_id="963720505976-ej0q44199dea39vh2htg1q0mk414ftkl.apps.googleusercontent.com"
              data-context="signin"
              data-ux_mode="popup"
              data-callback="handleGoogleLogin"
              data-auto_prompt="false">
          </div>

          <div className="g_id_signin"
              data-type="standard"
              data-shape="pill"
              data-theme="filled_blue"
              data-text="signin_with"
              data-size="large"
              data-logo_alignment="left">
          </div>



          <Link href="/start" className="group relative inline-flex h-[calc(48px+8px)] items-center justify-center rounded-full bg-neutral-950 py-1 pl-6 pr-14 font-medium text-neutral-50">
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
        </div>
        <script src="https://accounts.google.com/gsi/client" async></script>
      </>
    </div>
  );
}

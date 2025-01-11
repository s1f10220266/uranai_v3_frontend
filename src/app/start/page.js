"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import TopBar from '../components/TopBar';
import { useAuth } from "../contexts/AuthContext";

export default function Start() {
const typeAPI = "https://uranai-backend-v3.onrender.com/api/type";
const { user, isLoggedIn } = useAuth();

  const [selectedNumber, setSelectedNumber] = useState(0);
  // const navigate = useNavigate();  // useNavigate フックに変更
    // 質問内容
    const questions = {
        e_or_i: [
            "人から注目されるのが好きだ",
            "人と関わるのが好きだ",
            "急な予定でも、勢いに任せて出掛ける",
            "休日は誰かとワイワイ過ごす",
            "期間限定のメニューが気になる",
        ],
        s_or_n: [
            "自炊の時に、レシピをしっかりチェックする",
            "恋人に求めるのは中身より見た目",
            "説明書は読む派",
            "集中している時に声をかけられても平気",
            "作文は構成をしっかり決めてから書く",
        ],
        t_or_f: [
            "効率よく物事を進めたい",
            "他人の考えはあまり興味がない",
            "悩んでいる友達には、共感するより解決策を提案する",
            "本を手に取ったら、目次を飛ばして、内容を読み始める",
            "衝動買いはしないタイプ",
        ],
        p_or_j: [
            "計画通りの人生は楽しくない",
            "いつもギリギリで行動する",
            "臨機応変に対応できる",
            "夏休みの宿題は後回し",
            "一度決めた考えは曲げない",
        ]
    }

    const handleQuestionEvent = (num) => {
      setSelectedNumber(num);
    };

    const handleTypeJudge = async () => {
        const answers = {};
        
        Object.keys(questions).forEach(key => {
            answers[key] = [];
            questions[key].forEach((_, i) => {
                const selectedOption = document.querySelector(`input[name="${key}_${i}"]:checked`);
                if (selectedOption) {
                    answers[key].push(parseInt(selectedOption.value, 10));
                } else {
                    answers[key].push(0); 
                }
            });
        });
    
        try {
            const resp = await fetch(typeAPI, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(answers),
            });

            const result = await resp.json();

            if (result.ready) {
                console.log("診断が完了しました");
            } else {
                console.log("診断に失敗しました");
            }
        } catch {
            console.log("エラーが発生しました")
        }
    };
    return (
        <>
            <TopBar />
            <div className="flex flex-col items-center space-y-6 p-4 bg-blue-100">
            <div className="">
                <div className="flex flex-col items-center text-3xl">こんにちは、{user ? user.accountName : "ゲスト"}</div>
            </div>
        
            <div className="flex space-x-2 mb-4">
                <div className="">
                    <p className='text-xl -ml-15'>質問数を選んで質問に回答してください！</p>
                    <div className="ml-20">
                        <button className="bg-white border border-gray-300 rounded-md px-4 py-2 hover:bg-gray-100" onClick={() => handleQuestionEvent(4)}>4問</button>
                        <button className="bg-white border border-gray-300 rounded-md px-4 py-2 hover:bg-gray-100" onClick={() => handleQuestionEvent(8)}>8問</button>
                        <button className="bg-white border border-gray-300 rounded-md px-4 py-2 hover:bg-gray-100" onClick={() => handleQuestionEvent(16)}>16問</button>
                    </div>
                </div>
                <div className="">
                    <div className=""></div>
                    <p className='text-xl'>自分の性格タイプを知っている人は・・・​</p>
                    <button className="">性格タイプ入力</button>
                    <button className="">職業入力へ</button>
                </div>
            </div>
        
            <div className="bg-white shadow-md rounded-md w-full max-w-4xl">
                <div className="p-4">
                {Object.keys(questions).map((key) =>
                    questions[key].slice(0, selectedNumber / 4).map((q, i) => (
                    <fieldset key={`${key}_${i}`} className="mb-4">
                        <legend className="text-xl mb-2">{q}</legend>
                        <div className="flex justify-center space-x-4 text-xl pb-3">
                        <label className="">
                            <input type="radio" name={`${key}_${i}`} value="2" className="mr-1" />
                            あてはまる
                        </label>
                        <label>
                            <input type="radio" name={`${key}_${i}`} value="1" className="mr-1" />
                            少しあてはまる
                        </label>
                        <label>
                            <input type="radio" name={`${key}_${i}`} value="-1" className="mr-1" />
                            あまりあてはまらない
                        </label>
                        <label>
                            <input type="radio" name={`${key}_${i}`} value="-2" className="mr-1" />
                            あてはまらない
                        </label>
                        </div>
                    </fieldset>
                    ))
                )}
                </div>
            </div>
        
            {selectedNumber > 0 && (
              <Link href="/personalities" className="group relative inline-flex h-[calc(48px+8px)] items-center justify-center rounded-full bg-neutral-950 py-1 pl-6 pr-14 font-medium text-neutral-50">
                <button onClick={handleTypeJudge} className="z-10 pr-2"><span className="">性格をチェックする</span></button>
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
    );
}

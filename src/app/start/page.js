"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import TopBar from '../components/TopBar';
import { useAuth } from "../contexts/AuthContext";
import { useType } from "../contexts/TypeContext";


export default function Start() {
const typeAPI = "https://uranai-backend-v3.onrender.com/api/type";
const { uranaiUser } = useAuth();
const {saveTypeResult, saveTypeExplain} = useType();
const [withoutQuiz, setWithoutQuiz] = useState("");

  const [selectedNumber, setSelectedNumber] = useState(0);
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
      
        // ラジオボタンの値を収集
        Object.keys(questions).forEach((key) => {
          answers[key] = [];
          questions[key].forEach((_, i) => {
            const selectedOption = document.querySelector(`input[name="${key}_${i}"]:checked`);
            answers[key].push(selectedOption ? parseInt(selectedOption.value, 10) : 0);
          });
        });
      
        try {
          // API呼び出し
          const resp = await fetch(typeAPI, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(answers),
          });
      
          if (!resp.ok) {
            throw new Error(`HTTP error! status: ${resp.status}`);
          }
      
          const result = await resp.json();
          console.log("API Response:", result);
      
          // saveTypeResult呼び出し前にデバッグログ
          console.log("Calling saveTypeResult with:", result.result);
      
          // 結果が成功した場合に保存とアクション更新
          if (result.ready) {
            saveTypeResult(result.result);
            saveTypeExplain(result.typeExplain);
            console.log("診断が完了しました");
            //router.push("/personalities");
          } else {
            console.log("診断に失敗しました");
          }
        } catch (error) {
          console.error("エラーが発生しました:", error.message);
        }
    };

    const handleCheckType = async () => {
    
      try {
        // API呼び出し
        const resp = await fetch("https://uranai-backend-v3.onrender.com/api/knowntype", {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({type: withoutQuiz}),
        });
    
        if (!resp.ok) {
          throw new Error(`HTTP error! status: ${resp.status}`);
        }
    
        const result = await resp.json();
        console.log("API Response:", result);
    
        // saveTypeResult呼び出し前にデバッグログ
        console.log("Calling saveTypeResult with:", result.result);
    
        // 結果が成功した場合に保存とアクション更新
        if (result.ready) {
          saveTypeResult(result.result);
          saveTypeExplain(result.typeExplain);
          console.log("診断が完了しました");
          //router.push("/personalities");
        } else {
          console.log("診断に失敗しました");
        }
      } catch (error) {
        console.error("エラーが発生しました:", error.message);
      }
  };

  return (
    <>
    <TopBar />
      <div className="flex flex-col items-center space-y-6">
        <div className="text-3xl">こんにちは、{uranaiUser ? uranaiUser: "ゲスト"}</div>
        <div className='grid grid-cols-1 sm:grid-cols-2 gap-10'>
        </div>
            <div className="flex space-x-2 mb-4">
                <div>
                    <p className='text-xl -ml-15'>質問数を選んで質問に回答してください！</p>
                    <div className="ml-20">
                        <button className="bg-white border border-gray-300 rounded-md px-4 py-2 h-12 hover:bg-gray-100" onClick={() => handleQuestionEvent(4)}>4問</button>
                        <button className="bg-white border border-gray-300 rounded-md px-4 py-2 h-12 hover:bg-gray-100" onClick={() => handleQuestionEvent(8)}>8問</button>
                        <button className="bg-white border border-gray-300 rounded-md px-4 py-2 h-12 hover:bg-gray-100" onClick={() => handleQuestionEvent(16)}>16問</button>
                    </div>
                </div>
                <div>
                  <div>
                    <label className="text-xl ml-12">自分の性格タイプを知っている人は・・・​</label>
                  </div>
                  <div className="flex items-center">
                    <select
                      value={withoutQuiz}
                      onChange={(e) => setWithoutQuiz(e.target.value)}
                      className="border rounded px-4 py-2 h-12"
                    >
                      <option value="" disabled>
                        性格タイプを選択してください
                      </option>
                      <option value="INTJ">INTJ (建築家)</option>
                      <option value="INTP">INTP (論理学者)</option>
                      <option value="ENTJ">ENTJ (指揮官)</option>
                      <option value="ENTP">ENTP (討論者)</option>
                      <option value="INFJ">INFJ (提唱者)</option>
                      <option value="INFP">INFP (仲介者)</option>
                      <option value="ENFJ">ENFJ (主人公)</option>
                      <option value="ENFP">ENFP (運動家)</option>
                      <option value="ISTJ">ISTJ (管理者)</option>
                      <option value="ISFJ">ISFJ (擁護者)</option>
                      <option value="ESTJ">ESTJ (幹部)</option>
                      <option value="ESFJ">ESFJ (領事)</option>
                      <option value="ISTP">ISTP (巨匠)</option>
                      <option value="ISFP">ISFP (冒険家)</option>
                      <option value="ESTP">ESTP (起業家)</option>
                      <option value="ESFP">ESFP (エンターテイナー)</option>
                    </select>
                    <Link href="/personalities">
                      <button
                        onClick={handleCheckType}
                        className="flex items-center justify-center w-48 h-12 bg-blue-300 text-black rounded shadow hover:bg-gray-400"
                      >
                        性格をチェックする
                      </button>
                    </Link>
                  </div>
                </div>
            </div>
        
            <div className={`w-full max-w-4xl ${selectedNumber > 0 ? 'bg-white shadow-md rounded-md' : ''}`}>
                <div className="p-4">
                    {selectedNumber > 0 && Object.keys(questions).map((key) =>
                    questions[key].slice(0, selectedNumber / 4).map((q, i) => (
                        <fieldset key={`${key}_${i}`} className="mb-4">
                        <legend className="text-lg mb-2">{q}</legend>
                        <div className="flex justify-center space-x-4">
                            <label>
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

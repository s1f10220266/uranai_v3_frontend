"use client";

import React, { useState } from "react";
import Link from "next/link";
import TopBar from "../components/TopBar";

export default function Account() {

    return (
        <div>
            <TopBar />
                <div className="flex flex-col min-h-screen mt-10 ml-10 mr-10">
                    <h1 className="text-4xl" id="No.1">URANAIとは</h1>
                        <div className="text-xl mt-3 mb-3">
                            <p className="mb-3">URANAIとはChatGPT-4o miniを活用した終活を支援するWebアプリです。</p>
                            <p className="mb-3">社会問題の調査を行った結果、"早期離職"が社会問題となっていることがわかりました。</p>
                            <p className="mb-3">データから見ても、およそ3割の人が3年以内に離職しており、退職した理由は、"仕事が自分に合わない"が全体の4割と最も多いことがわかりました。</p>
                            <p className="mb-3">そこで私たちは、柔軟な生成力、分析力をもつ生成AIを活用し、最終的にミスマッチを減らすことを目的としたURANAIの開発を始めました。</p>
                            <p className="">URANAIの名前の由来は、生成AIの"AI"と、"将来を占うようなアプリ"をもじって考案しました。</p>
                        </div>
                    <h1 className="text-4xl" id="No.2">URANAIの使い方</h1>
                        <div className="text-xl mt-3 mb-3">
                            <ul>
                                <li className="mb-3">
                                    <span className="mb-3">1.</span>
                                    <span className="pl-2">質問数を選択し、質問に回答</span>
                                </li>
                                <li className="mb-3">
                                    <span className="">2.</span>
                                    <span className="pl-2">性格タイプを確認し、なりたい職業を入力</span>
                                </li>
                                <li className="mb-3">
                                    <span className="">3.</span>
                                    <span className="pl-2">占いを開始する</span>
                                </li>
                                <li className="mb-3">
                                    <span className="">4.</span>
                                    <span className="pl-2">シナリオを読む</span>
                                </li>
                            </ul>
                            <p className="mb-3"> URANAIでは、まず、性格診断を行います。
                                性格診断の結果は最近話題の16タイプでお返しします。
                                その後、あなたのなりたい職業をお聞きします。​
                            </p>
                            <p className="mb-3">
                                あなたの性格と、なりたい職業から、将来のシナリオを作成します。​
                                シナリオには、あなたが希望する職業に就いた際に、どうなるのか書かれています。​
                            </p>
                            <p>
                                ※アタリ・ハズレはあるので参考程度にお読みください
                            </p>
                        </div>
                    <h1 className="text-4xl" id="No.3">性格診断方法</h1>
                        <div className="text-xl mt-3 mb-3">
                            <p className="mb-3">URANAIは「16 Personalities性格診断」を参考に診断をしています。</p>
                            <p className="mb-3">「16 Personalities性格診断」とは、物事に対する考え方や価値観の傾向から個人の思考を分析し、その人の深層的な強みと弱みに加え、思考の傾向について明らかにする性格診断テストのことです。</p>
                            <p className="mb-3">テスト自体は会員登録などせず誰でもネットで受検することができ、約60問の簡単な質問に回答していくだけで、自分の性格タイプを知ることが可能です。</p>
                            <p className="mb-3">その手軽さから、最近では就職活動や転職活動における自己分析の一環として取り組む人も増えてきています。</p>
                            <p>16Personalities公式サイト：<a href="https://www.16personalities.com/ja/" target="_blank" className="text-blue-500 underline">https://www.16personalities.com/ja/</a></p>
                        </div>
                    <h1 className="text-4xl" id="No.4">性格タイプの種類</h1>
                        <div className="text-xl mt-3 mb-3">
                            <p className="mb-3">「16 Personalities性格診断」における診断結果は必ずアルファベット4文字で表現されますが、これは以下の4つの指標×2つのタイプのどちらかの組み合わせを表しています。</p>
                            <p className="text-8xl">ここに図をやる</p>
                        </div>
                    <h1 className="text-4xl" id="No.5">開発者について</h1>
                        <div className="text-xl mt-3 mb-3">
                            <p className="mb-3">アプリや、チームの紹介をまとめています。</p>
                            <p className="mb-10">実習1002サイト：<a href="https://sites.google.com/iniad.org/1002/" target="_blank" className="text-blue-500 underline">https://sites.google.com/iniad.org/1002/</a></p>
                        </div>
                </div>
        </div>
    )
};
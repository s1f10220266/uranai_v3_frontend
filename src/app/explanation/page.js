"use client";
import React from "react";
import Link from "next/link";
import TopBar from "../components/TopBar";

const Section = ({ title, children }) => (
    <div className="mb-10">
        <h1 className="text-4xl mb-4">{title}</h1>
        <div className="text-xl space-y-3">
            {children}
        </div>
    </div>
);
const BoxedText = ({ children }) => (
    <div className="border border-gray-800 p-4 bg-white text-black shadow-lg rounded-lg">
        <div className="leading-relaxed">
            {children}
        </div>
    </div>
);
export default function Account() {
    return (
        <div>
            <TopBar />
            <div className="flex flex-col min-h-screen mt-10 ml-10 mr-10" id="No.1">
                <Section title="URANAIとは" id="No.1">
                    <BoxedText>
                        <p>URANAIとはChatGPT-4を活用した就活を支援するWebアプリです。</p>
                        <p>社会問題の調査を行った結果、「早期離職」が社会問題となっていることがわかりました。</p>
                        <p>データから見ても、およそ3割の人が3年以内に離職しており、退職した理由は、「仕事が自分に合わない」が全体の4割と最も多いことがわかりました。</p>
                        <p>そこで私たちは、柔軟な生成力、分析力をもつ生成AIを活用し、最終的にミスマッチを減らすことを目的としたURANAIの開発を始めました。</p>
                        <p>URANAIの名前の由来は、生成AIの「AI」と、「将来を占うようなアプリ」をもじって考案しました。</p>
                    </BoxedText>
                </Section>
                <Section title="URANAIの使い方" id="No.2">
                    <BoxedText>
                        <ul className="list-decimal pl-5">
                            <li>質問数を選択し、質問に回答</li>
                            <li>性格タイプを確認し、なりたい職業を入力</li>
                            <li>占いを開始する</li>
                            <li>シナリオを読む</li>
                        </ul>
                        <p>URANAIでは、まず、性格診断を行います。性格診断の結果は最近話題の16タイプでお返しします。その後、あなたのなりたい職業をお聞きします。</p>
                        <p>あなたの性格と、なりたい職業から、将来のシナリオを作成します。シナリオには、あなたが希望する職業に就いた際に、どうなるのか書かれています。</p>
                        <p>※アタリ・ハズレはあるので参考程度にお読みください</p>
                    </BoxedText>
                </Section>
                <Section title="性格診断方法" id="No.3">
                <BoxedText>
                        <p>URANAIは「16 Personalities性格診断」を参考に診断を行っています。</p>
                        <p>「16 Personalities性格診断」とは、物事に対する考え方や価値観の傾向から個人の思考を分析し、その人の深層的な強みと弱みに加え、思考の傾向について明らかにする性格診断テストのことを言います。​</p>
                        <p>テスト自体は会員登録などせず誰でもネットで受検することができ、約60問の簡単な質問に回答していくだけで、自分の性格タイプを知ることが可能です。</p>
                        <p>その手軽さから、最近では就職活動や転職活動における自己分析の一環として取り組む人も増えてきています。</p>
                        16Personalities公式サイト：
                        <a href="https://www.16personalities.com/ja/" target="_blank" className="text-blue-500 underline">
                            https://www.16personalities.com/ja/
                        </a>
                    </BoxedText>
                </Section>
                <Section title="性格タイプの種類" id="No.4">
                    <BoxedText>
                        <p>「16 Personalities性格診断」における診断結果は必ずアルファベット4文字で表現されますが、これは以下の4つの指標×2つのタイプのどちらかの組み合わせを表しています。</p>
                        <div className="flex justify-center items-center">
                            <img src="/img/image.png" alt="説明画像" className="w-full h-auto"/>
                        </div>
                    </BoxedText>
                </Section>
                <Section title="開発者について" id="No.5">
                    <BoxedText>
                        <p>アプリや、チームの紹介をまとめています。</p>
                        <p>
                            実習1002サイト：
                            <a href="https://sites.google.com/iniad.org/1002/" target="_blank" className="text-blue-500 underline">
                                https://sites.google.com/iniad.org/1002/
                            </a>
                        </p>
                    </BoxedText>
                </Section>
            </div>
        </div>
    );
}
//最新版 Tailwind（v4.x）＋ shadcn を使う場合は、以下のように手動で設定ファイルを作成します。by ChatGPT
/** @type {import('tailwindcss').Config} */
module.exports = {
//darkModeは<html class="dark"> が付いたときだけ(document.documentElement.classList.toggle('dark', isDark)) dark: に続くスタイルが適用されるようにできる
// ↑つまり、global.cssによるダークモード切替は採用しない場合。ChatGPTはうそをついているようだ。
//    darkMode: 'class', 
    content: [
      './pages/**/*.{js,ts,jsx,tsx}',
      './components/**/*.{js,ts,jsx,tsx}',
      './components/ui/**/*.{js,ts,jsx,tsx}'
    ],
    theme: {
        extend: {
            colors: {// いわゆるカスタム定義。好みの色に変えてOK
//              primary: '#3b82f6', 
//              input: '#1f2937', // gray-800 相当。入力エリアのdark:で使用を想定
            }
        },
    },
    plugins: [require('tailwindcss-animate')],
}
  

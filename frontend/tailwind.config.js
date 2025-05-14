//最新版 Tailwind（v4.x）＋ shadcn を使う場合は、以下のように手動で設定ファイルを作成します。by ChatGPT
/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      './pages/**/*.{js,ts,jsx,tsx}',
      './components/**/*.{js,ts,jsx,tsx}',
      './components/ui/**/*.{js,ts,jsx,tsx}'
    ],
    theme: {
      extend: {}
    },
    plugins: [require('tailwindcss-animate')]
  }
  

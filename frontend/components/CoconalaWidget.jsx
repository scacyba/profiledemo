import { useEffect } from "react"

export default function CoconalaWidget({
  serviceId,
  userId,
  width = 468,
  comment = 0,
  invite = 0,
  text = "ココナラサービスを見る",
}) {
  useEffect(() => {
    // すでにある場合は一度削除して再注入（強制再評価）
    const existing = document.getElementById("coconala-wjs")
    if (existing) {
      existing.remove()
    }

    const script = document.createElement("script")
    script.id = "coconala-wjs"
    script.src = "https://coconala.com/js/coconala_widget.js"
    script.async = true
    setTimeout(() => {
        document.body.appendChild(script)
      }, 50)
    }, [serviceId, userId]) // ← IDが変われば再注入
/*
React + useEffect の順番では：
<a class="coconala-widget"> を描画（dangerouslySetInnerHTML）
useEffect で <script> を追加
👉 スクリプトが読み込まれたときには .coconala-widget をすでに「読み逃している」
 */
  const html = `
    <a class="coconala-widget"
      href="https://coconala.com/services/${serviceId}"
      data-service_id="${serviceId}"
      data-width="${width}"
      data-comment="${comment}"
      data-invite="${invite}"
      data-user_id="${userId}">
      ${text}
    </a>
  `

  return <div dangerouslySetInnerHTML={{ __html: html }} />
}

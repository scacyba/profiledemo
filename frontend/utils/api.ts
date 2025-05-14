// ブラウザ側で環境変数を使うには、NEXT_PUBLIC_ を変数名の先頭につける必要があります。これがないとクライアントには渡されません。
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3001';

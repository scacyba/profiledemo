import { API_BASE_URL } from '../utils/api';
import Link from 'next/link';
import { useEffect, useState } from "react"

export default function Home() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/profile`);
        if (!res.ok) throw new Error('API error');
        const data = await res.json();
        setProfile(data);
      } catch (err) {
        console.warn('API失敗：仮データを使用します');
        setProfile({
          name: 'オオタスカシバコンサルタント',
          title: 'ITコンサルタント / エンジニア',
          bio: 'Nest.js APIが未起動のため、仮データで表示中です。',
        });
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) return <p>読み込み中...</p>;

  return (
      <div className="p-6">
        <h1 className="text-4xl font-bold">{profile.name}</h1>
        <p className="mt-4 text-xl">{profile.title}</p>
        <p className="mt-2">{profile.bio}</p>
        <br></br>
        {/* ✅ 編集ボタン */}
        <Link href="/edit">
          <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            プロフィールを編集する
          </button>
        </Link>
        <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">サービス紹介</h1>
        {/* CoconalaWidget.jsxとか作って対応を数時間試みたが動かず。結局iframeに落ち着いた*/}
        <iframe
            src="/coconala.html"
            height="400"
            title="Coconala Widget"
            />
        </div>
      </div>
  );
}

// 3. SSGでAPIからデータ取得
/*キャッシュされるようで、Renderでビルドした直後にDB接続できなかった場合などに困るので未使用
export default function Home({ profile }) で使用していた

export async function getStaticProps() {
    try {
      const res = await fetch(`${API_BASE_URL}/profile`);
      if (!res.ok) {
        throw new Error(`API Error: ${res.status}`);
      }
      const profile = await res.json();
  
      return { props: { profile } };
    } catch (error) {
      console.error('Failed to fetch profile:', error);
      // mock:API未完成時の仮データ
      return {
        props: {
          profile: {
            name: 'オオタスカシバコンサルタント',
            title: 'ITコンサルタント / エンジニア',
            bio: 'Nest.js APIが未起動のため、仮データで表示中です。',
          },
        },
      };
    }
  }
*/

import { useState, useEffect } from 'react';
import { API_BASE_URL } from '../utils/api';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import CoconalaWidget from "@/components/CoconalaWidget"

export default function EditProfile() {
  const [profile, setProfile] = useState({ id: null, name: '', title: '', bio: '' });
  const [message, setMessage] = useState('');

  // GET /profile で初期データを取得
  useEffect(() => {
    fetch(`${API_BASE_URL}/profile`)
      .then(res => res.json())
      .then(data => setProfile(data))
      .catch(err => {
        console.error('Fetch failed:', err);
        setMessage('プロフィールの取得に失敗しました');
      });
  }, []);

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch(`${API_BASE_URL}/profile`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(profile), // id含むオブジェクト
    });

    if (res.ok) {
      setMessage('✅ プロフィールを保存しました');
    } else {
      setMessage('❌ 保存に失敗しました');
    }
  };

  //bg-などをここで指定するとglobal.cssの指定を上書きする＝global.css＋だけでのダークモード切替もできなくなる。
  return (
    <div className="min-h-screen py-10 px-4">
      <div className="max-w-xl mx-auto p-6 rounded-lg" style={{ boxShadow: '0 4px 16px var(--shadow-color)' }}>
        <h1 className="text-3xl font-bold mb-6 text-center text-blue-600">プロフィール編集</h1>
  
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-semibold mb-1 ">名前</label>
            <Input name="name" value={profile.name} onChange={handleChange} required />
          </div>
  
          <div>
            <label className="block font-semibold mb-1 ">肩書き</label>
            <Input name="title" value={profile.title} onChange={handleChange} required />
          </div>
  
          <div>
            <label className="block font-semibold mb-1 ">自己紹介</label>
            <Textarea name="bio" rows={5} value={profile.bio} onChange={handleChange} required />
          </div>
  
          <Button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold"
          >
            保存する
          </Button>
        </form>
        {message && (
          <p className="mt-4 text-center text-sm text-gray-600">{message}</p>
        )}
      </div>
    </div>
  );
}

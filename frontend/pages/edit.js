import { useState, useEffect } from 'react';
import { API_BASE_URL } from '../utils/api';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

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

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">プロフィール編集</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-semibold mb-1">名前</label>
          <Input name="name" value={profile.name} onChange={handleChange} required />
        </div>

        <div>
          <label className="block font-semibold mb-1">肩書き</label>
          <Input name="title" value={profile.title} onChange={handleChange} required />
        </div>

        <div>
          <label className="block font-semibold mb-1">自己紹介</label>
          <Textarea name="bio" rows={5} value={profile.bio} onChange={handleChange} required />
        </div>

        <Button type="submit" className="w-full">
          保存する
        </Button>
      </form>

      {message && (
        <p className="mt-4 text-center text-sm text-muted-foreground">{message}</p>
      )}
    </div>
  );
}

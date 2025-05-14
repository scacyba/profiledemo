export default function Home({ profile }) {
    return (
      <div className="p-6">
        <h1 className="text-4xl font-bold">{profile.name}</h1>
        <p className="mt-4 text-xl">{profile.title}</p>
        <p className="mt-2">{profile.bio}</p>
      </div>
    );
}

// 3. SSGでAPIからデータ取得
export async function getStaticProps() {
    try {
      const res = await fetch('https://your-nest-api.onrender.com/profile');
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


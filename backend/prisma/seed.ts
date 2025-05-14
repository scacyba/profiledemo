// Prisma Client のパス（'../../generated/prisma'で出力先変更できるが、実体はdist 配下とか、不整合が起きてnpm run start:dev時にエラーになる。上級者向け）
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.profile.create({
    data: {
      name: 'オオタスカシバコンサルタント',
      title: 'ITコンサルタント / エンジニア',
      bio: 'ミニマムITサポーター。製造業DX、アプリ開発、ネットワーク支援など幅広く対応しています。',
    },
  });
  console.log('✅ 初期データ投入完了');
}

main()
  .catch((e) => {
    console.error('❌ 初期データ投入失敗:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
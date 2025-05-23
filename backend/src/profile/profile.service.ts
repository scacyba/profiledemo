import { Injectable } from '@nestjs/common';
// Prisma Client のパス（'../../generated/prisma'で出力先変更できるが、実体はdist 配下とか、不整合が起きてnpm run start:dev時にエラーになる。上級者向け）
import { PrismaClient } from '@prisma/client';

@Injectable()
export class ProfileService {
  private prisma = new PrismaClient();

  async getProfile() {
    try {
      const profile = await this.prisma.profile.findFirst();
      if (profile) return profile;
      console.error('DBエラー:', profile);

      return this.prisma.profile.findFirst({
        orderBy: { id: 'desc' }, // 最新レコードを取得
      });
    
    } catch (error) {
      console.error('DB接続エラー:', error);
      return this.defaultProfile();
    }

  }

  private defaultProfile() {
    return {
      name: 'オオタスカシバコンサルタント',
      title: 'ITコンサルタント / エンジニア',
      bio: '（DB接続に失敗したため仮データを表示しています。不明点はお問い合わせからご連絡ください。https://refootaskacyba.com/）',
    };
  }

  async updateProfile(data: { id: number; name: string; title: string; bio: string }) {
      return this.prisma.profile.update({
      where: { id: data.id },
      data: {
        name: data.name,
        title: data.title,
        bio: data.bio,
      },
      });
  }

}

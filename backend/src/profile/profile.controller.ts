import { Body, Controller, Get, Put } from '@nestjs/common';
import { ProfileService } from './profile.service';

@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Get()
  async getProfile() {
    return this.profileService.getProfile();
  }

  @Put()
  updateProfile(@Body() body: { id: number; name: string; title: string; bio: string }) {
    return this.profileService.updateProfile(body);
  }
}
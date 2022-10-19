import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserPermissions } from '../users/enums/user-permissions.enum';
import { UsersService } from '../users/users.service';
import { CreateBannerDto } from './dto/create-banner.dto';
import { UpdateBannerDto } from './dto/update-banner.dto';
import { Banner, BannerDocument } from './schema/banner.schema';

@Injectable()
export class BannerService {
  constructor(
    @InjectModel(Banner.name)
    private readonly bannerModel: Model<BannerDocument>,
    private readonly userService: UsersService,
  ) {}

  async create(createBannerDto: CreateBannerDto, requestUserId: string) {
    try {
      const user = await this.userService.findOne({ _id: requestUserId });

      if (!user) throw new NotFoundException('Usuário não encontrado');

      const createBanner = await this.bannerModel.create({
        ...createBannerDto,
        user_id: requestUserId,
      });

      if (!createBanner) throw new NotFoundException();

      return createBanner;
    } catch (err) {
      throw new InternalServerErrorException(err.message);
    }
  }

  async findAll(requestUserId: string) {
    try {
      const user = await this.userService.findOne({ _id: requestUserId });

      if (!user) throw new NotFoundException('Usuário não encontrado');

      if (user.permission === UserPermissions.Admin) {
        return await this.bannerModel.find();
      }

      return await this.bannerModel.find({
        user_id: { $in: user._id },
      });
    } catch (err) {
      throw new InternalServerErrorException(err.message);
    }
  }

  async update(id: string, updateBannerDto: UpdateBannerDto) {
    try {
      const updateBanner = await this.bannerModel.findByIdAndUpdate(
        { _id: id },
        updateBannerDto,
        { new: true },
      );

      if (!updateBanner) throw new NotFoundException();

      return updateBanner;
    } catch (err) {
      throw new InternalServerErrorException(err.message);
    }
  }

  async remove(id: string) {
    try {
      const deleteBanner = await this.bannerModel.findByIdAndDelete(id);

      if (!deleteBanner) throw new NotFoundException();

      return deleteBanner;
    } catch (err) {
      throw new InternalServerErrorException(err.message);
    }
  }
}

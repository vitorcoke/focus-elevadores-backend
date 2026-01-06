import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CondominiumService } from '../condominium/condominium.service';
import { CreateScreensDto } from './dto/create-screens.dto';
import { Screens, ScreensDocument } from './schemas/screens.schema';
import { UpdateScreensDto } from './dto/update-screens.dto';
import { UsersService } from '../users/users.service';
import { UserPermissions } from '../users/enums/user-permissions.enum';

@Injectable()
export class ScreensService {
  constructor(
    @InjectModel(Screens.name)
    private readonly screensModel: Model<ScreensDocument>,
    private readonly condominiumService: CondominiumService,
    private readonly usersService: UsersService,
  ) {}

  async create(createScreensDto: CreateScreensDto, requestUserId: string) {
    try {
      const user = await this.usersService.findOne({ _id: requestUserId });

      if (!user) throw new NotFoundException();

      const condominiumExist = await this.condominiumService.findOne(
        createScreensDto.condominium_id,
      );
      if (!condominiumExist) throw new NotFoundException();

      const createScreen = await this.screensModel.create({
        ...createScreensDto,
        user_id: user._id,
      });

      await this.condominiumService.update(createScreensDto.condominium_id, {
        screens: [...condominiumExist.screens, createScreen._id],
      });

      return createScreen;
    } catch (err) {
      throw new InternalServerErrorException(err.message);
    }
  }

  async findAll(requestUserId: string) {
    try {
      const user = await this.usersService.findOne({ _id: requestUserId });

      if (!user) throw new NotFoundException();

      if (user.permission === UserPermissions.Admin) {
        return await this.screensModel.find();
      }

      if (user.permission === UserPermissions.Sindico) {
        return await this.screensModel.find({
          condominium_id: { $in: user.condominium_id },
        });
      }
      return await this.screensModel.find({ _id: { $in: user.screen_id } });
    } catch (err) {
      throw new InternalServerErrorException(err.message);
    }
  }

  async findCondominiumScreens(condominiumId: string, requestUserId: string) {
    try {
      const user = await this.usersService.findOne({ _id: requestUserId });

      if (
        user.permission === UserPermissions.Admin ||
        user.permission === UserPermissions.Sindico
      ) {
        return await this.screensModel.find({
          condominium_id: { $in: condominiumId },
        });
      }

      return await this.screensModel.find({
        _id: { $in: user.screen_id },
      });
    } catch (err) {
      throw new InternalServerErrorException(err.message);
    }
  }

  async findCondominiumMessagesScreens(
    CondominiumMessageId: string,
    requestUserId: string,
  ) {
    try {
      const user = await this.usersService.findOne({ _id: requestUserId });

      if (
        user.permission === UserPermissions.Admin ||
        user.permission === UserPermissions.Sindico
      ) {
        return await this.screensModel.find({
          condominium_message: { $in: CondominiumMessageId },
        });
      }

      return await this.screensModel.find({
        _id: { $in: user.screen_id },
        condominium_message: { $in: CondominiumMessageId },
      });
    } catch (err) {
      throw new InternalServerErrorException(err.message);
    }
  }

  async findSourceRssScreen(sourceRssId: string, requestUserId: string) {
    try {
      const user = await this.usersService.findOne({ _id: requestUserId });
      if (
        user.permission === UserPermissions.Admin ||
        user.permission === UserPermissions.Sindico
      ) {
        return this.screensModel.find({
          source_rss: { $in: sourceRssId },
        });
      }

      return this.screensModel.find({
        _id: { $in: user.screen_id },
        source_rss: { $in: sourceRssId },
      });
    } catch (err) {
      throw new InternalServerErrorException(err.message);
    }
  }

  async findNoticiesScreen(noticiesId: string, requestUserId: string) {
    try {
      const user = await this.usersService.findOne({ _id: requestUserId });
      if (
        user.permission === UserPermissions.Admin ||
        user.permission === UserPermissions.Sindico
      ) {
        return this.screensModel.find({
          noticies: { $in: noticiesId },
        });
      }

      return this.screensModel.find({
        _id: { $in: user.screen_id },
        noticies: { $in: noticiesId },
      });
    } catch (err) {
      throw new InternalServerErrorException(err.message);
    }
  }

  findOne(id: string) {
    try {
      return this.screensModel.findById(id);
    } catch (err) {
      throw new InternalServerErrorException(err.message);
    }
  }

  async update(id: string, updateScreensDto: UpdateScreensDto) {
    try {
      const updateScreen = await this.screensModel.findByIdAndUpdate(
        { _id: id },
        {
          ...updateScreensDto,
        },
        { new: true },
      );
      return updateScreen;
    } catch (err) {
      throw new InternalServerErrorException(err.message);
    }
  }

  async updateAddCondominiumMessage(id: string, condominiumMessageId: any) {
    try {
      const screen = await this.screensModel.findById(id);

      const updateScreen = await this.screensModel.findByIdAndUpdate(
        { _id: id },
        {
          condominium_message: [
            ...screen.condominium_message,
            condominiumMessageId.condominium_message,
          ],
        },
        { new: true },
      );
      return updateScreen;
    } catch (err) {
      throw new InternalServerErrorException(err.message);
    }
  }

  async updateAddSourceRss(id: string, sourceRssId: any) {
    try {
      const screen = await this.screensModel.findById(id);

      const updateScreen = await this.screensModel.findByIdAndUpdate(
        { _id: id },
        {
          source_rss: [...screen.source_rss, sourceRssId.source_rss],
        },
        { new: true },
      );
      return updateScreen;
    } catch (err) {
      throw new InternalServerErrorException(err.message);
    }
  }

  async updateAddNoticies(id: string, noticieId: any) {
    try {
      const screen = await this.screensModel.findById(id);

      const updateScreen = await this.screensModel.findByIdAndUpdate(
        { _id: id },
        {
          noticies: [...screen.noticies, noticieId.noticies],
        },
        { new: true },
      );
      return updateScreen;
    } catch (err) {
      throw new InternalServerErrorException(err.message);
    }
  }

  async removeCondominiumScreens(condominiumId: string) {
    try {
      return await this.screensModel.deleteMany({
        condominium_id: { $in: condominiumId },
      });
    } catch (err) {
      throw new InternalServerErrorException(err.message);
    }
  }

  async removeBannerFromScreen(bannerId: string) {
    try {
      const screen = await this.screensModel.find({
        banner: { $in: bannerId },
      });

      if (screen.length > 0) {
        screen.forEach(async (screen) => {
          const index = screen.banner.indexOf(bannerId);
          if (index > -1) {
            screen.banner = '';
          }
          await screen.save();
        });
      }
    } catch (err) {
      throw new InternalServerErrorException(err.message);
    }
  }

  async removeMessagesFromScreen(messageId: string) {
    try {
      return await this.screensModel.updateMany(
        { condominium_message: { $in: messageId } },
        { $pull: { condominium_message: messageId } },
      );
    } catch (err) {
      throw new InternalServerErrorException(err.message);
    }
  }

  async removeMessagesFromScreenById(messageId: string, screenId: string) {
    try {
      return await this.screensModel.updateOne(
        {
          _id: screenId,
          condominium_message: { $in: messageId },
        },
        { $pull: { condominium_message: messageId } },
      );
    } catch (err) {
      throw new InternalServerErrorException(err.message);
    }
  }

  async removeRssFromScreen(rssId: string) {
    try {
      return await this.screensModel.updateMany(
        { source_rss: { $in: rssId } },
        { $pull: { source_rss: rssId } },
      );
    } catch (err) {
      throw new InternalServerErrorException(err.message);
    }
  }

  async removeNoticiesFromScreen(noticiesId: string) {
    try {
      return await this.screensModel.updateMany(
        { noticies: { $in: noticiesId } },
        { $pull: { noticies: noticiesId } },
      );
    } catch (err) {
      throw new InternalServerErrorException(err.message);
    }
  }

  async removeRssFromScreenById(rssId: string, screenId: string) {
    try {
      return await this.screensModel.updateOne(
        {
          _id: screenId,
          source_rss: { $in: rssId },
        },
        { $pull: { source_rss: rssId } },
      );
    } catch (err) {
      throw new InternalServerErrorException(err.message);
    }
  }

  async removeNoticiesFromScreenById(noticiesId: string, screenId: string) {
    try {
      return await this.screensModel.updateOne(
        {
          _id: screenId,
          noticies: { $in: noticiesId },
        },
        { $pull: { noticies: noticiesId } },
      );
    } catch (err) {
      throw new InternalServerErrorException(err.message);
    }
  }

  async remove(id: string) {
    try {
      return await this.screensModel.findByIdAndDelete(id);
    } catch (err) {
      throw new InternalServerErrorException(err.message);
    }
  }
}

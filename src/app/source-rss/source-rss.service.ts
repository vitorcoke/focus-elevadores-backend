import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateSourceRssDto } from './dto/create-source-rss.dto';
import { UpdateSourceRssDto } from './dto/update-source-rss.dto';
import { SourceRss, SourceRssDocument } from './schemas/source-rss.schema';
import { UsersService } from '../users/users.service';
import * as fs from 'node:fs';
import { UserPermissions } from '../users/enums/user-permissions.enum';
import { Parser } from './utils/convert-xml-to-json';

const URL_RSS = process.env.URL_RSS || 'http://localhost';

@Injectable()
export class SourceRssService {
  constructor(
    @InjectModel(SourceRss.name)
    private readonly sourceRssModel: Model<SourceRssDocument>,
    private readonly userService: UsersService,
  ) {
    if (fs.existsSync('rss') === false) {
      fs.mkdirSync('rss');
    }
  }

  async create(createSourceRssDto: CreateSourceRssDto, requestUserId: string) {
    try {
      const rssFeed = await Parser(createSourceRssDto.url);
      const nameFile = Date.now();

      fs.writeFile(
        `rss/${nameFile}.json`,
        JSON.stringify(rssFeed, null, 2),
        (err) => {
          if (err) throw err;
          console.log('The file has been saved!');
        },
      );

      return await this.sourceRssModel.create({
        ...createSourceRssDto,
        user_id: requestUserId,
        urlServerRss: `${URL_RSS}:3333/rss/${nameFile}.json`,
      });
    } catch (err) {
      throw new InternalServerErrorException(err.message);
    }
  }

  async createRssJSON(rss: SourceRss[]) {
    rss.forEach(async (rss) => {
      const rssFeed = await Parser(rss.url);
      const nameFile = Date.now();

      fs.writeFile(
        `rss/${nameFile}.json`,
        JSON.stringify(rssFeed, null, 2),
        (err) => {
          if (err) throw err;

          console.log('The file has been saved!');
        },
      );

      await this.sourceRssModel.findOneAndUpdate(
        { _id: rss._id },
        { urlServerRss: `${URL_RSS}:3333/rss/${nameFile}.json` },
      );
    });
  }

  async findAll(requestUserId: string) {
    try {
      const user = await this.userService.findOne({ _id: requestUserId });

      if (!user)
        throw new InternalServerErrorException('Usuário não encontrado');

      if (user.permission === UserPermissions.Admin) {
        return await this.sourceRssModel.find();
      }

      return await this.sourceRssModel.find({
        user_id: { $in: user._id },
      });
    } catch (err) {
      throw new InternalServerErrorException(err.message);
    }
  }

  async findAllInternal() {
    try {
      const rss = await this.sourceRssModel.find();

      rss.forEach((rss) => {
        rss.set('logotipo', undefined, { strict: false });
      });
      return rss;
    } catch (err) {
      throw new InternalServerErrorException(err.message);
    }
  }

  async update(id: string, updateSourceRssDto: UpdateSourceRssDto) {
    try {
      const updateSourceRss = await this.sourceRssModel.findOneAndUpdate(
        { _id: id },
        updateSourceRssDto,
        { new: true },
      );
      return updateSourceRss;
    } catch (err) {
      throw new InternalServerErrorException(err.message);
    }
  }

  async remove(id: string) {
    try {
      const sourceRss = await this.sourceRssModel.findOne({ _id: id });
      if (sourceRss) {
        fs.unlinkSync(`rss/${sourceRss.urlServerRss.split('/').pop()}`);
      }
      return await this.sourceRssModel.findByIdAndDelete(id);
    } catch (err) {
      throw new InternalServerErrorException(err.message);
    }
  }
}

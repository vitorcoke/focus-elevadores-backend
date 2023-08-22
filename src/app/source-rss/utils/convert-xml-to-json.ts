import axios from 'axios';
import { XMLParser } from 'fast-xml-parser';

export const Parser = async (url: string, logo?: string) => {
  const { data } = await axios(url);

  const xml = new XMLParser({
    attributeNamePrefix: '',
    textNodeName: '$text',
    ignoreAttributes: false,
  });

  const result = xml.parse(data);

  const channel =
    result.rss && result.rss.channel ? result.rss.channel : result.feed;

  const rss = {
    title: channel.title ?? '',
    description: channel.description ?? '',
    link: channel.link && channel.link.href ? channel.link.href : channel.link,
    barra: true,
    image: channel.image
      ? channel.image.url
      : channel['itunes:image']
      ? channel['itunes:image'].href
      : logo,
    category: channel.category || [],
    items: [],
  };

  let items = channel.item || channel.entry || [];

  if (items && !Array.isArray(items)) items = [items];

  for (let i = 0; i < items.length; i++) {
    const val = items[i];
    const media = {};

    const obj = {
      id: val.guid && val.guid.$t ? val.guid.$t : val.id,
      title: val.title && val.title.$text ? val.title.$text : val.title,
      description:
        val.summary && val.summary.$text ? val.summary.$text : val.description,
      link: val.link && val.link.href ? val.link.href : val.link,
      image: '',
    };

    if (val['media:content']) {
      obj.image = val['media:content'].url;
    }

    if (val.div) {
      obj.image = val.div.img.src;
    }

    Object.assign(media, { media });

    rss.items.push(obj);
  }

  return rss;
};

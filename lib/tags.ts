import { ValueOf } from 'lib/types';

const TAG_SLUGS = {
  All: 'all',
  Debug: 'Debug',
  Website: 'Website',
  review: 'review',
  keyboard: 'keyboard',
  Nextjs: 'Nextjs',
  Vercel: 'Vercel',
  service: 'service',
  Windows: 'Windows',
  etc: 'etc',
} as const;

export type TagSlug = ValueOf<typeof TAG_SLUGS>;

type TagData = {
  slug: string;
  name: string;
  emoji: string;
};

const TAG_DATA: Record<TagSlug, TagData> = {
  [TAG_SLUGS.All]: {
    name: 'All',
    emoji: '💬',
    slug: TAG_SLUGS.All,
  },
  [TAG_SLUGS.Debug]: {
    name: 'Debug',
    emoji: '🛠',
    slug: TAG_SLUGS.Debug,
  },
  [TAG_SLUGS.Website]: {
    name: 'Website',
    emoji: '🌐',
    slug: TAG_SLUGS.Website,
  },
  [TAG_SLUGS.review]: {
    name: 'review',
    emoji: '📝',
    slug: TAG_SLUGS.review,
  },
  [TAG_SLUGS.keyboard]: {
    name: 'keyboard',
    emoji: '⌨️',
    slug: TAG_SLUGS.keyboard,
  },
  [TAG_SLUGS.Nextjs]: {
    name: 'Nextjs',
    emoji: '💻',
    slug: TAG_SLUGS.Nextjs,
  },
  [TAG_SLUGS.Vercel]: {
    name: 'Vercel',
    emoji: '💻',
    slug: TAG_SLUGS.Vercel,
  },
  [TAG_SLUGS.service]: {
    name: 'service',
    emoji: '🔗',
    slug: TAG_SLUGS.service,
  },
  [TAG_SLUGS.Windows]: {
    name: 'Windows',
    emoji: '🪟',
    slug: TAG_SLUGS.Windows,
  },
  [TAG_SLUGS.etc]: {
    name: 'etc',
    emoji: '💬',
    slug: TAG_SLUGS.etc,
  },
} as const;

export const getTagDataBySlug = (slug: TagSlug): TagData => TAG_DATA[slug];

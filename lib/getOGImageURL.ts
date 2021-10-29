import BLOG from '~/blog.config';

type OGImageQuery = {
  md: string;
  fontSize: string;
  background: string;
  foreground: string;
  siteTitle: string | undefined;
  isTwitter: string | undefined;
};

type OGImageKeys = (keyof OGImageQuery)[];

type GetOGImageUrlArgs = {
  title: string;
  root: boolean;
  twitter: boolean;
};

const convertObjToQueryString = (query: OGImageQuery): string => {
  return (Object.keys(query) as OGImageKeys)
    .filter((key) => !!query[key])
    .map((key) => key + '=' + query[key])
    .join('&');
};

export const getOGImageURL = ({ title, twitter, root }: GetOGImageUrlArgs): string => {
  const defaultParams: OGImageQuery = {
    md: '1',
    fontSize: '96px',
    background: encodeURIComponent(BLOG.darkBackground),
    foreground: encodeURIComponent(BLOG.lightBackground),
    siteTitle: encodeURIComponent(BLOG.title),
    isTwitter: undefined,
  };
  const baseParams = `${BLOG.ogImageGenerateURL}/${encodeURIComponent(
    title,
  )}.png?images=https%3A%2F%2Fraw.githubusercontent.com%2Fpickyzz%2Fpickyzz.ga%2F9a319c06dae88b888f1c1d1e25f175152ab397b8%2Fpublic%2Ffavicon.svg`;
  if (twitter) {
    if (!root) {
      return (
        baseParams +
        convertObjToQueryString({
          ...defaultParams,
          isTwitter: 'true',
        })
      );
    }
    return (
      baseParams +
      convertObjToQueryString({
        ...defaultParams,
        siteTitle: undefined,
        isTwitter: 'true',
      })
    );
  }
  if (root) {
    return (
      baseParams +
      convertObjToQueryString({
        ...defaultParams,
        siteTitle: undefined,
      })
    );
  }
  return baseParams + convertObjToQueryString(defaultParams);
};

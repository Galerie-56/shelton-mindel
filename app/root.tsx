import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
  json,
} from '@remix-run/react';
import type { LinksFunction, MetaFunction } from '@remix-run/node';
import { storyblokInit, apiPlugin, getStoryblokApi } from '@storyblok/react';
import styles from './styles/global.css?url';
import { GlobalLayout } from './components/layout';
import {
  NavItem,
  Content,
  Page,
  Profile,
  Profiles,
  Awards,
  Award,
  ArchitectEyes,
  ArchitectEye,
  Publications,
  Publication,
  AllProjects,
  Project,
  HomeSlideShow,
  Category,
  Product,
  AllProducts,
  ImageFields,
  ProductSerie,
  ImageFull,
  Career,
  CareersList,
  Slide,
  LinkSlideShow,
  AllSpaces,
  Space,
} from './components/bloks';
import { isPreview } from './lib';

const isServer = typeof window === 'undefined';

const accessToken = isServer
  ? process.env.STORYBLOK_PREVIEW_TOKEN
  : //@ts-ignore
    window.env.STORYBLOK_PREVIEW_TOKEN;

const components = {
  'nav-item': NavItem,
  content: Content,
  page: Page,
  profile: Profile,
  profiles: Profiles,
  awards: Awards,
  award: Award,
  'architect-eyes': ArchitectEyes,
  'architect-eye': ArchitectEye,
  publications: Publications,
  publication: Publication,
  'all-projects': AllProjects,
  project: Project,
  slideshow: HomeSlideShow,
  category: Category,
  product: Product,
  'all-products': AllProducts,
  'image-fields': ImageFields,
  'product-serie': ProductSerie,
  'image-full': ImageFull,
  career: Career,
  'careers-list': CareersList,
  slide: Slide,
  'link-slideshow': LinkSlideShow,
  'all-spaces': AllSpaces,
  space: Space,
};

storyblokInit({
  accessToken,
  use: [apiPlugin],
  components,
  bridge: isPreview(),
});

export const links: LinksFunction = () => [
  {
    rel: 'preload',
    href: '/assets/fonts/NeueHaasUnica-Regular.woff2',
    as: 'font',
    type: 'font/woff2',
    crossOrigin: 'anonymous',
  },
  {
    rel: 'preload',
    href: '/assets/fonts/NeueHaasUnica-Regular.woff',
    as: 'font',
    type: 'font/woff',
    crossOrigin: 'anonymous',
  },
  { rel: 'stylesheet', href: styles },
];

export const loader = async () => {
  const sbApi = getStoryblokApi();
  const { data: config } = await sbApi.get(`cdn/stories/config`, {
    version: 'draft',
    resolve_links: 'url',
  });

  const {
    logo,
    header_nav,
    address,
    address_2,
    address_3,
    footer_text,
    phone,
    mail,
    facebook,
    instagram,
    linkedin,
    pinterest,
    posts_per_page,
  } = config?.story?.content || {};
  return json({
    env: {
      STORYBLOK_PREVIEW_TOKEN: process.env.STORYBLOK_PREVIEW_TOKEN,
      STORYBLOK_IS_PREVIEW: process.env.STORYBLOK_IS_PREVIEW,
    },
    logo,
    headerNav: header_nav,
    address,
    address_2,
    address_3,
    footerText: footer_text,
    phone,
    mail,
    facebook,
    instagram,
    linkedin,
    pinterest,
    perPage: posts_per_page,
  });
};

export const meta: MetaFunction = () => {
  return [
    {
      title:
        'SheltonMindel - Architecture, Interior, Furniture and Product Design',
    },
    {
      name: 'description',
      content:
        'Award-winning architectural firm providing complete architectural, interior, furniture, and product design services for corporate, cultural, academic, and residential projects in New York.',
    },
    { name: 'robots', content: 'index,follow' },
    { charset: 'utf-8' },
    { viewport: 'width=device-width,initial-scale=1' },
    // Favicon
    { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
    {
      rel: 'apple-touch-icon',
      sizes: '180x180',
      href: '/apple-touch-icon.png',
    },
    // Open Graph tags for social sharing
    {
      property: 'og:title',
      content:
        'SheltonMindel - Architecture, Interior, Furniture and Product Design',
    },
    {
      property: 'og:description',
      content:
        'Award-winning architectural firm providing complete architectural, interior, furniture, and product design services for corporate, cultural, academic, and residential projects in New York.',
    },
    { property: 'og:type', content: 'website' },
    { property: 'og:url', content: 'https://sheltonmindel.com' },
  ];
};

export function Layout({ children }: { children: React.ReactNode }) {
  const data = useLoaderData<typeof loader>();
  if (!data) {
    // Handle the case where data is not available, e.g., render an error message or a loading spinner
    return <div>Loading or error...</div>;
  }

  const { env } = data;
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <script
          dangerouslySetInnerHTML={{
            __html: `window.env = ${JSON.stringify(env)}`,
          }}
        />
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return (
    <GlobalLayout>
      <Outlet />
    </GlobalLayout>
  );
}

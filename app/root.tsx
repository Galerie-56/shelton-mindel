import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
  json,
} from "@remix-run/react";
import type { LinksFunction } from "@remix-run/node";
import { storyblokInit, apiPlugin } from "@storyblok/react";
import styles from "./tailwind.css?url";
import { GlobalLayout } from "./components/layout";

const isServer = typeof window === "undefined";

const accessToken = isServer
  ? process.env.STORYBLOK_PREVIEW_TOKEN
  : //@ts-ignore
    window.env.STORYBLOK_PREVIEW_TOKEN;

const components = {};

storyblokInit({
  accessToken,
  use: [apiPlugin],
  components,
});

export const links: LinksFunction = () => [
  {
    rel: "preload",
    href: "/assets/fonts/NeueHaasUnica-Regular.woff2",
    as: "font",
    type: "font/woff2",
    crossorigin: "anonymous",
  },
  {
    rel: "preload",
    href: "/assets/fonts/NeueHaasUnica-Regular.woff",
    as: "font",
    type: "font/woff",
    crossorigin: "anonymous",
  },
  { rel: "stylesheet", href: styles },
];

export const loader = async () => {
  return json({
    env: {
      STORYBLOK_PREVIEW_TOKEN: process.env.STORYBLOK_PREVIEW_TOKEN,
    },
  });
};

export function Layout({ children }: { children: React.ReactNode }) {
  const { env } = useLoaderData<typeof loader>();
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

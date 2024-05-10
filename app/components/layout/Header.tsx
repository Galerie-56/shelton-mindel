import { Link, useLoaderData } from "@remix-run/react";
import type { loader } from "~/root";
import { MainMenu } from "./MainMenu";

export const Header = () => {
  const { logo, headerNav } = useLoaderData<typeof loader>();
  return (
    <header>
      <div className="max-w-site mx-auto">
        <Link to="/">
          <img src={logo.filename} alt={logo.alt} />
        </Link>
        <MainMenu />
      </div>
    </header>
  );
};

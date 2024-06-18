import { Link, useLoaderData } from "@remix-run/react";
import type { loader } from "~/root";
import { MainMenu } from "./MainMenu";

export const Header = () => {
  const { logo } = useLoaderData<typeof loader>();

  return (
    <header>
      <div className="container pt-10 pb-16 flex items-center justify-between">
        <Link to="/">
          <img src={`${logo.filename}/m/352x70`} alt={logo.alt} />
        </Link>
        <MainMenu />
      </div>
    </header>
  );
};

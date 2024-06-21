import { Link, useLoaderData } from "@remix-run/react";
import type { loader } from "~/root";
import { MainMenu } from "./MainMenu";

export const Header = () => {
  const { logo } = useLoaderData<typeof loader>();

  return (
    <header>
      <div className="container pt-5 lg:pt-10 lg:pb-12 flex items-center justify-between">
        <Link to="/">
          <img src={`${logo.filename}/m/352x70`} alt={logo.alt} className="md:w-full w-[200px]" />
        </Link>
        <MainMenu />
      </div>
    </header>
  );
};

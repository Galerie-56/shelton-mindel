import { Header } from "./Header";
import { Footer } from "./Footer";

type Props = {
  children: JSX.Element;
};

export const GlobalLayout = ({ children }: Props) => {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
};

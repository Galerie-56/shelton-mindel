import { useLoaderData } from "@remix-run/react";
import { type loader } from "~/root";

export const Footer = () => {
  let {
    address,
    footerText,
    mail,
    facebook,
    instagram,
    twitter,
    pinterest,
    phone,
  } = useLoaderData<typeof loader>();

  return (
    <footer className="">
      <div className="max-w-site mx-auto flex justify-between items-center">
        <div>
          <div>
            <h3 className="uppercase">Address</h3>
            <p dangerouslySetInnerHTML={{ __html: address }} />
          </div>
          <div>
            <h3 className="uppercase">Social Media</h3>
            <div className="flex space-x-3">
              <a href={facebook} target="_blank" rel="noopener noreferrer">
                <img src="/icons/facebook.svg" alt="Facebook" />
              </a>
              <a href={twitter} target="_blank" rel="noopener noreferrer">
                <img src="/icons/twitter.svg" alt="Twitter" />
              </a>
              <a href={instagram} target="_blank" rel="noopener noreferrer">
                <img src="/icons/instagram.svg" alt="Instagram" />
              </a>
              <a href={pinterest} target="_blank" rel="noopener noreferrer">
                <img src="/icons/pinterest.svg" alt="Pinterest" />
              </a>
            </div>
          </div>
        </div>
        <div>
          <h3 className="uppercase">Contact</h3>
          <a href={`mailto:${mail}`}>{mail}</a>
        </div>
        <div>
          <h3 className="uppercase">Telephone</h3>
          <a href={`tel:${phone}`}>{phone}</a>
        </div>
        <p>
          Copyright ® {new Date().getFullYear()}
          <br />
          Lee F. Mindel, Architect, D.P.C.
        </p>
      </div>
      <p className="max-w-site mx-auto">{footerText}</p>
    </footer>
  );
};

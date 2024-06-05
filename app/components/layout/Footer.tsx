import { useLoaderData } from "@remix-run/react";
import { type loader } from "~/root";
import {
  FaFacebookSquare,
  FaInstagramSquare,
  FaPinterestSquare,
} from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";

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
    <footer className="container mt-10 text-[14px] mb-10">
      <div className="max-w-site mx-auto flex justify-between items-center">
        <div className="space-y-4">
          <div>
            <h3 className="uppercase [&>a]:underline">Address</h3>
            <p dangerouslySetInnerHTML={{ __html: address }} />
          </div>
          <div>
            <h3 className="uppercase">Social Media</h3>
            <div className="flex space-x-2">
              <a
                href={facebook.cached_url}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaFacebookSquare className="social-icon" />
              </a>
              <a
                href={twitter.cached_url}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaSquareXTwitter className="social-icon" />
              </a>
              <a
                href={instagram.cached_url}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaInstagramSquare className="social-icon" />
              </a>
              <a
                href={pinterest.cached_url}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaPinterestSquare className="social-icon" />
              </a>
            </div>
          </div>
        </div>
        <div className="space-y-4">
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
      </div>
      <p className="mt-10">{footerText}</p>
    </footer>
  );
};

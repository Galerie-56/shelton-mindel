import { LoaderFunction, LoaderFunctionArgs, json } from "@remix-run/node";
import { getStoryblokApi } from "@storyblok/react";
import {
  getPerPage,
  getProductCardData,
  getTotal,
  useStoryblokData,
} from "~/lib";
import { ProductStoryblok } from "~/types";

export const loader: LoaderFunction = async ({
  params,
}: LoaderFunctionArgs) => {
  let slug = params["*"] ?? "home";

  const sbApi = getStoryblokApi();
  let { data }: { data: any } = await sbApi
    .get(`cdn/stories/products/${slug}`, {
      version: "draft",
    })
    .catch((e) => {
      return { data: null };
    });

  if (!data) {
    throw new Response("Not Found", { status: 404 });
  }

  const page = Number.isNaN(Number(params.pageNumber))
    ? 1
    : Number(params.pageNumber);
  const perPage = await getPerPage(sbApi);
  const { data: productsData } = await sbApi.get(`cdn/stories`, {
    //all posts data for the Blog page
    version: "draft",
    starts_with: "products/",
    per_page: perPage,
    page,
    is_startpage: false,
  });

  const total = await getTotal("products");
  const products = productsData.stories.map((p: ProductStoryblok) =>
    getProductCardData(p)
  );

  return json({ story: data?.story, total, products, perPage, productName: data?.story?.name });
};

const ProductsPage = () => useStoryblokData("products.$");

export default ProductsPage;

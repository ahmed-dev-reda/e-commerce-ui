import { notFound } from "next/navigation";

import ClientProductPage from "./client";
import { products } from "@/data/temporaryData";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const product = products.find((product) => product.id === parseInt(id));

  if (!product) {
    notFound();
  }

  return <ClientProductPage product={product} />;
}

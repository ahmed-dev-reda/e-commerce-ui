import { notFound } from "next/navigation";
import { products } from "@/components/layout/products-list";
import ClientProductPage from "./client";

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

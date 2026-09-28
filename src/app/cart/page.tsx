import OrderCompleted from "./(components)/order-completed";
import CartPageClient from "./client";

export default async function CartPage({
  searchParams,
}: {
  searchParams: Promise<{
    step?: string;
  }>;
}) {
  const { step } = await searchParams;

  if (step === "completed") return <OrderCompleted />;
  return (
    <>
      <CartPageClient step={step} />
    </>
  );
}

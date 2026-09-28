import { useAppSelector } from "@/lib/hooks";
import { useRouter } from "next/navigation";
import { BiRightArrowAlt } from "react-icons/bi";

export default function CartDetails({ step }: { step: string }) {
  const router = useRouter();
  const cart = useAppSelector((state) => state.cart);
  const subtotal = cart.items.reduce(
    (total, item) => total + item.price * item.selectedQuantity,
    0,
  );

  const shipping = subtotal > 0 ? 5 : 0;

  const total = subtotal + shipping;
  return (
    <>
      <aside className="h-fit rounded-2xl shadow-lg overflow-hidden md:max-w-xs">
        <div className="p-5 border-b">
          <h2 className="font-semibold">Cart Details</h2>
        </div>

        <div className="p-5 space-y-6">
          {/* Prices */}
          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>

            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Shipping</span>
              <span>${shipping.toFixed(2)}</span>
            </div>

            <div className="border-t pt-3 flex justify-between">
              <span className="font-semibold">Total</span>

              <span className="font-bold text-lg">${total.toFixed(2)}</span>
            </div>
          </div>

          <p className="text-xs text-gray-500 text-center leading-5">
            By placing your order, you agree to our Terms & Conditions and
            Privacy Policy.
          </p>

          {step === "cart" && (
            <button
              onClick={() => router.push("/cart?step=shipping")}
              type="button"
              className="w-full bg-gray-800 hover:bg-gray-900 transition-all duration-300 text-white p-2 rounded-lg cursor-pointer flex items-center justify-center gap-2"
            >
              Continue
              <BiRightArrowAlt />
            </button>
          )}
        </div>
      </aside>
    </>
  );
}

import Image from "next/image";
import { Minus, Plus, Trash2, CreditCard, Banknote } from "lucide-react";
import { removeFromCart, updateQuantity } from "@/lib/features/cart/cart";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
export default function ProductsInCart() {
  const dispatch = useAppDispatch();

  const cart = useAppSelector((state) => state.cart);

  const [paymentMethod, setPaymentMethod] = useState<"card" | "cash">("card");

  const [customerInfo, setCustomerInfo] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  const handleQuantity = (
    id: string | number,
    color: string,
    size: string,
    type: "inc" | "dec",
  ) => {
    const item = cart.items.find(
      (item) =>
        item.id === id &&
        item.selectedColor === color &&
        item.selectedSize === size,
    );

    if (!item) return;

    const newQuantity =
      type === "inc" ? item.selectedQuantity + 1 : item.selectedQuantity - 1;

    if (newQuantity < 1) return;

    dispatch(
      updateQuantity({
        id,
        color,
        size,
        quantity: newQuantity,
      }),
    );
  };

  const handleCustomerInfo = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setCustomerInfo((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handlePlaceOrder = () => {
    console.log({
      customerInfo,
      paymentMethod,
      items: cart.items,
      subtotal,
      shipping,
      total,
    });
  };
  const subtotal = cart.items.reduce(
    (total, item) => total + item.price * item.selectedQuantity,
    0,
  );

  const shipping = subtotal > 0 ? 5 : 0;

  const total = subtotal + shipping;
  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-10">
      {/* LEFT */}
      <div className="space-y-8">
        {/* Cart Items */}
        <section className="border border-gray-200">
          <div className="border-b px-5 py-4">
            <h2 className="font-semibold">Cart Items</h2>
          </div>

          <div className="divide-y">
            {cart.items.map((item) => (
              <div
                key={`${item.id}-${item.selectedColor}-${item.selectedSize}`}
                className="p-5 flex gap-5"
              >
                {/* Image */}
                <div className="relative size-28 shrink-0 bg-gray-100">
                  <Image
                    src={
                      item.images[item.selectedColor] ||
                      item.images[item.colors[0]]
                    }
                    alt={item.name}
                    fill
                    className="object-cover"
                  />
                </div>

                {/* Details */}
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between gap-4">
                    <div>
                      <h3 className="font-semibold">{item.name}</h3>

                      <p className="text-sm text-gray-500 mt-1">
                        Color: {item.selectedColor}
                      </p>

                      <p className="text-sm text-gray-500">
                        Size: {item.selectedSize}
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() =>
                        dispatch(
                          removeFromCart({
                            id: item.id,
                            color: item.selectedColor,
                            size: item.selectedSize,
                          }),
                        )
                      }
                      className="text-gray-400 hover:text-red-500 transition"
                    >
                      <Trash2 size={17} />
                    </button>
                  </div>

                  <div className="flex items-center justify-between mt-5">
                    {/* Quantity */}
                    <div className="flex items-center border border-gray-300">
                      <button
                        type="button"
                        onClick={() =>
                          handleQuantity(
                            item.id,
                            item.selectedColor,
                            item.selectedSize,
                            "dec",
                          )
                        }
                        className="size-8 flex items-center justify-center hover:bg-gray-100"
                      >
                        <Minus size={14} />
                      </button>

                      <span className="size-8 flex items-center justify-center text-sm border-x border-gray-300">
                        {item.selectedQuantity}
                      </span>

                      <button
                        type="button"
                        onClick={() =>
                          handleQuantity(
                            item.id,
                            item.selectedColor,
                            item.selectedSize,
                            "inc",
                          )
                        }
                        className="size-8 flex items-center justify-center hover:bg-gray-100"
                      >
                        <Plus size={14} />
                      </button>
                    </div>

                    {/* Price */}
                    <span className="font-semibold">
                      ${(item.price * item.selectedQuantity).toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Customer Information */}
        <section className="border border-gray-200 p-5">
          <h2 className="font-semibold mb-5">Customer Information</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              name="name"
              value={customerInfo.name}
              onChange={handleCustomerInfo}
              placeholder="Full Name"
              className="h-11 border border-gray-300 px-3 text-sm outline-none focus:border-black"
            />

            <input
              type="email"
              name="email"
              value={customerInfo.email}
              onChange={handleCustomerInfo}
              placeholder="Email"
              className="h-11 border border-gray-300 px-3 text-sm outline-none focus:border-black"
            />

            <input
              type="tel"
              name="phone"
              value={customerInfo.phone}
              onChange={handleCustomerInfo}
              placeholder="Phone Number"
              className="h-11 border border-gray-300 px-3 text-sm outline-none focus:border-black"
            />

            <input
              type="text"
              name="address"
              value={customerInfo.address}
              onChange={handleCustomerInfo}
              placeholder="Address"
              className="h-11 border border-gray-300 px-3 text-sm outline-none focus:border-black"
            />
          </div>
        </section>
      </div>

      {/* RIGHT */}
      <aside className="border border-gray-200 h-fit">
        <div className="p-5 border-b">
          <h2 className="font-semibold">Order Summary</h2>
        </div>

        <div className="p-5 space-y-6">
          {/* Payment */}
          <div>
            <h3 className="text-sm font-semibold mb-3">Payment Method</h3>

            <div className="space-y-2">
              {/* Card */}
              <button
                type="button"
                onClick={() => setPaymentMethod("card")}
                className={`w-full flex items-center gap-3 border p-3 text-left transition ${
                  paymentMethod === "card" ? "border-black" : "border-gray-300"
                }`}
              >
                <CreditCard size={18} />

                <div>
                  <p className="text-sm font-medium">Credit / Debit Card</p>

                  <p className="text-xs text-gray-500">Pay securely by card</p>
                </div>

                <span
                  className={`ml-auto size-4 border flex items-center justify-center ${
                    paymentMethod === "card"
                      ? "border-black"
                      : "border-gray-300"
                  }`}
                >
                  {paymentMethod === "card" && (
                    <span className="size-2 bg-black" />
                  )}
                </span>
              </button>

              {/* Cash */}
              <button
                type="button"
                onClick={() => setPaymentMethod("cash")}
                className={`w-full flex items-center gap-3 border p-3 text-left transition ${
                  paymentMethod === "cash" ? "border-black" : "border-gray-300"
                }`}
              >
                <Banknote size={18} />

                <div>
                  <p className="text-sm font-medium">Cash on Delivery</p>

                  <p className="text-xs text-gray-500">
                    Pay when your order arrives
                  </p>
                </div>

                <span
                  className={`ml-auto size-4 border flex items-center justify-center ${
                    paymentMethod === "cash"
                      ? "border-black"
                      : "border-gray-300"
                  }`}
                >
                  {paymentMethod === "cash" && (
                    <span className="size-2 bg-black" />
                  )}
                </span>
              </button>
            </div>
          </div>

          {/* Prices */}
          <div className="border-t pt-5 space-y-3">
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

          {/* Place Order */}
          <button
            type="button"
            onClick={handlePlaceOrder}
            className="w-full bg-black text-white py-3 text-sm font-semibold hover:bg-gray-800 transition"
          >
            Place Order
          </button>

          <p className="text-xs text-gray-500 text-center leading-5">
            By placing your order, you agree to our Terms & Conditions and
            Privacy Policy.
          </p>
        </div>
      </aside>
    </div>
  );
}

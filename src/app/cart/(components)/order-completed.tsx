"use client";

import { motion } from "motion/react";
import { Check, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";

export default function OrderCompleted() {
  const router = useRouter();

  return (
    <div className="min-h-125 flex items-center justify-center">
      <div className="text-center">
        {/* Check Circle */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{
            type: "spring",
            stiffness: 200,
            damping: 15,
          }}
          className="mx-auto size-20 rounded-full bg-green-500 flex items-center justify-center"
        >
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{
              delay: 0.2,
              duration: 0.3,
            }}
          >
            <Check className="size-10 text-white" strokeWidth={3} />
          </motion.div>
        </motion.div>

        {/* Text */}
        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-6 text-2xl font-bold"
        >
          Order Delivered Successfully
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-2 text-sm text-gray-500"
        >
          Your order has been confirmed. Thank you for shopping with us.
        </motion.p>

        {/* Back to Home */}
        <motion.button
          type="button"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          onClick={() => router.push("/")}
          className="mt-8 inline-flex items-center justify-center gap-2 rounded-2xl bg-black px-6 py-3 text-sm font-medium text-white transition hover:bg-gray-800 cursor-pointer"
        >
          Continue Shopping
          <ArrowRight size={16} />
        </motion.button>
      </div>
    </div>
  );
}

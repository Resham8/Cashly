import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

export function Balance({ value }: { value: string }) {
  const [showBalance, setShowBalance] = useState(true);
  return (
    <div className="py-5 px-10">
    <div className="bg-gradient-to-br from-black to-zinc-800 rounded-xl p-6 mb-6 border border-zinc-700/50">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-zinc-400 text-sm font-medium">Total Balance</p>
          <div className="flex items-center space-x-3 mt-1">
            <h2 className="text-3xl font-semibold text-white">
              {showBalance ? `₹${value.toLocaleString()}` : "₹••••••"}
            </h2>
            <button
              onClick={() => setShowBalance(!showBalance)}
              className="text-zinc-400 hover:text-zinc-300 transition-colors"
            >
              {showBalance ? (
                <EyeOff className="w-5 h-5" />
              ) : (
                <Eye className="w-5 h-5" />
              )}
            </button>
          </div>
          
        </div>
      </div>
    </div></div>
  );
}

import { Wallet } from "lucide-react";

export function AppBar() {
  return (
    <div className="flex justify-between px-10 py-4 shadow h-16 items-center">
      <div className="flex justify-center h-full items-center gap-3 font-medium text-lg">
        <div className="p-3 rounded-full bg-highlight">
          <Wallet />
        </div>
        Cashly
      </div>
      <div className="flex gap-3 items-center">
        <div className="flex justify-center h-full font-normal text-lg">Hello</div>
        <div className="p-2 rounded-full  h-12 w-12 bg-gradient-to-br from-violet-500 to-highlight ">
          <div className="flex justify-center items-center h-full text-xl">
            U
          </div>
        </div>
      </div>
    </div>
  );
}

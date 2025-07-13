export function AppBar() {
  return (
    <div className="flex justify-between px-5 py-4 shadow h-14 items-center">
      <div className="flex justify-center h-full items-center font-medium text-lg">Cashly</div>
      <div className="flex gap-3 items-center">
        <div className="flex justify-center h-full font-normal">Hello</div>
        <div className="p-2 rounded-full  h-12 w-12 bg-slate-200">
          <div className="flex justify-center items-center h-full text-xl">
            U
          </div>
        </div>
      </div>
    </div>
  );
}

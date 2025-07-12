export function Balance({value}:{
    value:string
}) {
  
  return (
    <div className="flex gap-5 px-5 py-4">
      <div className="font-bold text-lg">Your Balance</div>
      <div className="font-semibold text-lg">Rs {value}</div>
    </div>
  );
}

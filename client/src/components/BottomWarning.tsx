import { Link } from "react-router-dom";

export function BottomWarning({
  label,
  to,
  text,
}: {
  label: string;
  to: string;
  text: string;
}) {
  return (
    <div className="py-2 text-base flex justify-center">
      <div >{label}</div>
      <Link className="underline pl-1 cursor-pointer" to={to}>
        {text}
      </Link>
    </div>
  );
}

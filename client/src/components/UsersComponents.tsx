import { useEffect, useState } from "react";
import { Button } from "./Button";
import axios from "axios";
import { useNavigate } from "react-router-dom";

type user = {
  firstName: string;
  lastName: string;
  id: number;
};

export function UsersComponents() {
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/v1/user/bulk?filter=${filter}`, {
        headers: {
          Authentication: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => setUsers(response.data.users));
  }, [filter]);

  return (
    <div className="flex flex-col gap-3  px-5 py-3">
      <div className="text-lg font-semibold">Users</div>
      <input
        type="text"
        onChange={(e) => setFilter(e.target.value)}
        placeholder="Search Users....."
        className="w-full px-2 py-1 border rounded-md border-slate-200"
      />
      <div>
        {users.map((user, index) => (
          <User key={index} user={user} />
        ))}
      </div>
    </div>
  );
}

function User({ user }: { user: user }) {
  const navigate = useNavigate();
  return (
    <div className="flex justify-between items-center">
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-full  h-12 w-12 bg-slate-200">
          <div className="flex justify-center items-center h-full text-xl uppercase">
            {user.firstName[0]}
          </div>
        </div>
        <div>
          {user.firstName} {user.lastName}
        </div>
      </div>
      <div>
        <Button
          label="Send Money"
          onClick={() => navigate(`/send?id=${user.id}&name=${user.firstName}`)}
        />
      </div>
    </div>
  );
}

import { useEffect, useState } from "react";
import { Button } from "./Button";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Send } from "lucide-react";

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
    <div className="flex flex-col gap-3 py-1 px-10">      
      <input
        type="text"
        onChange={(e) => setFilter(e.target.value)}
        placeholder="Search Users....."
        className="w-full px-3 py-3 border rounded-md border-slate-200 bg-white"
      />
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-zinc-900 mb-4">Send Money</h3>
        <div className="space-y-3">
          {users.map((user, index) => (
            <User key={index} user={user} />
          ))}
        </div>
      </div>
    </div>
  );
}

function User({ user }: { user: user }) {
  const navigate = useNavigate();
  return (
    <div className="bg-white/60 backdrop-blur-sm rounded-xl p-4 border border-zinc-200/50 hover:bg-white/80 hover:border-zinc-300/50 transition-all duration-300 group">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="relative">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-highlight rounded-full flex items-center justify-center text-white font-medium uppercase">
              {user.firstName[0]}
            </div>
          </div>
          <div>
            <h3 className="font-medium text-zinc-900 capitalize">
              {user.firstName} {user.lastName}
            </h3>
          </div>
        </div>
        <Button
          variant="primary"
          size="sm"
          label="Send"
          onClick={() => navigate(`/send?id=${user.id}&name=${user.firstName}`)}
          className="flex items-center space-x-2"
        >
          <Send className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}



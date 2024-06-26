import { useState } from "react";
import { useLoaderData } from "react-router-dom";

const Users = () => {
  const loadedUsers = useLoaderData();
  const [users, setUsers] = useState(loadedUsers);
  const handleDelete = (id) => {
    //make sure user is confirm to delete
    fetch(
      `https://0121-coffee-store-espresso-emporium-server-module-56-5.vercel.app/user/${id}`,
      {
        method: "DELETE",
      },
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.deletedCount > 0) {
          console.log("delete user successfully");

          // remove the user from the list
          const remainingUsers = users.filter((user) => user._id !== id);
          setUsers(remainingUsers);
        }
      });
  };
  return (
    <div>
      users : {users.length}
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Email</th>
              <th>Created Time</th>
              <th>Last Log In Time</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td></td>
                <td>{user.email}</td>
                <td>{user.createdTime}</td>
                <td>{user.lastSignInTime}</td>
                <td>
                  <button
                    onClick={() => handleDelete(user._id)}
                    className="btn"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Users;

import { Suspense } from "react";
import "./App.css";
import { get } from "http";

type User = {
  id: number;
  email: string;
  name: string;
};

const wrapPromise = <T,>(promise: Promise<T>) => {
  let status = "pending";
  let result: T;
  let suspender = promise.then(
    (r) => {
      status = "success";
      result = r;
    },
    (e) => {
      status = "error";
      result = e;
    }
  );
  return {
    read(): T {
      if (status === "pending") {
        throw suspender;
      } else if (status === "error") {
        throw result;
      } else if (status === "success") {
        return result;
      } else {
        throw new Error("unreachable");
      }
    },
  };
};

const getUsersPromise = async () => {
  const ret = await fetch("http://localhost:8000/");
  const user = await ret.json();
  return user as User[];
};

const suspended: Record<string, { read: () => unknown }> = {};

const generateSuspended = <T,>(promise: Promise<T>, key: string) => {
  return () => {
    const suspendedUsers = suspended[key];
    if (suspendedUsers === undefined) {
      suspended[key] = wrapPromise(promise);
    }
    return suspended[key].read() as T;
  };
};

const getUsers = generateSuspended(getUsersPromise(), "users");

function App() {
  return (
    <>
      <h1>Test</h1>
      <Suspense fallback={<div>Loading...</div>}>
        <UserList />
      </Suspense>
    </>
  );
}

function UserList() {
  const users = getUsers();
  return (
    <ul>
      {users.map((user) => (
        <li key={user.id}>
          <div>{user.name}</div>
        </li>
      ))}
    </ul>
  );
}

export default App;

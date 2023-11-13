import { Contact } from "./type";

const wrapPromise = <T>(promise: Promise<T>) => {
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

export const requestGet = async <T>(path: string): Promise<T> => {
  const ret = await fetch(`http://localhost:8000/${path}`);
  if (!ret.ok) {
    throw new Error("Request failed");
  }
  return (await ret.json()) as T;
};

const suspended: Record<string, { read: () => unknown }> = {};

export const generateSuspended = <T>(
  promiseBuilder: () => Promise<T>,
  key: string
) => {
  return () => {
    if (suspended[key] === undefined) {
      suspended[key] = wrapPromise(promiseBuilder());
    }
    return suspended[key].read() as T;
  };
};

export const requestGetContacts = () => requestGet<Contact[]>("contacts");

export const getContacts = generateSuspended(requestGetContacts, "contacts");

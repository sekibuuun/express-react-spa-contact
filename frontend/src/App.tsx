import { ReactNode, Suspense, useState } from "react";
import { getContacts } from "./api";
import { Contact } from "./type";

function App() {
  return (
    <>
      <h1>Contacts</h1>
      <Suspense fallback={<div>Loading...</div>}>
        <ContactList />
      </Suspense>
      <Frame>
        <ArrayComponents />
      </Frame>
      <Frame>
        <ObjectComponent />
      </Frame>
    </>
  );
}

function Frame({ children }: { children: ReactNode }) {
  return (
    <div style={{ border: "1px solid black", margin: "10px", padding: "5px" }}>
      {children} {/* ここの内容が置き換わる */}
    </div>
  );
}

function ContactList() {
  const contacts = getContacts();

  return (
    <ul>
      {contacts.map((contact) => (
        <li key={contact.id}>
          <ContactItem contact={contact} />
        </li>
      ))}
    </ul>
  );
}

type ContactItemProps = { contact: Contact };

function ContactItem({ contact }: ContactItemProps) {
  const [color, setColor] = useState("blue");
  const handleClick = () => {
    console.log("onClick!");
    {
      color === "red" ? setColor("blue") : setColor("red");
    }
  };
  return (
    <div style={{ color }} onClick={handleClick}>
      {contact.name} | {contact.email}
    </div>
  );
}

function ArrayComponents() {
  const [names, setNames] = useState(["Alice", "Bob", "Carl"]);
  const addList = () => {
    setNames([...names, "test"]);
  };

  return (
    <div>
      {names.map((name) => (
        <li>{name}</li>
      ))}
      <button onClick={addList}>追加</button>
    </div>
  );
}

type personInfo = {
  name: String;
  age: number;
};

function ObjectComponent() {
  const [person, setPerson] = useState<personInfo>({ name: "me", age: 40 });
  const addAge = () => {
    setPerson({ ...person, age: person.age + 1 }); // person.age++ だと動かない
    console.log(person.age);
  };

  return (
    <div>
      <p>
        {person.name}: {person.age}
      </p>
      <button onClick={addAge}>addAge</button>
    </div>
  );
}

export default App;

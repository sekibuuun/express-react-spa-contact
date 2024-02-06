import { Suspense, useState } from "react";
import { getContacts } from "./api";
import { Contact } from "./type";

function App() {
  return (
    <>
      <h1>Contacts</h1>
      <Suspense fallback={<div>Loading...</div>}>
        <ContactList />
      </Suspense>
      <ArrayComponents />
    </>
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

export default App;

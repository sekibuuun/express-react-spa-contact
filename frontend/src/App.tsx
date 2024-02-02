import { Suspense, useState} from "react";
import { getContacts } from "./api";
import { Contact } from "./type"

function App() {
  return (
    <>
      <h1>Contacts</h1>
      <Suspense fallback={<div>Loading...</div>}>
        <ContactList />
      </Suspense>
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
    setColor("red");
  }
  return (
    <div style={{ color: color }} onClick={handleClick}>
      {contact.name} | {contact.email}
    </div>
  );
}

export default App;

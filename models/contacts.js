const fs = require("fs").promises;
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.resolve(
  "../../../Documents/GitHub/nodejs-homework-rest-api/models/contacts.json"
);

const listContacts = async () => {
  try {
    const contacts = await fs.readFile(contactsPath);

    return JSON.parse(contacts);
  } catch (error) {
    console.log(error);
  }
};

const getContactById = async (contactId) => {
  try {
    const contacts = await listContacts();
    const contactById = contacts.find((item) => {
      return contactId.toString() === item.id;
    });
    return contactById;
  } catch (error) {
    console.log(error);
  }
};

const removeContact = async (contactId) => {
  try {
    const contacts = await listContacts();
    const contactsFiltred = contacts.filter((item) => {
      return contactId.toString() !== item.id;
    });
    await fs.writeFile(contactsPath, JSON.stringify(contactsFiltred, null, 2));
    return contacts.length !== contactsFiltred.length;
  } catch (error) {
    console.log(error);
  }
};

const addContact = async (body) => {
  try {
    const id = nanoid();
    const contacts = await listContacts();
    const contact = { id, ...body };
    contacts.push(contact);

    const newContacts = JSON.stringify(contacts, null, 2);
    await fs.writeFile(contactsPath, newContacts);
    return contact;
  } catch (error) {
    console.log(error);
  }
};

const updateContact = async (contactId, body) => {
  try {
    const contacts = await listContacts();
    contacts.forEach((contact) => {
      if (contact.id === contactId.toString()) {
        contact.name = body.name;
        contact.email = body.email;
        contact.phone = body.phone;
      }
    });
    const newContacts = JSON.stringify(contacts, null, 2);
    await fs.writeFile(contactsPath, newContacts);

    const changedContact = contacts.filter(
      (contact) => contact.id === contactId.toString()
    );
    return changedContact;
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};

const { Contact } = require("../models/contact");

const listContacts = async (req, res, next) => {
  try {
    const contacts = await Contact.find();
    res.status(200).json({ contacts, message: "success response" });
  } catch (error) {
    console.log(error.message);
  }
};

const getContactById = async (req, res, next) => {
  const { contactId } = req.params;
  try {
    const contactById = await Contact.findById(contactId);
    if (contactById) {
      return res.status(200).json({ contactById, message: "success response" });
    }
    res.status(404).json({ message: "Not found" });
  } catch (error) {
    console.log(error.message);
  }
};

const removeContact = async (req, res, next) => {
  const { contactId } = req.params;
  try {
    const deletedContact = await Contact.findByIdAndRemove(contactId);
    if (deletedContact) {
      return res.status(200).json({ message: "contact deleted" });
    }
    return res.status(404).json({ message: "Not found" });
  } catch (error) {
    console.log(error.message);
  }
};

const addContact = async (req, res, next) => {
  try {
    const addedContact = await Contact.create(req.body);
    res.status(201).json({ addedContact, message: "contatct added" });
  } catch (error) {
    console.log(error.message);
  }
};

const updateContact = async (req, res, next) => {
  const { contactId } = req.params;
  const body = req.body;
  try {
    if (body) {
      const changedContact = await Contact.findByIdAndUpdate(contactId, body, {
        new: true,
      });
      if (changedContact) {
        return res
          .status(200)
          .json({ changedContact, message: "success response" });
      }
      return res.status(404).json({ message: "Not found" });
    }
    res.status(400).json({ message: "missing fields" });
  } catch (error) {
    console.log(error.message);
  }
};

const updateStatusContact = async (req, res, next) => {
  const { contactId } = req.params;
  const body = req.body;

  if (!body) {
    return res.status(400).json({ message: "missing fields" });
  }

  try {
    const changedContactStatus = await Contact.findByIdAndUpdate(
      contactId,
      body,
      {
        new: true,
      }
    );
    if (changedContactStatus) {
      return res
        .status(200)
        .json({ changedContactStatus, message: "success response" });
    }
    return res.status(404).json({ message: "Not found" });
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact,
};

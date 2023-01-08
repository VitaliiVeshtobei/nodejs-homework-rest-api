const { Contact } = require("../models/contact");

const listContacts = async (req, res, next) => {
  const { _id } = req.user;
  const { page = 1, limit = 20 } = req.query;
  const { favorite } = req.query;
  console.log(favorite);
  const skip = (page - 1) * limit;
  try {
    const contacts = await Contact.find({ owner: _id, favorite }, "", {
      skip,
      limit: +limit,
    }).populate("owner", "_id email");
    res.status(200).json({ contacts, message: "success response" });
  } catch (error) {
    next(error.message);
  }
};

const getContactById = async (req, res, next) => {
  const { contactId } = req.params;
  try {
    const contactById = await Contact.findById(contactId);
    if (!contactById) {
      return res.status(404).json({ message: "Not found" });
    }
    res.status(200).json({ contactById, message: "success response" });
  } catch (error) {
    res.status(404).json({ message: "Not found" });
    next(error.message);
  }
};

const removeContact = async (req, res, next) => {
  const { contactId } = req.params;
  try {
    const removedContact = await Contact.findByIdAndRemove(contactId);
    if (!removedContact) {
      return res.status(404).json({ message: "Not found" });
    }
    res.status(200).json({ message: "contact deleted" });
  } catch (error) {
    res.status(404).json({ message: "Not found" });
    next(error.message);
  }
};

const addContact = async (req, res, next) => {
  const { _id } = req.user;
  try {
    const addedContact = await Contact.create({ ...req.body, owner: _id });
    res.status(201).json({ addedContact, message: "contatct added" });
  } catch (error) {
    next(error.message);
  }
};

const updateContact = async (req, res, next) => {
  const { contactId } = req.params;
  const body = req.body;
  try {
    if (!body) {
      return res.status(400).json({ message: "missing fields" });
    }
    const changedContact = await Contact.findByIdAndUpdate(contactId, body, {
      new: true,
    });
    if (!changedContact) {
      return res.status(404).json({ message: "Not found" });
    }

    res.status(200).json({ changedContact, message: "success response" });
  } catch (error) {
    next(error.message);
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
    if (!changedContactStatus) {
      return res.status(404).json({ message: "Not found" });
    }
    res.status(200).json({ changedContactStatus, message: "success response" });
  } catch (error) {
    next(error.message);
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

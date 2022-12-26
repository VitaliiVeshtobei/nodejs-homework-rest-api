const express = require("express");

const router = express.Router();

const { validation } = require("../../utils/validation/middlewareValidation");

const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
} = require("../../models/contacts");

router.get("/", async (req, res, next) => {
  try {
    const contacts = await listContacts();

    res.status(200).json({ contacts, message: "success response" });
  } catch (error) {
    console.log(error.message);
  }
});

router.get("/:contactId", async (req, res, next) => {
  const { contactId } = req.params;

  try {
    const contactById = await getContactById(contactId);
    if (contactById) {
      return res.status(200).json({ contactById, message: "success response" });
    }
    res.status(404).json({ message: "Not found" });
  } catch (error) {
    console.log(error.message);
  }
});

router.post("/", validation, async (req, res, next) => {
  try {
    const addedContact = await addContact(req.body);
    res.status(201).json({ addedContact, message: "contatct added" });
  } catch (error) {
    console.log(error.message);
  }
});

router.delete("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const deletedContact = await removeContact(contactId);
    if (deletedContact) {
      return res.status(200).json({ message: "contact deleted" });
    }
    return res.status(404).json({ message: "Not found" });
  } catch (error) {
    console.log(error.message);
  }
});

router.put("/:contactId", validation, async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const body = req.body;

    if (body) {
      const changedContact = await updateContact(contactId, body);
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
});

module.exports = router;

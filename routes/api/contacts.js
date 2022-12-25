const express = require("express");

const router = express.Router();

const Joi = require("joi");

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
  const id = req.params.contactId;

  try {
    const contactById = await getContactById(id);
    if (contactById) {
      res.status(200).json({ contactById, message: "success response" });
    }
    res.status(404).json({ message: "Not found" });
  } catch (error) {
    console.log(error.message);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const schema = Joi.object({
      name: Joi.string().alphanum().min(3).max(30).required(),
      email: Joi.string()
        .email({
          minDomainSegments: 2,
          tlds: { allow: ["com", "net"] },
        })
        .required(),
      phone: Joi.number().integer().required(),
    });

    const validationResult = schema.validate(req.body);
    if (validationResult.error) {
      return res
        .status(404)
        .json({ message: validationResult.error.details[0].message });
    }

    const addedContact = await addContact(req.body);
    res.status(201).json({ addedContact, message: "contatct added" });
  } catch (error) {}
});

router.delete("/:contactId", async (req, res, next) => {
  try {
    const id = req.params.contactId;
    const deletedContact = await removeContact(id);
    if (deletedContact) {
      return res.status(200).json({ message: "contact deleted" });
    }
    return res.status(404).json({ message: "Not found" });
  } catch (error) {}
});

router.put("/:contactId", async (req, res, next) => {
  try {
    const id = req.params.contactId;
    const body = req.body;

    const schema = Joi.object({
      name: Joi.string().alphanum().min(3).max(30).required(),
      email: Joi.string()
        .email({
          minDomainSegments: 2,
          tlds: { allow: ["com", "net"] },
        })
        .required(),
      phone: Joi.number().integer().required(),
    });

    const validationResult = schema.validate(req.body);
    if (validationResult.error) {
      return res
        .status(404)
        .json({ message: validationResult.error.details[0].message });
    }

    if (body) {
      const changedContact = await updateContact(id, body);
      if (changedContact) {
        return res
          .status(200)
          .json({ changedContact, message: "success response" });
      }
      return res.status(404).json({ message: "Not found" });
    }
    res.status(400).json({ message: "missing fields" });
  } catch (error) {}
});

module.exports = router;

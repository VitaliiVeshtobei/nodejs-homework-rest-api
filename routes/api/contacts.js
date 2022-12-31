const express = require("express");

const router = express.Router();

const {
  validation,
  validationStatus,
} = require("../../middlewares/middlewareValidation");

const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
  updateStatusContact,
} = require("../../middlewares/middlewareContacts");

router.get("/", listContacts);

router.get("/:contactId", getContactById);

router.post("/", validation, addContact);

router.delete("/:contactId", removeContact);

router.put("/:contactId", validation, updateContact);

router.patch("/:contactId/favorite", validationStatus, updateStatusContact);

module.exports = router;

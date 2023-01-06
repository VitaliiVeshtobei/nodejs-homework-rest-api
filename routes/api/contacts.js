const express = require("express");

const router = express.Router();

const {
  validationContact,
  validationContactStatus,
} = require("../../middlewares/middlewareValidation");

const { auth } = require("../../middlewares/auth");

const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
  updateStatusContact,
} = require("../../controllers/contacts");

router.get("/", auth, listContacts);

router.get("/:contactId", getContactById);

router.post("/", auth, validationContact, addContact);

router.delete("/:contactId", removeContact);

router.put("/:contactId", validationContact, updateContact);

router.patch(
  "/:contactId/favorite",
  validationContactStatus,
  updateStatusContact
);

module.exports = router;

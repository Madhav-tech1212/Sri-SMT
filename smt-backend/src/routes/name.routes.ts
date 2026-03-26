import express from "express";
import {
  createName,
  getNames,
  getNameById,
  updateName,
  deleteName
} from "../controllers/name.controller.js";

const router = express.Router();

router.post("/", createName);
router.get("/", getNames);
router.get("/:id", getNameById);
router.put("/:id", updateName);
router.delete("/:id", deleteName);

export default router;
import { Request, Response } from "express";
import { NameModel } from "../models/name.model.js";

export const createName = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;
    const data = await NameModel.create(name);
    res.status(201).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating name" });
  }
};

export const getNames = async (req: Request, res: Response) => {
  try {
    const data = await NameModel.getAll();
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: "Error fetching names" });
  }
};

export const getNameById = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const data = await NameModel.getById(id);
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: "Error fetching name" });
  }
};

export const updateName = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const { name } = req.body;
    const data = await NameModel.update(id, name);
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: "Error updating name" });
  }
};

export const deleteName = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const data = await NameModel.delete(id);
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: "Error deleting name" });
  }
};
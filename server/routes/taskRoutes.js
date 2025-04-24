import express from "express";
import {
  getTasks,
  createTask,
  getTask,
  updateTask,
  deleteTask,
} from "../controllers/taskControllers.js";

const router = express.Router()

router.route('/')
.get(getTasks)
.post(createTask)

router.route('/:id')
.get(getTask)
.put(updateTask)
.delete(deleteTask)

export default router
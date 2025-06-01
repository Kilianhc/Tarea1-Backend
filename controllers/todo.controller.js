import mongoose from 'mongoose';
import { Todo } from '../models/todo.model.js';

export const getTodos = async (req, res) => {
  try {
    const todos = await Todo.find().sort({ createdAt: -1 });
    res.json(todos);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los todos', error: error.message });
  }
};

export const createTodo = async (req, res) => {
  console.log(req.body); // Verifica qué datos está recibiendo
  try {
    const newTodo = new Todo(req.body);
    await newTodo.save();
    res.status(201).json(newTodo);
  } catch (error) {
    res.status(400).json({ message: 'Error al crear el todo', error: error.message });
  }
};

export const updateTodo = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'ID no válido' });
    }

    const updatedTodo = await Todo.findByIdAndUpdate(
      id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedTodo) {
      return res.status(404).json({ message: 'Todo no encontrado' });
    }

    res.json(updatedTodo);
  } catch (error) {
    res.status(400).json({ message: 'Error al actualizar el todo', error: error.message });
  }
};

export const deleteTodo = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'ID no válido' });
    }

    const deletedTodo = await Todo.findByIdAndDelete(id);

    if (!deletedTodo) {
      return res.status(404).json({ message: 'Todo no encontrado' });
    }

    res.json({ message: 'Todo eliminado correctamente', todo: deletedTodo });
  } catch (error) {
    res.status(400).json({ message: 'Error al eliminar el todo', error: error.message });
  }
}; 
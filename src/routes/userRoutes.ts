import { Router } from 'express';
import { getUsers, getUserById, createUser } from '../services/userService';

const router = Router();

router.get('/', async (req, res) => {
  const users = await getUsers();
  res.json(users);
});

router.get('/:id', async (req, res) => {
  const user = await getUserById(Number(req.params.id));
  if (user) {
    res.json(user);
  } else {
    res.status(404).send('User not found');
  }
});

router.post('/', async (req, res) => {
  const { email, name } = req.body;
  const user = await createUser(email, name);
  res.status(201).json(user);
});

export default router;

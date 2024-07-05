import {Router} from 'express';
import {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
} from '../services/userService';

const router = Router();

router.get('/', async (req, res) => {
    const users = await getAllUsers();
    res.json(users);
});

router.get('/:id', async (req, res) => {
    const user = await getUserById(Number(req.params.id));
    res.json(user);
});

router.post('/', async (req, res) => {
    const newUser = await createUser(req.body);
    res.json(newUser);
});

router.put('/:id', async (req, res) => {
    const updatedUser = await updateUser(Number(req.params.id), req.body);
    res.json(updatedUser);
});

router.delete('/:id', async (req, res) => {
    const deletedUser = await deleteUser(Number(req.params.id));
    res.json(deletedUser);
});

export default router;

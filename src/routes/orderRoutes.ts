import {Router} from 'express';
import {
    getAllOrderItems,
    getOrderItemById,
    createOrderItem,
    deleteOrderItem,
} from '../services/orderService';

const router = Router();

router.get('/', async (req, res) => {
    const orderItems = await getAllOrderItems();
    res.json(orderItems);
});

router.get('/:id', async (req, res) => {
    const orderItem = await getOrderItemById(Number(req.params.id));
    res.json(orderItem);
});

router.post('/', async (req, res) => {
    const newOrderItem = await createOrderItem(req.body);
    res.json(newOrderItem);
});

router.delete('/:id', async (req, res) => {
    const deletedOrderItem = await deleteOrderItem(Number(req.params.id));
    res.json(deletedOrderItem);
});

export default router;

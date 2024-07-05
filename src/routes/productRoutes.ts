import {Router} from 'express';
import {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
} from '../services/productService';

const router = Router();

router.get('/', async (req, res) => {
    const products = await getAllProducts();
    res.json(products);
});

router.get('/:id', async (req, res) => {
    const product = await getProductById(Number(req.params.id));
    res.json(product);
});

router.post('/', async (req, res) => {
    const newProduct = await createProduct(req.body);
    res.json(newProduct);
});

router.put('/:id', async (req, res) => {
    const updatedProduct = await updateProduct(Number(req.params.id), req.body);
    res.json(updatedProduct);
});

router.delete('/:id', async (req, res) => {
    const deletedProduct = await deleteProduct(Number(req.params.id));
    res.json(deletedProduct);
});

export default router;

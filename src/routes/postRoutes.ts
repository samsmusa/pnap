import { Router } from 'express';
import { getPosts, getPostById, createPost } from '../services/postService';

const router = Router();

router.get('/', async (req, res) => {
  const posts = await getPosts();
  res.json(posts);
});

router.get('/:id', async (req, res) => {
  const post = await getPostById(Number(req.params.id));
  if (post) {
    res.json(post);
  } else {
    res.status(404).send('Post not found');
  }
});

router.post('/', async (req, res) => {
  const { title, content, authorId } = req.body;
  const post = await createPost(title, content, Number(authorId));
  res.status(201).json(post);
});

export default router;

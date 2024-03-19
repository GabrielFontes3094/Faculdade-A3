import { Router } from 'express';
import { authenticateUser, deleteUser, getUser, getUsers, postUser, updateUser } from '../controllers/user';

const router = Router();

router.get('/', getUsers);
router.get('/:id', getUser);
router.delete('/:id', deleteUser);
router.post('/', postUser);
router.put('/:id', updateUser);
router.post('/authenticate', authenticateUser);

export default router;
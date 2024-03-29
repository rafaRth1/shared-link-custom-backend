import express from 'express';

import checkAuth from '../middleware/check-auth.js';
import {
	addLinkBio,
	deleteLinkBio,
	editLinkBio,
	editValuesBio,
	reorderPositionLinksBio,
} from '../controllers/bio-controller.js';

const router = express.Router();

router.put('/edit-bio', checkAuth, editValuesBio);
router.post('/add-link', checkAuth, addLinkBio);
router.post('/edit-link', checkAuth, editLinkBio);
router.put('/reorder-link', reorderPositionLinksBio);
// router.post('/updload-delete', handleDestroyImage);
// router.route('/:id').put(checkAuth, editValuesBio).post(checkAuth, deleteLinkBio);

export default router;

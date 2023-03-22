import express from 'express'
import { fetchAccounts, addAccount, updateAccount, deleteAccount } from '../controllers/accounts.js'

const router = express.Router()

router.get('/', fetchAccounts)
router.post('/', addAccount)
router.patch('/:id', updateAccount)
router.delete('/:id', deleteAccount)

export default router

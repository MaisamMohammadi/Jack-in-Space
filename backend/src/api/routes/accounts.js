import express from 'express'
import asyncHandler from 'express-async-handler'
import {
  fetchAccounts,
  fetchAccount,
  authenticateAccountRoute,
  addAccount,
  updateAccount,
  deleteAccount
} from '../controllers/accounts.js'

const router = express.Router()

router.get('/', asyncHandler(fetchAccounts))
router.get('/:id', asyncHandler(fetchAccount))
router.get('/authenticate', asyncHandler(authenticateAccountRoute))
router.post('/', asyncHandler(addAccount))
router.patch('/:id/:method', asyncHandler(updateAccount))
router.delete('/:id', asyncHandler(deleteAccount))

export default router

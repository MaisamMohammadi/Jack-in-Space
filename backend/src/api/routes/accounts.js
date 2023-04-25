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
// IMPORTANT: /authenticate must come before /:id
router.get('/authenticate', asyncHandler(authenticateAccountRoute))
router.get('/:id', asyncHandler(fetchAccount))
router.post('/', asyncHandler(addAccount))
router.patch('/:id/:method', asyncHandler(updateAccount))
router.delete('/:id', asyncHandler(deleteAccount))

export default router

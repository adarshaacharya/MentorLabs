import { Router } from 'express'

import { usersController } from './users.controller'

export const router : Router = Router()



router.post('/',  usersController.createAccount)
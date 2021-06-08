import Joi from 'joi'
import { list } from '../../../utils/enum.util'
import { UserRole } from '../entities/user.entity'

export const createAccountDto = Joi.object().keys({
  name: Joi.string().min(2).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(5).required(),
  role : Joi.any().valid(...list(UserRole))
})
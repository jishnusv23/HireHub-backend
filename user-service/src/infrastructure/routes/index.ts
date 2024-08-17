import {Router} from 'express'
import { IDependancies } from '../../application/interface/IDependancies'
import {  controller} from '../../presentation/controller/'
import {jwtMiddleware} from 'hirehub-middleware-version'

export const routes=(dependancies:IDependancies)=>{
    const {getUser}=controller(dependancies)
    const router=Router()

     router.route("/getUser").get(jwtMiddleware, getUser);

     return router
}
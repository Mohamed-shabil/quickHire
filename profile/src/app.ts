import express from 'express';
import mongoose from 'mongoose'
import {authChecker} from '@quickhire/common'

export const app = express();


app.use(authChecker);
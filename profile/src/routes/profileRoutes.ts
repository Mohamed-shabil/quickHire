import express from 'express';
import {setupProfile,addEducation,addProject,} from '../controller/ProfileController'
import {requireAuth} from '@quickhire/common'
export const router = express.Router();

router.use(requireAuth);

router.post('/api/profile/setup',setupProfile);

router.post('/api/profile/education',addEducation);

router.post('/api/profile/projects',addProject);

router.post('/api/profile/getFollowers',);

router.post('/api/profile/projects',);



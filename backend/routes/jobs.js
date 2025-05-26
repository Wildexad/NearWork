import express from 'express';
import { Job, User } from '../models/index.js';
import { authenticate, isAdmin } from '../middleware/auth.js';

const router = express.Router();

// @route   GET /api/jobs
// @desc    Get all jobs
// @access  Public
router.get('/', async (req, res) => {
  try {
    const jobs = await Job.findAll({
      include: [{
        model: User,
        as: 'creator',
        attributes: ['id', 'first_name', 'last_name', 'avatar_url']
      }],
      order: [['created_at', 'DESC']]
    });

    res.json(jobs.map(job => ({
      id: job.id,
      title: job.title,
      salary: job.salary,
      location: job.location,
      description: job.description,
      contactName: job.contact_name,
      contactPhone: job.contact_phone,
      date: job.created_at,
      creator: job.creator ? {
        id: job.creator.id,
        name: `${job.creator.first_name} ${job.creator.last_name}`,
        avatarUrl: job.creator.avatar_url
      } : null
    })));
  } catch (error) {
    console.error('Get jobs error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/jobs/:id
// @desc    Get job by ID
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const job = await Job.findByPk(req.params.id, {
      include: [{
        model: User,
        as: 'creator',
        attributes: ['id', 'first_name', 'last_name', 'avatar_url']
      }]
    });

    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }

    res.json({
      id: job.id,
      title: job.title,
      salary: job.salary,
      location: job.location,
      description: job.description,
      contactName: job.contact_name,
      contactPhone: job.contact_phone,
      date: job.created_at,
      creator: job.creator ? {
        id: job.creator.id,
        name: `${job.creator.first_name} ${job.creator.last_name}`,
        avatarUrl: job.creator.avatar_url
      } : null
    });
  } catch (error) {
    console.error('Get job error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   POST /api/jobs
// @desc    Create a new job
// @access  Private (Admin only)
router.post('/', authenticate, isAdmin, async (req, res) => {
  try {
    const { title, salary, location, description, contactName, contactPhone } = req.body;

    const newJob = await Job.create({
      title,
      salary,
      location,
      description,
      contact_name: contactName,
      contact_phone: contactPhone,
      user_id: req.user.id
    });

    const job = await Job.findByPk(newJob.id, {
      include: [{
        model: User,
        as: 'creator',
        attributes: ['id', 'first_name', 'last_name', 'avatar_url']
      }]
    });

    res.status(201).json({
      id: job.id,
      title: job.title,
      salary: job.salary,
      location: job.location,
      description: job.description,
      contactName: job.contact_name,
      contactPhone: job.contact_phone,
      date: job.created_at,
      creator: job.creator ? {
        id: job.creator.id,
        name: `${job.creator.first_name} ${job.creator.last_name}`,
        avatarUrl: job.creator.avatar_url
      } : null
    });
  } catch (error) {
    console.error('Create job error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   PUT /api/jobs/:id
// @desc    Update a job
// @access  Private (Admin only)
router.put('/:id', authenticate, isAdmin, async (req, res) => {
  try {
    const { title, salary, location, description, contactName, contactPhone } = req.body;

    const job = await Job.findByPk(req.params.id);

    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }

    // Update job
    await job.update({
      title,
      salary,
      location,
      description,
      contact_name: contactName,
      contact_phone: contactPhone
    });

    const updatedJob = await Job.findByPk(job.id, {
      include: [{
        model: User,
        as: 'creator',
        attributes: ['id', 'first_name', 'last_name', 'avatar_url']
      }]
    });

    res.json({
      id: updatedJob.id,
      title: updatedJob.title,
      salary: updatedJob.salary,
      location: updatedJob.location,
      description: updatedJob.description,
      contactName: updatedJob.contact_name,
      contactPhone: updatedJob.contact_phone,
      date: updatedJob.created_at,
      creator: updatedJob.creator ? {
        id: updatedJob.creator.id,
        name: `${updatedJob.creator.first_name} ${updatedJob.creator.last_name}`,
        avatarUrl: updatedJob.creator.avatar_url
      } : null
    });
  } catch (error) {
    console.error('Update job error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   DELETE /api/jobs/:id
// @desc    Delete a job
// @access  Private (Admin only)
router.delete('/:id', authenticate, isAdmin, async (req, res) => {
  try {
    const job = await Job.findByPk(req.params.id);

    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }

    await job.destroy();

    res.json({ message: 'Job removed' });
  } catch (error) {
    console.error('Delete job error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
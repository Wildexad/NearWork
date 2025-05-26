import express from 'express';
import { Application, Job, User } from '../models/index.js';
import { authenticate, isAdmin } from '../middleware/auth.js';

const router = express.Router();

// @route   GET /api/applications
// @desc    Get all applications (admin only)
// @access  Private (Admin only)
router.get('/', authenticate, isAdmin, async (req, res) => {
  try {
    const applications = await Application.findAll({
      include: [
        {
          model: User,
          as: 'applicant',
          attributes: ['id', 'first_name', 'last_name', 'email', 'avatar_url']
        },
        {
          model: Job,
          as: 'job',
          attributes: ['id', 'title', 'salary', 'location']
        }
      ],
      order: [['created_at', 'DESC']]
    });

    res.json(applications.map(app => ({
      id: app.id,
      status: app.status,
      coverLetter: app.cover_letter,
      date: app.created_at,
      applicant: app.applicant ? {
        id: app.applicant.id,
        name: `${app.applicant.first_name} ${app.applicant.last_name}`,
        email: app.applicant.email,
        avatarUrl: app.applicant.avatar_url
      } : null,
      job: app.job ? {
        id: app.job.id,
        title: app.job.title,
        salary: app.job.salary,
        location: app.job.location
      } : null
    })));
  } catch (error) {
    console.error('Get applications error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/applications/user
// @desc    Get user's applications
// @access  Private
router.get('/user', authenticate, async (req, res) => {
  try {
    const applications = await Application.findAll({
      where: { user_id: req.user.id },
      include: [{
        model: Job,
        as: 'job',
        attributes: ['id', 'title', 'salary', 'location'],
        include: [{
          model: User,
          as: 'creator',
          attributes: ['id', 'first_name', 'last_name']
        }]
      }],
      order: [['created_at', 'DESC']]
    });

    res.json(applications.map(app => ({
      id: app.id,
      status: app.status,
      coverLetter: app.cover_letter,
      date: app.created_at,
      job: app.job ? {
        id: app.job.id,
        title: app.job.title,
        salary: app.job.salary,
        location: app.job.location,
        company: app.job.creator ? `${app.job.creator.first_name} ${app.job.creator.last_name}` : null
      } : null
    })));
  } catch (error) {
    console.error('Get user applications error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/applications/:id
// @desc    Get application by ID
// @access  Private (Owner or Admin)
router.get('/:id', authenticate, async (req, res) => {
  try {
    const application = await Application.findByPk(req.params.id, {
      include: [
        {
          model: User,
          as: 'applicant',
          attributes: ['id', 'first_name', 'last_name', 'email', 'avatar_url']
        },
        {
          model: Job,
          as: 'job',
          attributes: ['id', 'title', 'salary', 'location', 'description', 'contact_name', 'contact_phone'],
          include: [{
            model: User,
            as: 'creator',
            attributes: ['id', 'first_name', 'last_name']
          }]
        }
      ]
    });

    if (!application) {
      return res.status(404).json({ message: 'Application not found' });
    }

    // Check if user is admin or the applicant
    if (req.user.role !== 'admin' && application.user_id !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    res.json({
      id: application.id,
      status: application.status,
      coverLetter: application.cover_letter,
      date: application.created_at,
      applicant: application.applicant ? {
        id: application.applicant.id,
        name: `${application.applicant.first_name} ${application.applicant.last_name}`,
        email: application.applicant.email,
        avatarUrl: application.applicant.avatar_url
      } : null,
      job: application.job ? {
        id: application.job.id,
        title: application.job.title,
        salary: application.job.salary,
        location: application.job.location,
        description: application.job.description,
        contactName: application.job.contact_name,
        contactPhone: application.job.contact_phone,
        company: application.job.creator ? `${application.job.creator.first_name} ${application.job.creator.last_name}` : null
      } : null
    });
  } catch (error) {
    console.error('Get application error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   POST /api/applications
// @desc    Create a new application
// @access  Private
router.post('/', authenticate, async (req, res) => {
  try {
    const { jobId, coverLetter } = req.body;

    // Check if job exists
    const job = await Job.findByPk(jobId);
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }

    // Check if user already applied for this job
    const existingApplication = await Application.findOne({
      where: {
        user_id: req.user.id,
        job_id: jobId
      }
    });

    if (existingApplication) {
      return res.status(400).json({ message: 'You have already applied for this job' });
    }

    // Create new application
    const application = await Application.create({
      user_id: req.user.id,
      job_id: jobId,
      cover_letter: coverLetter,
      status: 'pending'
    });

    const newApplication = await Application.findByPk(application.id, {
      include: [{
        model: Job,
        as: 'job',
        attributes: ['id', 'title', 'salary', 'location'],
        include: [{
          model: User,
          as: 'creator',
          attributes: ['id', 'first_name', 'last_name']
        }]
      }]
    });

    res.status(201).json({
      id: newApplication.id,
      status: newApplication.status,
      coverLetter: newApplication.cover_letter,
      date: newApplication.created_at,
      job: newApplication.job ? {
        id: newApplication.job.id,
        title: newApplication.job.title,
        salary: newApplication.job.salary,
        location: newApplication.job.location,
        company: newApplication.job.creator ? `${newApplication.job.creator.first_name} ${newApplication.job.creator.last_name}` : null
      } : null
    });
  } catch (error) {
    console.error('Create application error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   PUT /api/applications/:id/status
// @desc    Update application status (admin only)
// @access  Private (Admin only)
router.put('/:id/status', authenticate, isAdmin, async (req, res) => {
  try {
    const { status } = req.body;

    // Validate status
    const validStatuses = ['pending', 'reviewed', 'accepted', 'rejected'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }

    const application = await Application.findByPk(req.params.id);

    if (!application) {
      return res.status(404).json({ message: 'Application not found' });
    }

    // Update application status
    await application.update({ status });

    res.json({ id: application.id, status: application.status });
  } catch (error) {
    console.error('Update application status error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   DELETE /api/applications/:id
// @desc    Delete an application
// @access  Private (Owner or Admin)
router.delete('/:id', authenticate, async (req, res) => {
  try {
    const application = await Application.findByPk(req.params.id);

    if (!application) {
      return res.status(404).json({ message: 'Application not found' });
    }

    // Check if user is admin or the applicant
    if (req.user.role !== 'admin' && application.user_id !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    await application.destroy();

    res.json({ message: 'Application removed' });
  } catch (error) {
    console.error('Delete application error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
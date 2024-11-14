const express = require('express');
const router = express.Router();
const teamController = require('../controllers/teamController');
const authenticateJWT = require('../middlewares/authMiddleware');

// Route to create a new team
router.post('/', authenticateJWT, teamController.createTeam);

// Route to add members to a team
router.put('/:teamId/add-members', authenticateJWT, teamController.addMembers);

// Route to remove members from a team
router.put('/:teamId/remove-members', authenticateJWT, teamController.removeMembers);

// Route to update a member's role in the team
router.put('/:teamId/members/:memberId/role', authenticateJWT, teamController.updateMemberRole);

// Route to get team details
router.get('/:teamId', authenticateJWT, teamController.getTeamDetails);

module.exports = router;
const Team = require('../models/Team'); 

const rbacMiddleware = (roles) => async (req, res, next) => {
    try {
        const userId = req.user.userId; 
        const teamId = req.body.team || req.params.teamId; 

        if (!teamId) {
            return res.status(400).send('Team ID not specified');
        }

        // Fetch the team from the database to check roles
        const team = await Team.findById(teamId);
        if (!team) {
            return res.status(404).send('Team not found');
        }

        // Find the user's membership in this team
        const member = team.members.find((m) => m.user.toString() === userId);
        if (!member) {
            return res.status(403).send('User not part of the team');
        }

        // Check if the user’s role in this team matches the required roles
        if (!roles.includes(member.role)) {
            return res.status(403).send('Access forbidden');
        }

        next();
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal server error');
    }
};

module.exports = rbacMiddleware;

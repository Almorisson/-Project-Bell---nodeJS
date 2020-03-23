const userEndpoints = {
	users: {
		'GET /api/v1/docs/users': 'API docs for users',
		'GET /api/v1/users/': 'Get all users',
		'GET /api/v1/users/:sound_id': 'Login a user',
		'GET /api/v1/users/:sound_id': 'Logout a user',
		'POST /api/v1/users/': 'Register a new user',
		'PUT /api/v1/sounds/:sound_id': 'Update a user profile by its id',
		'DELETE /api/v1/sounds/:sound_id': 'Delete a single user by its id'
	}
};

module.exports = userEndpoints;

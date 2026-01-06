const authService = require('../service/authService');

exports.register = async (req, res) => {
  try {
    const { username, email, password, role } = req.body;
    const user = await authService.registerUser({ username, email, password, role });
    res.status(201).json({ message: 'Utilisateur créé', user });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const result = await authService.loginUser({ email, password });
    res.json({ message: 'Connexion réussie', user: result.user, token: result.token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

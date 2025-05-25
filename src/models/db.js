// Simulated database operations using localStorage
const hashPassword = async (password) => {
  // In a real app, use a proper hashing library
  return btoa(password);
};

const comparePasswords = async (hashedPassword, plainPassword) => {
  return hashedPassword === btoa(plainPassword);
};

export class UserModel {
  static async findByEmail(email) {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    return users.find(user => user.email === email);
  }

  static async validatePassword(user, password) {
    return await comparePasswords(user.password, password);
  }

  static async create({ email, password, firstName, lastName, avatarUrl }) {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    
    const hashedPassword = await hashPassword(password);
    
    const newUser = {
      id: Date.now(),
      email,
      password: hashedPassword,
      first_name: firstName,
      last_name: lastName,
      avatar_url: avatarUrl,
      role: 'user',
      created_at: new Date().toISOString()
    };

    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));

    const { password: _, ...userWithoutPassword } = newUser;
    return userWithoutPassword;
  }
}
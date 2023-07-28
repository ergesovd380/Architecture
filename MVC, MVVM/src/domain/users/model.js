let users = [
  {id: '1', username: 'Dovlet', age: 22}
]

module.exports = {
  create: ({username, age}) => {
    const newUser = {
      username,
      age,
      id: String(Date.now())
    }

    if(!users.find(user => user.username === users)) {
      users.push(newUser);
    } else {
      throw new Error('Пользователь уже существует');
    }

    return newUser;
  },
  removeById: ({id}) => {},
  removeByUsername: ({username}) => {},
  getAll: () => {
    return users;
  },
  getById: ({id}) => {},
}

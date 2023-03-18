type User = {
  id: number;
};

export default class MockRepository {
  users: { [key: number]: User } = {};
  constructor() {
    this.users = {};
  }

  set(user: User) {
    this.users[user.id] = user;
  }

  get(id: number) {
    return this.users[id];
  }
}

export interface CourseSummary {
  id: string;
  name: string;
  uni: string;
  rating: number;
}

export default class Client {
  static token?: string;

  static setToken(token: string) {
    this.token = token;
  }

  static clearToken() {
    delete this.token;
  }
}
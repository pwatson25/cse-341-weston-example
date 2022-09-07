class AuthenticationError extends Error {
  constructor(message: string) {
    super(`Authentication Error: ${message}`);
  }
}

export default AuthenticationError;

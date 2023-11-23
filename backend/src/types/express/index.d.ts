// Extend the Express namespace with custom type declarations

// The 'declare namespace Express' syntax is used to extend the existing 'Express' namespace.
// This namespace is defined by the Express.js typings, and we are adding additional types to it.
declare namespace Express {
  // Extending the 'Request' interface which is part of the Express namespace.
  interface Request {
    // Adding an optional 'user' and role properties to the Express request object.
    // This is typically used for storing user information after successful authentication.
    user?: {
      userId: string;
    };
    role?: {
      role: string;
    };
  }
}

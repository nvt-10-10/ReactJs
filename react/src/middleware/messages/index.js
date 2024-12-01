// src/middleware/messages/index.js

import { auth } from "./auth.message";
import { quote } from "./quote.message";
import { user } from "./user.message";

const messages = {
  auth: auth,
  quote: quote,
  user: user,
};

export default messages;

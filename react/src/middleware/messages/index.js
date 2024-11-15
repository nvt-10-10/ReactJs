// src/middleware/messages/index.js

import { quote } from "./quote.message";
import { user } from "./user.message";

const messages = {
  quote: quote,
  user: user,
};

export default messages;

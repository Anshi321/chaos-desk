import { health } from '../server/handlers.js';

export default function handler(_req, res) {
  res.status(200).json(health());
}

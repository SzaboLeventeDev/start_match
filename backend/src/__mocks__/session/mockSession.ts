import { v4 as uuidv4 } from 'uuid';
import { SessionAttributes } from '../../models/session';

const generatedUUID = uuidv4();

export const mockSession: SessionAttributes = {
  sessionId: generatedUUID,
  data: {},
  expires: new Date('2024.05.10'),
  get() {
    return {
      sessionId: generatedUUID,
      data: {},
      expires: new Date('2024.05.10'),
    };
  },
};

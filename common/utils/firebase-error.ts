import { FirebaseError } from 'firebase/app';

export default function getErrorMessage(error: FirebaseError) {
  const msgMap: Record<string, string> = {
    'auth/invalid-email': 'Invalid email',
    'auth/user-not-found': 'User not found',
    'auth/wrong-password': 'Wrong password',
    'auth/weak-password': 'Weak bitch-ass password',
    'auth/email-already-in-use': 'Email already in use',
    'auth/account-exists-with-different-credential':
      'Account exists with different credential',
  };
  return msgMap[error.code] ?? error.code;
}

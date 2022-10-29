import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFaceAngry } from '@fortawesome/free-solid-svg-icons';

export default function Home() {
  return (
    <h1>
      Hello world&nbsp;
      <FontAwesomeIcon icon={faFaceAngry} />
    </h1>
  );
}

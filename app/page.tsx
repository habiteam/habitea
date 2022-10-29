import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFaceAngry } from '@fortawesome/free-solid-svg-icons';
import Button from '../common/components/Button/Button';

export default function Home() {
  return (
    <main>
      <p>Lorem ipsum</p>
      <Button fillType="outline" color="warning">
        Click this bad boi&nbsp;
        <FontAwesomeIcon icon={faFaceAngry}></FontAwesomeIcon>
      </Button>

      <Button fillType="filled" color="primary">
        Click this bad boi&nbsp;
        <FontAwesomeIcon icon={faFaceAngry}></FontAwesomeIcon>
      </Button>

      <Button fillType="filled">
        <FontAwesomeIcon icon={faFaceAngry}></FontAwesomeIcon>
      </Button>
    </main>
  );
}

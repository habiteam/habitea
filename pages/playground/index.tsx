import { faFaceAngry } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from '../../common/components/Button/Button';
import Input from '../../common/components/Input/Input';
import Link from '../../common/components/Link/Link';

export default function Playground() {
  return (
    <>
      <div>
        <h1>Outlined Buttons</h1>
        <Button fillType="outline">
          <FontAwesomeIcon icon={faFaceAngry}></FontAwesomeIcon>
        </Button>

        <Button fillType="outline" color="primary">
          Click this bad boi&nbsp;
          <FontAwesomeIcon icon={faFaceAngry}></FontAwesomeIcon>
        </Button>

        <Button fillType="outline" color="warning">
          Click this bad boi&nbsp;
          <FontAwesomeIcon icon={faFaceAngry}></FontAwesomeIcon>
        </Button>

        <Button fillType="outline" color="danger">
          Click this bad boi&nbsp;
          <FontAwesomeIcon icon={faFaceAngry}></FontAwesomeIcon>
        </Button>

        <Button fillType="outline" color="info">
          Click this bad boi&nbsp;
          <FontAwesomeIcon icon={faFaceAngry}></FontAwesomeIcon>
        </Button>

        <Button fillType="outline" color="success">
          Click this bad boi&nbsp;
          <FontAwesomeIcon icon={faFaceAngry}></FontAwesomeIcon>
        </Button>
      </div>

      <div>
        <h1>Filled Buttons</h1>
        <Button fillType="filled">
          <FontAwesomeIcon icon={faFaceAngry}></FontAwesomeIcon>
        </Button>

        <Button fillType="filled" color="primary">
          Click this bad boi&nbsp;
          <FontAwesomeIcon icon={faFaceAngry}></FontAwesomeIcon>
        </Button>

        <Button fillType="filled" color="warning">
          Click this bad boi&nbsp;
          <FontAwesomeIcon icon={faFaceAngry}></FontAwesomeIcon>
        </Button>

        <Button fillType="filled" color="danger">
          Click this bad boi&nbsp;
          <FontAwesomeIcon icon={faFaceAngry}></FontAwesomeIcon>
        </Button>

        <Button fillType="filled" color="info">
          Click this bad boi&nbsp;
          <FontAwesomeIcon icon={faFaceAngry}></FontAwesomeIcon>
        </Button>

        <Button fillType="filled" color="success">
          Click this bad boi&nbsp;
          <FontAwesomeIcon icon={faFaceAngry}></FontAwesomeIcon>
        </Button>
      </div>

      <div>
        <h1>Inputs</h1>
        <Input title="Title" id="id"></Input>
        <Input title="Title" id="id" color="primary"></Input>
        <Input title="Title" id="id" color="warning"></Input>
        <Input title="Title" id="id" color="danger"></Input>
        <Input title="Title" id="id" color="info"></Input>
        <Input title="Title" id="id" color="success"></Input>
      </div>

      <div>
        <h1>Links</h1>
        <Link href="app">
          <FontAwesomeIcon icon={faFaceAngry}></FontAwesomeIcon>
        </Link>

        <Link href="app" color="primary">
          Click this bad boi&nbsp;
          <FontAwesomeIcon icon={faFaceAngry}></FontAwesomeIcon>
        </Link>

        <Link href="app" color="warning">
          Click this bad boi&nbsp;
          <FontAwesomeIcon icon={faFaceAngry}></FontAwesomeIcon>
        </Link>

        <Link href="app" color="danger">
          Click this bad boi&nbsp;
          <FontAwesomeIcon icon={faFaceAngry}></FontAwesomeIcon>
        </Link>

        <Link href="app" color="info">
          Click this bad boi&nbsp;
          <FontAwesomeIcon icon={faFaceAngry}></FontAwesomeIcon>
        </Link>

        <Link href="app" color="success">
          Click this bad boi&nbsp;
          <FontAwesomeIcon icon={faFaceAngry}></FontAwesomeIcon>
        </Link>
      </div>
    </>
  );
}

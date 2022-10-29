import { faFaceAngry } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from '../../common/components/Button/Button';
import Input from '../../common/components/Input/Input';

export default function App() {
  return (
    <>
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

      <div>separator</div>
      <Input
        onChange={(text) => {
          console.log(text);
        }}
        title="Title"
        id="id"
      ></Input>
    </>
  );
}

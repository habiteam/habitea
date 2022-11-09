import Input from '../../../common/components/Input/Input';
import Select from '../../../common/components/Select/Select';
import { getAppLayout } from '../../../components/AppLayout/AppLayout';

export default function Dashboard() {
  return (
    <>
      <h2>Dashboard</h2>
      <Input
        onChange={(e) => console.log(e)}
        title={'input'}
        id="input"
      ></Input>
      <br />
      <Select
        title={'select'}
        id="select"
        options={{ o1: 'Option uno', o2: 'Option dos', o3: 'Option tres' }}
      ></Select>
      <br />
      <Input
        onChange={(e) => console.log(e)}
        title={'input'}
        id="input"
      ></Input>
    </>
  );
}

Dashboard.getLayout = getAppLayout;

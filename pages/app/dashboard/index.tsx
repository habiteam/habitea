import Select from '../../../common/components/Select/Select';
import { getAppLayout } from '../../../components/AppLayout/AppLayout';

export default function Dashboard() {
  return (
    <>
      <h2>Dashboard</h2>
      <Select
        title="Fruits"
        id="sd"
        options={{
          1: 'Apples',
          2: 'Bananas',
          3: 'Strawberries',
          4: 'Blueberries',
          5: 'Tomatoes',
          6: 'Dragonfruit',
        }}
      ></Select>
    </>
  );
}

Dashboard.getLayout = getAppLayout;

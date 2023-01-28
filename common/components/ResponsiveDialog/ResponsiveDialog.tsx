import { useAtomValue } from 'jotai';
import { screenWidthAtom, MOBILE_BREAKPOINT } from '@atoms/screen';
import FullscreenDialog from '@commonComponents/FullscreenDialog/FullscreenDialog';
import { DialogPropsSchema } from '@schemas/dialog-props';
import Dialog from '@commonComponents/Dialog/Dialog';

export default function ResponsiveDialog(props: DialogPropsSchema) {
  const width = useAtomValue(screenWidthAtom);

  return (
    <>
      {width < MOBILE_BREAKPOINT ? (
        <FullscreenDialog {...props}></FullscreenDialog>
      ) : (
        <Dialog {...props}></Dialog>
      )}
    </>
  );
}

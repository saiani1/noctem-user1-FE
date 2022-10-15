import { forwardRef } from 'react';

type Props = {
  children: React.ReactNode;
} & Omit<React.PropsWithoutRef<JSX.IntrinsicElements['div']>, 'children'>;

const SheetContent = forwardRef<HTMLDivElement, Props>(
  ({ className, ...props }: Props, ref) => <div {...props} ref={ref} />,
);

export default SheetContent;

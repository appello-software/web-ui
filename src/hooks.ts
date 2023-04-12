import { useAppelloKitComponents } from '~/ctx';

import { UIComponents, UseCombinedPropsWithKitProps } from './types';

export function useCombinedPropsWithKit<
  TName extends keyof UIComponents,
  TProps extends UIComponents[TName],
>({ name, props }: UseCombinedPropsWithKitProps<TName, TProps>): TProps {
  const components = useAppelloKitComponents();

  const componentProps = components[name] ?? {};

  return {
    ...props,
    ...componentProps,
  };
}

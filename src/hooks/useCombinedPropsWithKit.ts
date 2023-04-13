import { useAppelloKitComponents } from '~/ctx';
import { UIComponents } from '~/types';

export interface UseCombinedPropsWithKitProps<
  TName extends keyof UIComponents,
  TProps extends UIComponents[TName],
> {
  name: TName;
  props: TProps;
}

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

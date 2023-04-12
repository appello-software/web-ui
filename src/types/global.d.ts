/* eslint-disable import/no-default-export */
declare module '*.svg' {
  const content: string;
  export default content;
}

declare module '*.jpg' {
  const content: string;
  export default content;
}

declare module '*.png' {
  const content: string;
  export default content;
}

declare module '*.scss' {
  const styles: Record<string, string>;
  export default styles;
}

declare module '*.css' {
  const styles: Record<string, string>;
  export default styles;
}
/* eslint-enable import/no-default-export */

declare type Nullable<T> = T | null;

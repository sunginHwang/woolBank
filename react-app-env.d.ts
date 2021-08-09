/// <reference types="node" />
/// <reference types="react" />
/// <reference types="react-dom" />

declare namespace NodeJS {
  interface ProcessEnv {
    readonly REACT_APP_ENV: 'dev' | 'prod';
  }
}

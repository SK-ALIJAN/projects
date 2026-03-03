declare namespace Api {
  interface Error {
    code: string;
    message: string;
    details?: any;
  }

  interface Response<T = any> {
    success: boolean;
    message: string;
    data?: T;
    error?: Error;
    meta?: Record<string, any>;
  }
}

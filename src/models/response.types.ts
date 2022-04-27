export type MMResponseType<T = unknown> = Readonly<{
  message?: {
    header?: {
      'status_code': number,
      'execute_time': number
    },
    body?: T
  }
}>

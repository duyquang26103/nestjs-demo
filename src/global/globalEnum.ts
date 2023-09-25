export enum HttpStatus {
  CLIENT_ERROR = 400,
  CLIENT_UNAUTHORIZED = 401,
  CLIENT_FORBIDDEN = 403,
  CLIENT_NOT_FOUND = 404,
  CLIENT_TIME_OUT = 408,
  SERVER_ERROR = 500,
  SUCCESS = 200,
}

export enum HttpMessage {
  SERVER_ERROR = 'Server Internal Error',
  SUCCESS = 'Server Response Success',
  NOT_FOUND = 'Server Response Not found!'
}
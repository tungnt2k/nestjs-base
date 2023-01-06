export enum DefaultPaging {
  PAGE = 1,
  LIMIT = 10,
}

export enum TokenType {
  ACCESS_TOKEN = 'ACCESS_TOKEN',
  REFRESH_TOKEN = 'REFRESH_TOKEN',
}

export enum SocketEventName {
  NewNotification = 'new-notification',
  Notification = 'notification',
}

export enum NotifyReceiverType {
  USER = 'user',
  ADMIN = 'admin',
}

export enum NotifyResourceType {
  SYSTEM = 'system',
  NEWS = 'news',
}

export enum NotifyType {
  NEWS = 'news',
  SYSTEM = 'system',
}

export enum QueueJob {
  EXAMPLE_QUEUE_JOB = 'example-queue-job',
}

export enum QueueJobProcessor {
  EXAMPLE = 'example',
}

export const CommonJobConcurrency = 1;

export const saltRounds = 10;

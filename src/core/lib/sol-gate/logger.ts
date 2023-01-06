/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable import/no-extraneous-dependencies */
import chalk from 'chalk';
import figures from 'figures';
import logSymbols from 'log-symbols';
import path from 'path';
import util from 'util';

export interface LoggerInterface {
  warn(...messages: any[]): void;
  info(...messages: any[]): void;
  fatal(...messages: any[]): void;
  error(...messages: any[]): void;
  debug(...messages: any[]): void;
}

export class Logger {
  public static DEFAULT_SCOPE = 'App';

  private scope: string;

  constructor(scope?: string) {
    this.scope = Logger.parsePathToScope(scope || Logger.DEFAULT_SCOPE);
  }

  private static parsePathToScope(filepath: string): string {
    if (filepath.indexOf(path.sep) >= 0) {
      filepath = filepath.replace(process.cwd(), '');
      filepath = filepath.replace(`${path.sep}src${path.sep}`, '\\');
      filepath = filepath.replace(`${path.sep}build${path.sep}`, '');
      filepath = filepath.replace('.ts', '');
      filepath = filepath.replace('.js', '');
      filepath = filepath.replace(path.sep, ':');
    }
    return filepath;
  }

  private log(level: string, messages: any[]): void {
    const formatted = messages.map(function (message) {
      if (typeof message === 'object') {
        return util.inspect(message, {
          depth: null,
        });
      }
      return message;
    });
    console.log(this.formatNamespace(level), this.formatScope(), ...formatted);
  }

  public debug(...messages: any[]) {
    this.log('debug', messages);
  }

  public info(...messages: any[]) {
    this.log('info', messages);
  }

  public warn(...messages: any[]) {
    this.log('warn', messages);
  }

  public error(...messages: any[]) {
    this.log('error', messages);
  }

  public fatal(...messages: any[]) {
    this.log('error', messages);
  }

  private formatScope(): string {
    return `[${this.scope}] :: `;
  }

  private formatNamespace(level: string): string {
    switch (level) {
      case 'info':
        return logSymbols.info;
      case 'warn':
        return logSymbols.warning;
      case 'error':
        return logSymbols.error;
      case 'fatal':
        return logSymbols.error;
      case 'debug':
        return chalk.grey(figures.pointerSmall);
      default:
        return logSymbols.info;
    }
  }
}

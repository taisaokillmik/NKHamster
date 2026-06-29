// Logger utility for error tracking and debugging
// This can be extended to integrate with services like Sentry

export type LogLevel = 'info' | 'warn' | 'error' | 'debug';

interface LogEntry {
  level: LogLevel;
  message: string;
  timestamp: string;
  context?: Record<string, any>;
  error?: {
    name: string;
    message: string;
    stack?: string;
  };
}

class Logger {
  private isDevelopment = process.env.NODE_ENV === 'development';

  private formatLog(entry: LogEntry): string {
    const { level, message, timestamp, context, error } = entry;
    const contextStr = context ? ` ${JSON.stringify(context)}` : '';
    const errorStr = error ? ` | Error: ${error.name} - ${error.message}` : '';
    return `[${timestamp}] [${level.toUpperCase()}] ${message}${contextStr}${errorStr}`;
  }

  private log(level: LogLevel, message: string, context?: Record<string, any>, error?: Error) {
    const entry: LogEntry = {
      level,
      message,
      timestamp: new Date().toISOString(),
      context,
      error: error ? {
        name: error.name,
        message: error.message,
        stack: this.isDevelopment ? error.stack : undefined,
      } : undefined,
    };

    const formatted = this.formatLog(entry);

    switch (level) {
      case 'error':
        console.error(formatted);
        break;
      case 'warn':
        console.warn(formatted);
        break;
      case 'debug':
        if (this.isDevelopment) {
          console.debug(formatted);
        }
        break;
      case 'info':
      default:
        console.log(formatted);
    }

    // TODO: Send to external logging service (Sentry, LogRocket, etc.)
    // if (process.env.SENTRY_DSN) {
    //   Sentry.captureException(error || message);
    // }
  }

  info(message: string, context?: Record<string, any>) {
    this.log('info', message, context);
  }

  warn(message: string, context?: Record<string, any>) {
    this.log('warn', message, context);
  }

  error(message: string, error?: Error, context?: Record<string, any>) {
    this.log('error', message, context, error);
  }

  debug(message: string, context?: Record<string, any>) {
    this.log('debug', message, context);
  }

  // Convenience method for API errors
  apiError(endpoint: string, error: Error, context?: Record<string, any>) {
    this.error(`API Error: ${endpoint}`, error, { ...context, endpoint });
  }

  // Convenience method for database errors
  dbError(operation: string, error: Error, context?: Record<string, any>) {
    this.error(`Database Error: ${operation}`, error, { ...context, operation });
  }
}

export const logger = new Logger();

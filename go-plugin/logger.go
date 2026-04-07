package plugin

import (
	"fmt"
	"log"
)

// defaultLogger provides a simple default implementation of the Logger interface
type defaultLogger struct {
	prefix string
}

// NewDefaultLogger creates a default logger implementation
func NewDefaultLogger(prefix string) Logger {
	return &defaultLogger{prefix: prefix}
}

// Debug logs a debug message
func (l *defaultLogger) Debug(msg string, keysAndValues ...interface{}) {
	l.log("DEBUG", msg, keysAndValues...)
}

// Info logs an info message
func (l *defaultLogger) Info(msg string, keysAndValues ...interface{}) {
	l.log("INFO", msg, keysAndValues...)
}

// Warn logs a warning message
func (l *defaultLogger) Warn(msg string, keysAndValues ...interface{}) {
	l.log("WARN", msg, keysAndValues...)
}

// Error logs an error message
func (l *defaultLogger) Error(msg string, keysAndValues ...interface{}) {
	l.log("ERROR", msg, keysAndValues...)
}

// With returns a new logger with additional key-value pairs
func (l *defaultLogger) With(keysAndValues ...interface{}) Logger {
	// For simplicity, just return the same logger
	// A more sophisticated implementation would store the key-value pairs
	return l
}

// log is a helper method that formats and logs messages
func (l *defaultLogger) log(level, msg string, keysAndValues ...interface{}) {
	var kvStr string
	if len(keysAndValues) > 0 {
		kvStr = fmt.Sprintf(" %v", keysAndValues)
	}

	logMsg := fmt.Sprintf("[%s] %s%s%s", level, l.prefix, msg, kvStr)
	log.Println(logMsg)
}
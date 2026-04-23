import logging
import logging.config
import os

# ---------------------------------------------------------------------
# Ensure Log Directory Exists
# ---------------------------------------------------------------------
# This creates the log directory if it doesn't exist
# Ensures that file-based loggers don't fail on startup
log_directory = '/var/log/solarina/backend/django'
if not os.path.exists(log_directory):
    os.makedirs(log_directory, exist_ok=True)

# ---------------------------------------------------------------------
# Logging Configuration Dictionary
# ---------------------------------------------------------------------
LOGGING = {
    'version': 1,
    'disable_existing_loggers': False,  # Keep Django's default loggers active

    # ---------------------
    # Formatters
    # ---------------------
    'formatters': {
        'standard': {
            'format': '%(asctime)s - %(levelname)s - %(message)s'
        },
    },

    # ---------------------
    # Handlers
    # ---------------------
    'handlers': {
        'file': {  # Logs to a file
            'level': 'INFO',
            'class': 'logging.FileHandler',
            'filename': os.path.join(log_directory, 'solarina_view.logs'),
            'formatter': 'standard',
        },
        'console': {  # Logs to stdout (console)
            'level': 'DEBUG',
            'class': 'logging.StreamHandler',
            'formatter': 'standard',
        },
    },

    # ---------------------
    # Loggers
    # ---------------------
    'loggers': {
        '': {  # Root logger (affects all loggers in Django & project)
            'handlers': ['file', 'console'],
            'level': 'INFO',
            'propagate': True,
        },
    }
}

# ---------------------------------------------------------------------
# Apply Logging Configuration
# ---------------------------------------------------------------------
logging.config.dictConfig(LOGGING)

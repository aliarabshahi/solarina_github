# ---------------------------------------------------------------------
# Base Image
# ---------------------------------------------------------------------
# Using official slim Python 3.9 on Debian Bullseye
# Slim variant keeps image size smaller by excluding dev tools
FROM docker.arvancloud.ir/python:3.9-slim-bullseye

# ---------------------------------------------------------------------
# Environment Variables
# ---------------------------------------------------------------------
# Prevent Python from generating .pyc files
ENV PYTHONDONTWRITEBYTECODE=1
# Force stdout/stderr to flush immediately (no buffering)
ENV PYTHONUNBUFFERED=1

# ---------------------------------------------------------------------
# Working Directory Setup
# ---------------------------------------------------------------------
# Create /opt/solarina as main working directory
WORKDIR /opt/solarina

# ---------------------------------------------------------------------
# System Dependencies Installation
# ---------------------------------------------------------------------
# Install system-level packages listed in requirements.apt
# Clean APT cache afterward to reduce layer size
RUN apt-get update \
    && cat requirements.apt | xargs -I {} apt-get install {} -y \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# ---------------------------------------------------------------------
# Python Dependencies Installation
# ---------------------------------------------------------------------
COPY requirements.txt .
RUN pip install --upgrade pip \
    && pip install -r requirements.txt

# ---------------------------------------------------------------------
# Application Code Copy
# ---------------------------------------------------------------------
# Copy Django app source code into container
COPY ./src/ /opt/solarina/src/
COPY gunicorn.py /opt/solarina/src/
COPY gunicorn.py /opt/solarina/

# ---------------------------------------------------------------------
# Switch Working Directory to Source Code Path
# ---------------------------------------------------------------------
WORKDIR /opt/solarina/src

# ---------------------------------------------------------------------
# Collect Static Files During Build
# ---------------------------------------------------------------------
# Ensures static assets are ready to be served by Nginx
RUN python manage.py collectstatic --noinput

# ---------------------------------------------------------------------
# Exposed Port
# ---------------------------------------------------------------------
# This port is for Django development server
# In production, use Gunicorn + Nginx instead
EXPOSE 8000

# ---------------------------------------------------------------------
# Default Container Command
# ---------------------------------------------------------------------
# Starts Django development server listening on all interfaces
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]

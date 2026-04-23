#!/bin/bash

# Set the path to the machines_developement.txt file using CI_PROJECT_DIR environment variable
MACHINES_FILE="${CI_PROJECT_DIR}/cicd/machines_developement.txt"

# Silent setup of SSH keys and config (no output)
{
  # Create .ssh directory if it doesn't exist
  mkdir -p ~/.ssh

  # Write private and public keys from environment variables
  echo "$PRIVATE_KEY" > ~/.ssh/id_rsa
  echo "$PUBLIC_KEY" > ~/.ssh/id_rsa.pub

  # Set proper permissions on SSH keys and directory
  chmod 700 ~/.ssh
  chmod 600 ~/.ssh/id_rsa
  chmod 644 ~/.ssh/id_rsa.pub

  # Start ssh-agent and add private key
  eval "$(ssh-agent -s)" && ssh-add ~/.ssh/id_rsa

  # Generate SSH config file from machines_developement.txt
  # Fields are CSV, columns: Host, User, HostName
  # Add ProxyCommand for hosts other than 'middle'
  awk -F, '/^[^#]/ {
    if ($1 && $2 && $3) {
      print "Host", $1
      print "    HostName", $3
      print "    User", $2
      if ($1 != "middle") print "    ProxyCommand ssh middle -W %h:%p"
      print ""
    }
  }' "$MACHINES_FILE" > ~/.ssh/config

  # Restrict permissions on SSH config file
  chmod 600 ~/.ssh/config
} >/dev/null 2>&1

# Arrays to track hosts by ssh-copy-id success or failure
SUCCESS=()
WRONG_PASS=()
NO_PASS=()

# Loop over all hosts defined in SSH config (skip wildcard *)
for HOST in $(awk '/^Host / && $2 != "*" {print $2}' ~/.ssh/config); do
    # Get the password environment variable for the host by converting - to _
    PASS=$(printenv $(echo "$HOST" | tr '-' '_'))

    if [ -z "$PASS" ]; then
        # No password environment variable found for this host
        NO_PASS+=("$HOST")
        continue
    fi

    # Try to copy SSH key using sshpass and ssh-copy-id with the generated config
    if sshpass -p "$PASS" ssh-copy-id -o StrictHostKeyChecking=no -F ~/.ssh/config "$HOST" >/dev/null 2>&1; then
        SUCCESS+=("$HOST")
    else
        WRONG_PASS+=("$HOST")
    fi
done


exit 0

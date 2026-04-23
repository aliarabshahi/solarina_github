#!/bin/bash

# Silent setup
{
[ -f ~/.ssh/config ] || exit 0  # Exit if no config exists
eval "$(ssh-agent -s)" >/dev/null 2>&1
ssh-add ~/.ssh/id_rsa >/dev/null 2>&1
} >/dev/null 2>&1

# Process hosts
REMOVED=() FAILED_AUTH=() NO_PASS=()
for HOST in $(awk '/^Host / && $2 != "*" {print $2}' ~/.ssh/config); do
    PASS=$(printenv $(echo "$HOST" | tr '-' '_'))
    
    if [ -z "$PASS" ]; then
        NO_PASS+=("$HOST")
        continue
    fi
    
    if sshpass -p "$PASS" ssh -o StrictHostKeyChecking=no -F ~/.ssh/config "$HOST" \
       "grep -vF \"$PUBLIC_KEY\" ~/.ssh/authorized_keys 2>/dev/null > ~/.ssh/authorized_keys.tmp && 
        mv ~/.ssh/authorized_keys.tmp ~/.ssh/authorized_keys" >/dev/null 2>&1; then
        REMOVED+=("$HOST")
    else
        FAILED_AUTH+=("$HOST")
    fi
done


exit 0

# ---------------------------------------------------------------------
# Base Image
# ---------------------------------------------------------------------
# Use the official stable release of Nginx
FROM docker.arvancloud.ir/nginx:stable


# ---------------------------------------------------------------------
# Step 1: Generate Self-Signed SSL Certificate & Key
# ---------------------------------------------------------------------
# This is suitable for development or internal testing.
# In production, replace with a valid CA-signed SSL certificate.
RUN openssl req \
    -x509 \
    -nodes \
    -days 3650 \
    -subj "/C=CA/ST=QC/O=Solarina, Inc./CN=solarina.solarina.ir" \
    -addext "subjectAltName=DNS:solarina.solarina.ir" \
    -newkey rsa:2048 \
    -out /etc/ssl/certs/nginx-selfsigned.crt \
    -keyout /etc/ssl/private/nginx-selfsigned.key;

# ---------------------------------------------------------------------
# Step 2: Configure Nginx
# ---------------------------------------------------------------------
# Remove default Nginx configuration
RUN rm /etc/nginx/conf.d/default.conf

# Add our custom Nginx configuration into the container
ADD ./nginx.conf /etc/nginx/conf.d/

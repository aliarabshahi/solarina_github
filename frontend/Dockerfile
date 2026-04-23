# stage: BUILD
FROM docker.arvancloud.ir/node:22-alpine AS builder

WORKDIR /app

# Copy package.json and lock file from src
COPY src/package*.json ./

RUN npm ci

# Copy the rest of the source code
COPY src/ ./

# ✅ Skip ESLint for faster production build
ENV NEXT_DISABLE_ESLINT=1
RUN npm run build

# stage: RUN
FROM node:22-alpine AS runner

WORKDIR /app

# Copy built app from builder stage
COPY --from=builder /app ./

EXPOSE 3000
CMD ["npm", "start"]

# =============================================
# Builder Stage - Node.js 22-slim (consistent environment)
# =============================================
FROM node:22-slim AS builder

# Create app directory
WORKDIR /usr/src/app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy application source (Copy from current directory to working directory - /backend --> /usr/src/app)
COPY . .

# =============================================
# Production Stage - Node.js 22-slim
# =============================================
FROM node:22-slim

# Set environment variables
ENV NODE_ENV=production \
    PORT=3000 \
    # Prevent npm update notifications in production
    NPM_CONFIG_UPDATE_NOTIFIER=false

# Install only necessary dependencies
RUN apt-get update && apt-get install -y --no-install-recommends \
    curl \
    # For SSL/TLS support (https requests)
    ca-certificates \ 
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# Create non-root user for security
RUN groupadd -g 1001 appuser && \
    useradd -u 1001 -g appuser -m -s /bin/bash appuser

# Create app directory
WORKDIR /usr/src/app

# Copy only production dependencies from builder stage
COPY --chown=appuser:appuser --from=builder /usr/src/app/package*.json ./
COPY --chown=appuser:appuser --from=builder /usr/src/app/node_modules ./node_modules

# Copy application source from builder stage
COPY --chown=appuser:appuser --from=builder /usr/src/app ./

# Switch to non-root user
USER appuser

# Expose application port
EXPOSE 3000

# Health check configuration
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD curl -f http://localhost:3000/health || exit 1

# Command to run the application
CMD ["node", "src/index.js"]
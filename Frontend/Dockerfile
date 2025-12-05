# ============================
#   Stage 1 — Build Next.js
# ============================
FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# ============================
#   Stage 2 — Run Next.js App
# ============================
FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install --only=production

# Copy compiled build
COPY --from=builder /app/.next ./.next

# Copy application code
COPY . .

EXPOSE 3000

CMD ["npm", "start"]

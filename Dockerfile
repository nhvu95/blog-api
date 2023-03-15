FROM node:latest
# Create a working directory
RUN mkdir /blog-api
WORKDIR /blog-api
# Copy package.json and package-lock.json files
COPY ./package.json /blog-api/package.json
# Install dependencies
RUN npm install
# Copy source code
COPY . .
RUN npx prisma generate
# Expose ports for both servers
EXPOSE 4000
# Start the first server on port 4000
CMD ["npm", "run", "start:prod"]
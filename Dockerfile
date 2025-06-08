# Use official Jekyll image
FROM jekyll/jekyll:4.2.2

# Set working directory
WORKDIR /srv/jekyll

# Copy all files (except those in .dockerignore)
COPY . .

# Install dependencies
RUN bundle install

# Serve the site
CMD ["jekyll", "serve", "--force_polling", "--livereload", "--host", "0.0.0.0"]

# Use Ruby base image for Jekyll
FROM ruby:3.2

# Install Jekyll and Bundler
RUN gem install jekyll bundler

# Set working directory inside the container
WORKDIR /srv/jekyll

# Copy Gemfile (if exists) first to cache bundle install
COPY Gemfile Gemfile.lock* ./

# Install gems
RUN bundle install || true

# Copy the rest of the site
COPY . .

# Expose the Jekyll server port
EXPOSE 4000

# Run Jekyll server
CMD ["bundle", "exec", "jekyll", "serve", "--host", "0.0.0.0", "--watch", "--force_polling"]

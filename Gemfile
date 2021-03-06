source 'https://rubygems.org'
ruby "2.3.0"

# Bundle edge Rails instead: gem 'rails', github: 'rails/rails'
gem 'rails', '4.2.4'
# Use postgresql as the database for Active Record
gem 'pg'
# Use SCSS for stylesheets
gem 'sass-rails', '~> 5.0'
# Add cross browser prefixes
gem "autoprefixer-rails"
# Use Uglifier as compressor for JavaScript assets
gem 'uglifier', '>= 1.3.0'
# Use CoffeeScript for .coffee assets and views
gem 'coffee-rails', '~> 4.1.0'
# See https://github.com/rails/execjs#readme for more supported runtimes
# gem 'therubyracer', platforms: :ruby

# Use jquery as the JavaScript library
gem 'jquery-rails'
gem 'jquery-ui-rails'

# Build JSON APIs with ease. Read more: https://github.com/rails/jbuilder
gem 'jbuilder', '~> 2.0'
# bundle exec rake doc:rails generates the API under doc/api.
gem 'sdoc', '~> 0.4.0', group: :doc

gem 'bootstrap-sass', '3.2.0.2'
gem 'bootstrap_form'

gem 'unread'

# time and locale support
gem 'momentjs-rails', '>= 2.9.0'
gem 'local_time'
gem 'bootstrap3-datetimepicker-rails'


# User account management
gem 'devise'
gem 'omniauth'
gem 'omniauth-google-oauth2'
gem 'omniauth-facebook'
gem 'omniauth-linkedin'

# error handling
gem 'gaffe'

# error monitoring
gem 'rollbar'

# real time chat features
gem 'private_pub'
gem 'thin'

# JavaScript utility library
gem 'lodash-rails'

# Google map based geolocation support
gem 'geocoder'

#production web server
gem 'puma'

#multi process handling
gem 'foreman'

source 'https://rails-assets.org' do
  gem 'rails-assets-tether', '>= 1.1.0'
end
gem "font-awesome-rails"

gem 'react-rails', github: 'reactjs/react-rails', branch: 'master'

# Use ActiveModel has_secure_password
gem 'bcrypt', '~> 3.1.7'

gem 'figaro'

#image handling
gem 'paperclip'
gem 'aws-sdk', '< 2.0'
gem 'faker'


group :development, :test do
  # Call 'byebug' anywhere in the code to stop execution and get a debugger console
  gem 'byebug'
  gem 'pry'
end

group :development do
  gem 'capistrano', '3.4.1'
  gem 'capistrano3-puma'
  gem 'capistrano-rails', require: false
  gem 'capistrano-bundler', require: false
  gem 'capistrano-rvm'


  # Access an IRB console on exception pages or by using <%= console %> in views
  gem 'web-console', '~> 2.0'

  # Spring speeds up development by keeping your application running in the background. Read more: https://github.com/rails/spring
  gem 'spring'
end

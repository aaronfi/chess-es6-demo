# This file is used by Rack-based servers to start the application.

require ::File.expand_path('../config/environment',  __FILE__)

# This enables gzipping of assets served up via the Rack server on Heroku
use Rack::Deflater

run Rails.application


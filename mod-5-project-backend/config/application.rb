require_relative 'boot'

require 'rails/all'

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

module Mod5ProjectBackend
  class Application < Rails::Application
    # Initialize configuration defaults for originally generated Rails version.

    
  end
end

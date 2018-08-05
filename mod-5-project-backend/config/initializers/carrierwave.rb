CarrierWave.configure do |config|
  config.fog_provider = 'fog/google'                        # required
  config.fog_credentials = {
    provider:                         'Google',
    google_storage_access_key_id:     'GOOGMCCZYTER4NJ6OFXSFO2F',
    google_storage_secret_access_key: 'lxPi6C8cPFg+qrI8tIzj4aGkKBJkl/tQx0I5qNwY	'
  }
  config.fog_directory = 'Mod 5'
end

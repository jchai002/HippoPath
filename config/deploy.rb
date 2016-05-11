# config valid only for current version of Capistrano
lock '3.4.0'

set :application, 'HippoPath'
set :repo_url, 'git@github.com:jchai002/HippoPath.git'
set :branch, :master
set :deploy_to, '/home/deploy/HippoPath'
set :pty, true
set :linked_files, fetch(:linked_files, []).push('config/application.yml', 'config/database.yml', 'config/secrets.yml')
set :linked_dirs, fetch(:linked_dirs, []).push('log', 'tmp/pids', 'tmp/cache', 'tmp/sockets', 'vendor/bundle', 'public/system')
set :keep_releases, 3
set :rvm_type, :user
set :rvm_ruby_version, 'ruby-2.3.0' # Edit this if you are using MRI Ruby
set :assets_roles, [:web, :app]
set :puma_rackup, -> { File.join(current_path, 'config.ru') }
set :puma_state, "#{shared_path}/tmp/pids/puma.state"
set :puma_pid, "#{shared_path}/tmp/pids/puma.pid"
set :puma_bind, "unix://#{shared_path}/tmp/sockets/puma.sock"    #accept array for multi-bind
set :puma_conf, "#{shared_path}/puma.rb"
set :puma_access_log, "#{shared_path}/log/puma_error.log"
set :puma_error_log, "#{shared_path}/log/puma_access.log"
set :puma_role, :app
set :puma_env, fetch(:rack_env, fetch(:rails_env, 'production'))
set :puma_threads, [0, 8]
set :puma_workers, 0
set :puma_worker_timeout, nil
set :puma_init_active_record, true
set :puma_preload_app, false
set :ssh_options, {:forward_agent => true}

namespace :foreman do
  set :foreman_application, "#{application}-#{rails_env}"
  desc "Export the Procfile to Ubuntu's upstart scripts"
  task :export, roles: :app do
    run "echo PATH=\"$PATH\"\n > #{current_path}/.env"
    run "echo RAILS_ENV=#{rails_env}\n >> #{current_path}/.env"
    run "echo RACK_ENV=#{rails_env}\n >> #{current_path}/.env"
    run "cd #{current_path} && #{sudo} bundle exec foreman export upstart /etc/init -a #{foreman_application} -u #{user} -l #{shared_path}/log -d #{current_path}"
  end

  [:start, :stop, :restart].each do |action|
    desc "#{action} the foreman processes"
    task action, :roles => :app do
      run "#{sudo} service #{foreman_application} #{action}"
    end
    after "deploy:#{action}", "foreman:#{action}"
  end
end

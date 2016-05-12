unless ENV['NOSOCK']
  Thread.new do
    system("RAILS_ENV=production bundle exec rackup private_pub.ru -s thin -E production -p 9292")
  end
end

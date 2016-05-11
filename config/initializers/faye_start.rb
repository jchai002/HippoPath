Thread.new do
  system("bundle exec rackup private_pub.ru -s thin -E production -p 9292")
end

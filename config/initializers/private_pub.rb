Thread.new do
  system("rackup private_pub.ru -s thin -E production -o 0.0.0.0 -p 8080")
end

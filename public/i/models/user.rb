class User
  include DataMapper::Resource
  property :id, Serial, :key => true
  property :login, String, :nullable => false, :unique => true, :format => /\w/
  property :fullname, String
  property :email, String, :format => :email_address, :unique => true, :length => (6..40), :nullable => false
  property :hashed_password, String
  property :salt, String, :protected => true, :nullable => false
  property :created_at, DateTime
  property :last_visit_at, DateTime
  
  attr_accessor :password, :password_confirmation
  validates_present :login, :if => Proc.new {|u| u.new_record?}
  validates_present :password, :if => Proc.new {|u| u.new_record?}
  validates_present :password_confirmation, :if => Proc.new {|u| u.new_record?}
  validates_is_confirmed :password, :if => Proc.new {|u| u.new_record?}
  
  def self.authenticate(login_or_email, pass)
    u = login_or_email =~ /@/ ? first(:email => login_or_email) : first(:login => login_or_email)
    return nil if u.nil?
    return u if User.encrypt(pass, u.salt) == u.hashed_password
    nil
  end

  def password=(pass)
    @password = pass
    self.salt = User.random_string(10) if !self.salt
    self.hashed_password = User.encrypt(@password, self.salt)
  end
  
  def render
    :dashboard
  end
  

  protected
  def self.encrypt(pass, salt)
    Digest::SHA1.hexdigest(pass+salt)
  end

  def self.random_string(len)
    #generate a random password consisting of strings and digits
    chars = ("a".."z").to_a + ("A".."Z").to_a + ("0".."9").to_a
    newpass = ""
    1.upto(len) { |i| newpass << chars[rand(chars.size-1)] }
    return newpass
  end
end
class ChatRoom < ApplicationRecord
  before_validation :format_name
  # can also use dependent: :destroy, however it will execute one query per object
  has_many :chat_messages, dependent: :delete_all

  NAME_REGEX = /\A[a-z0-9\-\_]+\z/i
  validates :name,
            uniqueness: { case_sensitive: false },
            format: { with: NAME_REGEX },
            length: { maximum: 20 }

  scope :search, -> (query) { where("name LIKE ?", "%#{query}%") if query.present? }

  private
  def format_name
    name.downcase!
    name.gsub!(/\s+/, ' ')
    name.gsub!(' ', '-')

    name.gsub!(/[\-]+/, '-')
    name.gsub!(/[\_]+/, '_')
    name.gsub!(/\A[\-\_]+/, '')
    name.gsub!(/[\-\_]+\z/, '')

    name.gsub!(/[^a-z0-9\-\_]+/, '')
  end
end

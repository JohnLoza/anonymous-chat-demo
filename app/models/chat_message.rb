class ChatMessage < ApplicationRecord
  belongs_to :chat_room

  validates :from, presence: true
  validates :body, presence: true, length: { maximum: 250 }
end

class CreateChatMessages < ActiveRecord::Migration[6.1]
  def change
    create_table :chat_messages do |t|
      t.string :from
      t.string :body

      t.timestamps
    end
  end
end

class CreateBoards < ActiveRecord::Migration[5.0]
  def change
    create_table :boards do |t|
      t.integer  "user_id"
      t.date     "range_start"
      t.date     "range_end"
      t.string   "title"

      t.timestamps
    end
  end
end

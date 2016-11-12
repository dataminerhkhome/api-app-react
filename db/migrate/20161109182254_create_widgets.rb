class CreateWidgets < ActiveRecord::Migration[5.0]
  def change
    create_table :widgets do |t|
      t.integer  "width"
      t.integer  "height"
      t.string   "title"
      t.integer  "index"
      t.integer  "board_id"
      t.string   "metric"
      t.string   "metric_group_by"
      t.string   "dimension1"
      t.string   "dimension2"
      t.string   "chart_type"
      t.string   "end_point"
      t.string   "template"

      t.timestamps
    end
  end
end

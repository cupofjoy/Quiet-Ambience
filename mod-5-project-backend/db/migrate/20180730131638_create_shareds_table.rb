class CreateSharedsTable < ActiveRecord::Migration[5.2]
  def change
    create_table :shareds do |t|
      t.string :url
      t.integer :likes
      t.references :user
      t.references :photo
    end
  end
end

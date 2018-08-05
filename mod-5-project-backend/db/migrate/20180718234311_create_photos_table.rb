class CreatePhotosTable < ActiveRecord::Migration[5.2]
  def change
    create_table :photos do |t|
      t.string :name
      t.string :attachment
      t.string :tags
      t.string :colors
      t.string :expressions
      t.boolean :favorite
      t.boolean :shared
      t.references :user
    end
  end
end

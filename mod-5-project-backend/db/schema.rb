# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2018_07_30_131638) do

  create_table "photos", force: :cascade do |t|
    t.string "name"
    t.string "attachment"
    t.string "tags"
    t.string "colors"
    t.string "expressions"
    t.boolean "favorite"
    t.boolean "shared"
    t.integer "user_id"
    t.index ["user_id"], name: "index_photos_on_user_id"
  end

  create_table "shareds", force: :cascade do |t|
    t.string "url"
    t.integer "likes"
    t.integer "user_id"
    t.integer "photo_id"
    t.index ["photo_id"], name: "index_shareds_on_photo_id"
    t.index ["user_id"], name: "index_shareds_on_user_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "username"
    t.string "password_digest"
    t.string "token"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

end

# encoding: UTF-8
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

ActiveRecord::Schema.define(version: 20160404042620) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "addresses", force: :cascade do |t|
    t.boolean  "on_campus",                      default: false
    t.string   "street",            limit: 1000, default: ""
    t.string   "city",              limit: 100,  default: ""
    t.string   "state",             limit: 20,   default: ""
    t.string   "zip",               limit: 20,   default: ""
    t.string   "apt",               limit: 20,   default: ""
    t.string   "full_address",      limit: 1000, default: ""
    t.float    "longitude"
    t.float    "latitude"
    t.integer  "hospital_id"
    t.integer  "school_id"
    t.boolean  "valid_address",                  default: false
    t.boolean  "browser_generated",              default: false
    t.datetime "created_at",                                     null: false
    t.datetime "updated_at",                                     null: false
  end

  create_table "conversations", force: :cascade do |t|
    t.integer  "sender_id",    null: false
    t.integer  "recipient_id", null: false
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "conversations", ["recipient_id"], name: "index_conversations_on_recipient_id", using: :btree
  add_index "conversations", ["sender_id"], name: "index_conversations_on_sender_id", using: :btree

  create_table "hospitals", force: :cascade do |t|
    t.string   "name",       limit: 100, null: false
    t.datetime "created_at",             null: false
    t.datetime "updated_at",             null: false
  end

  create_table "identities", force: :cascade do |t|
    t.integer  "user_id"
    t.string   "provider"
    t.string   "uid"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_index "identities", ["user_id"], name: "index_identities_on_user_id", using: :btree

  create_table "interviews", force: :cascade do |t|
    t.string   "date",        limit: 20, null: false
    t.string   "time",        limit: 20, null: false
    t.string   "ride_status", limit: 20, null: false
    t.integer  "poster_id"
    t.integer  "saver_id"
    t.integer  "hospital_id"
    t.datetime "created_at",             null: false
    t.datetime "updated_at",             null: false
  end

  create_table "messages", force: :cascade do |t|
    t.integer  "conversation_id"
    t.integer  "sender_id",                     null: false
    t.integer  "recipient_id",                  null: false
    t.string   "body",            limit: 10000, null: false
    t.datetime "created_at",                    null: false
    t.datetime "updated_at",                    null: false
  end

  create_table "read_marks", force: :cascade do |t|
    t.integer  "readable_id"
    t.string   "readable_type", null: false
    t.integer  "reader_id"
    t.string   "reader_type",   null: false
    t.datetime "timestamp"
  end

  add_index "read_marks", ["reader_id", "reader_type", "readable_type", "readable_id"], name: "read_marks_reader_readable_index", using: :btree

  create_table "schools", force: :cascade do |t|
    t.string   "name",       limit: 100, default: "", null: false
    t.datetime "created_at",                          null: false
    t.datetime "updated_at",                          null: false
  end

  create_table "users", force: :cascade do |t|
    t.string   "email"
    t.string   "encrypted_password",     default: "",    null: false
    t.string   "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer  "sign_in_count"
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.inet     "current_sign_in_ip"
    t.inet     "last_sign_in_ip"
    t.string   "confirmation_token"
    t.datetime "confirmed_at"
    t.datetime "confirmation_sent_at"
    t.string   "unconfirmed_email"
    t.string   "gender"
    t.string   "phone"
    t.string   "specialty"
    t.boolean  "chat_muted",             default: false
    t.boolean  "no_warning",             default: false
    t.integer  "address_id"
    t.integer  "school_id"
    t.datetime "created_at",                             null: false
    t.datetime "updated_at",                             null: false
    t.string   "name"
    t.string   "image_file_name"
    t.string   "image_content_type"
    t.integer  "image_file_size"
    t.datetime "image_updated_at"
  end

  add_index "users", ["confirmation_token"], name: "index_users_on_confirmation_token", unique: true, using: :btree
  add_index "users", ["email"], name: "index_users_on_email", unique: true, using: :btree
  add_index "users", ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true, using: :btree

  add_foreign_key "identities", "users"
end

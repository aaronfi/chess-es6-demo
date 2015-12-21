class CreateInitialSchemas < ActiveRecord::Migration
  def change

    enable_extension 'hstore'

    ## Here are all the Rails 4 (ActiveRecord migration) datatypes:
    #
    # :binary
    # :boolean
    # :date
    # :datetime
    # :decimal
    # :float
    # :integer
    # :primary_key
    # :references
    # :string
    # :text
    # :time
    # :timestamp
    #
    # If you use PostgreSQL, you can also take advantage of these:
    #
    # :hstore
    # :json
    # :array
    # :cidr_address
    # :ip_address
    # :mac_address
    #
    # Source: http://api.rubyonrails.org/classes/ActiveRecord/ConnectionAdapters/TableDefinition.html#method-i-column

    # Because you've been manually editing this initial migrations file by hand, instead of creating a new migration
    # file for each change you want to try out, here are the steps you need to take to get your schema changes
    # in this file to actually be applied to the databse:  (Rails, by default, doesn't replay all migrations, it just
    # uses the latest snapshot in schema.rb)
    #
    # (1) rm ~/code/chessdemo/db/schema.rb
    # (2) rake db:reset
    #
    # See http://stackoverflow.com/questions/10301794/difference-between-rake-dbmigrate-dbreset-and-dbschemaload
  end
end

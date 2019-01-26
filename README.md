## Tablefilter extension for Chrome

On any page containing a table, click the filter button:

![Click the filter button in the Chrome toolbar](screenshots/filter-button-in-toolbar.png "Click the filter button in the Chrome toolbar")

Textboxes will appear on the top of the table:

![Textboxes are added to the table](screenshots/table-with-filter-textboxes.png "Textboxes are added to the table")

Type in any textbox to filter the table:

![Only rows containing the text are shown](screenshots/filtered-table.png "Only rows containing the text are shown")

Filters can also be negated by prefixing them with a minus (`-`). To remove all entries in the table which contain `Oil` enter `-Oil`.

## Bookmarklet

Instead of the plugin, you can use [this bookmarklet](bookmarklet.js). Create a new bookmark and copy-paste the contents of this file into it. Then browse to a page containing a table and click your bookmark.

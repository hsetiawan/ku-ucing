/**
 *
 * You can write your JS code here, DO NOT touch the default style file
 * because it will make it harder for you to update.
 *
 */

"use strict";

$("#table-1").dataTable({
    "columnDefs": [
      { "sortable": false, "targets": [2] }
    ]
  });
   


 $("#disease-table").dataTable({
    "paging": true,
    "pageLength": 10,
    "ajax": {
        data:"json",
        url: "/api/disease",
        type: "GET"
    }, 
    "columns": [
        { "data": null, "sortable": false },
        { "data": "name" }
    ] 
});

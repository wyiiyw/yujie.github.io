$(document).ready(function(){

    $("button#hide_h2").click(function() {
        $("h2").hide(500);
    });

    $("button#show_h2").click(function() {
        $("h2").show(300);
        $("h2").css("color","blue");
        $("h2").html("You clicked me hard.");
    });

    $("button#clear_screen").click(function() {
        var $x = $("container");
        $x.empty();
    });

    $("button#get_data").click(function() {
        var items = [];
        var i = 0;
        var airtable_read_endpoint = "https://api.airtable.com/v0/appmlmqb09qsQG6MJ/Table%201?api_key=key2uwrms0Q8wkXEY"
        var dataSet = [];
        $.getJSON(airtable_read_endpoint, function(result) {
               $.each(result.records, function(key,value) {
                   items = [];
                       items.push(value.fields.Name);
                       items.push(value.fields.Lat);
                       items.push(value.fields.Lng);
                       items.push(value.fields.url);
                       items.push(value.fields.pic);
                       items.push(value.fields.pic_url);
                       
                       dataSet.push(items);
                       console.log(items);
                }); // end .each
                console.log(dataSet);

             $('#table1').DataTable( {
                 data: dataSet,
                 retrieve: true,
                 columns: [
                     { title: "Name",
                       defaultContent:""},
                     { title: "Lat",
                         defaultContent:"" },
                     { title: "Lng",
                       defaultContent:"" },
                     { title: "url",
                       defaultContent:""},
                     { title: "pic",
                         defaultContent:""},
                     { title: "pic_url",
                       defaultContent:""},

                 ]
             } );
        }); // end .getJSON
     }); // end button

     $("button#get_data2").click(function() {
      var items = [];
      var i = 0;
      var airtable_read_endpoint = "https://api.airtable.com/v0/appmlmqb09qsQG6MJ/Table%201?api_key=key2uwrms0Q8wkXEY";
      var dataSet = [];
      $.getJSON(airtable_read_endpoint, function(result) {
             $.each(result.records, function(key,value) {
                 items = [];
                     items.push(value.fields.Name);
                     items.push(value.fields.total_items_by_category);
                     dataSet.push(items);
                     console.log(items);
              }); // end .each
              console.log(dataSet);

           $('#table2').DataTable( {
               data: dataSet,
               retrieve: true,
               columns: [
                   { title: "place",
                     defaultContent:""},
                   { title: "price",
                       defaultContent:"" },
               ]
           } );

           var chart = c3.generate({
                data: {
                    columns: dataSet,
                    type : 'bar'
                },
                axis: {
                  x: {label: 'place'},
                  y: {label: 'price'}
                },
                bar: {
                    title: "# of Items by p Category:",
                }
            });

      }); // end .getJSON

   }); // end button

}); // document ready

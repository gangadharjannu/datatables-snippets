# DataTables inline editing using jEditable  
One of my project requirement was to enable inline editing functionality in [DataTables](https://datatables.net/) but all I found was DataTables [Editor](https://editor.datatables.net/) supports the editing feature on the fly but it is a commercial plugin because of that I had to implement my own in-house solution to use the similar feature in my project.

So I quickly checked [jEditable](https://www.appelsiini.net/projects/jeditable) which is a jquery-plugin for in-cell editing
It is nicely integrated with DataTables to enable the desired behaviour

So lets dig down into implementation  

## Here are the steps to implement the similar behaviour as DataTables Editor

* Draw DataTables 
    * With static `columns` and `ajax` sourced data
* Initialize jEditable after DataTables is loaded
    * I'm using `drawCallback` function to initialize jEditable
* jEditable functionality flow  
    1. User clicks on td -> it will turn into input element
    2. User edits content and press enter (default behaviour)
    3. Send the changes to specified URL in a POST request as `id=elements_id&value=user_edited_content`

## However our requirements were slightly different
* Our application operates with millions of data and making the service call on each cell edit is a tedious job
* User has to wait for the service call success which is unneccary in our case
* Instead they want excel like editing and once they finish editing, clicking on a button will simply send the edited records to server at one go
* So instead of specifying URL in jEditable callback I had to specify the function.
    ```javascript
    .editable(function (value, jeSettings) {
        
        return value
    });
    ```  
* In that function I had implemented the in-cell editing functionality as
    * Get the row and column index
    * Get the current row data
    * Update the current row data with the user edited content
    * Assign the row data to a global object so that only edited rows will be available at the end
    * Convert the object to Array
    * On button click send the edited rows data to server side using service call  
    * Re draw the datatable with updated changes on service call success

## Check out the code for implementation details. 

# Demo
Feel free to play in [JSFiddle](https://jsfiddle.net/gangadharjannu/b382c9z4/8/)

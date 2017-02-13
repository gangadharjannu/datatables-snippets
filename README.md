# DataTables inline editing using jEditable  
My aim is to enable inline editing functionality in [DataTables](https://datatables.net/). When I googled for `editing in DataTables` I had found DataTables [Editor](https://editor.datatables.net/) supports the editing feature on the fly but since it is a commercial plugin I was unable to use it in my project   
So I go with [jEditable](https://www.appelsiini.net/projects/jeditable) which is a jquery-plugin for in-cell editing
It is nicely integrated with DataTables to enable the desired behaviour

So lets dig down into implementation  
## Here are the steps I've taken to implement the similar behaviour

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

## Check the code for implementation details. 


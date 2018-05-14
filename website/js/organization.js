
// get Organizations -----------------------------------------------------
function getOrganization(){
    
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "http://10.252.2.2:8001/organizations",
        "method": "GET",
        "headers": {}
    }
    
    $.ajax(settings).done(function (response) {
  

        var list = response.response;
        var len = response.response.length;
        console.log('hola');
        for (var i = 0; i < len; i++ ) {
                        
            var organizationName = list[i]['name'];

            newlink = document.createElement('a');
            newlink.setAttribute('class',"list-group-item list-group-item-info mb-2");
            newlink.setAttribute('href', '#');
            newlink.setAttribute('id', organizationName);
            var t = document.createTextNode(list[i]['name']);
            newlink.appendChild(t);
            document.getElementById("listOrganizations").appendChild(newlink);

                        
            var groupList = list[i]['groups'].length;
        
            if ( groupList > 0 ){
                
                newlink = document.createElement('a');
                newlink.setAttribute('class',"list-group-item  list-group-item-success ");                
                newlink.setAttribute('id', "group" + organizationName);
                var t = document.createTextNode("Groups");
                newlink.appendChild(t);
                document.getElementById(organizationName).appendChild(newlink);    

                for ( var x = 0; x < groupList; x++ ){

                    newlink = document.createElement('a');
                    newlink.setAttribute('class',"list-group-item list-group-item-action ");                
                    var t = document.createTextNode(list[i]['groups'][x]);
                    newlink.appendChild(t);
                    document.getElementById("group" + organizationName ).appendChild(newlink);
                };
            };
            

        };
    });
};

// ---- add organization ----

function postOrganization(){
    var nameOrganization = document.querySelector("#postNameOrganization").value;
    var descriptionOrganization = document.querySelector("#postDescriptionOrganization").value;
    
    
    $.ajax({
        type: "POST",
        url: "http://10.252.2.2:8001/organizations",
        data : {'name':nameOrganization, 'description': descriptionOrganization },

            }).done(function (response) {
                var answer = response.response;
                functionAlert(answer);
                    
    });
};


// delete organization ----------------------------------------------------

function deleteOrganization(){
    
    var idOrganization = document.querySelector("#deleteSelectOrganization").value;
        
    $.ajax({
        type: "DELETE",
        url: "http://10.252.2.2:8001/group/" + idOrganization,
             
        }).done(function (response) {
            var answer = response.response;
            functionAlert(answer);

         });

};

function deleteOrganizationSelect(){
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "http://10.252.2.2:8001/organizations",
        "method": "GET",
        "headers": {}
    }

    $.ajax(settings).done(function (response) {

        var list = response.response;
        var len = response.response.length;
        
        for (var i = 0; i < len; i++ ) {
            newlink = document.createElement('option');
            newlink.setAttribute('value',list[i]['id']);                
            var t = document.createTextNode(list[i]['name']);
            newlink.appendChild(t);
            
            document.getElementById("deleteSelectOrganization").appendChild(newlink);
            //document.getElementById("putSelectGroup").appendChild(newlink);
            
        ;}
    });
}

// put group --------------------------------------------------------------
function putOrganization(){
    
    var idOrganization = document.querySelector("#putSelectOrganization").value;
    // falla value= por inexplicable causa
    var nameOrganization = document.querySelector('[value="'+ idOrganization +'"]').textContent;
    var newNameOrganization = document.querySelector("#putNameOrganization").value;
    var descriptionOrganization = document.querySelector("#putInputdescriptionOrganization").value;
    
    // if newgroup exist add newgroup at name group.
    if ( newNameOrganization.length > 1 ){
        nameOrganization = newNameOrganization
    }
    
    $.ajax({
        type: "PUT",
        url: "http://10.252.2.2:8001/organization/" + idOrganization,
        data : {'name':nameOrganization, 'description': descriptionOrganization },
        
        
            }).done(function (response) {
                var answer = response.response;
                functionAlert(answer);
                    
    });
}

function putOrganizationSelect(){
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "http://10.252.2.2:8001/organizations",
        "method": "GET",
        "headers": {}
    }

    $.ajax(settings).done(function (response) {

        var list = response.response;
        var len = response.response.length;
        
        for (var i = 0; i < len; i++ ) {
            newlink = document.createElement('option');
            newlink.setAttribute('value',list[i]['id']);                
            var t = document.createTextNode(list[i]['name']);
            newlink.appendChild(t);
            
            document.getElementById("putSelectOrganization").appendChild(newlink);
            //document.getElementById("putSelectGroup").appendChild(newlink);
            
        ;}
    });
}
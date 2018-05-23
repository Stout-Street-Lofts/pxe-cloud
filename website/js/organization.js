
// get Organizations -----------------------------------------------------
function getOrganization(){
    
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": config() + "/organizations",
        "method": "GET",
        "headers": {}
    }
    
    $.ajax(settings).done(async function (response) {
  

        var list = response.response;
        var len = response.response.length;
        
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
                    var texts = await userGetGroups(list[i]['groups'][x]);
                    var t = document.createTextNode(texts);
                    newlink.appendChild(t);
                    document.getElementById("group" + organizationName ).appendChild(newlink);
                };
            };
            

        };
    });
};

// ---- add organization ----

async function postOrganization(){
    var nameOrganization = document.querySelector("#postNameOrganization").value;
    var descriptionOrganization = document.querySelector("#postDescriptionOrganization").value;
    var groupOrganization = document.querySelector("#postOrganizationSelectGroup").value;
    
    
    $.ajax({
        type: "POST",
        url: config() + "/organizations",
        data : {'name':nameOrganization, 'description': descriptionOrganization },

            }).done(function (response) {
                var answer = response.response;
                functionAlert(answer);
                    
    });


    // search organization id
    async function idOrg(){
        
        var settings = {
            "async": true,
            "crossDomain": true,
            "url": config() + "/organizations",
            "method": "GET",
            "headers": {}
        }

        const ajaxGetOrgs = () => {
            return $.ajax(settings).done(function (response) {     
                return  response.response;
            });
        }
        var id = await ajaxGetOrgs()
        return id;
    }
    // assign organization id to a variable
    var list = await idOrg();
    
    for ( var i = 0; i < list.response.length; i ++ ){
        if ( list.response[i]['name'] == nameOrganization ){
            var idOrg = list.response[i]['id'];
        }
    }
    
    // add group to organization
    $.ajax({
        type: "POST",
        url: config() + "/organization/" + idOrg + "/group/" + groupOrganization,
        
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
        url: config() + "/organization/" + idOrganization,
             
        }).done(function (response) {
            var answer = response.response;
            functionAlert(answer);

         });

};


// put group --------------------------------------------------------------
function putOrganization(){
    
    var idOrganization = document.querySelector("#putSelectOrganization").value;
    var nameOrganization = document.querySelector('[value="'+ idOrganization +'"]').textContent;
    var newNameOrganization = document.querySelector("#putNameOrganization").value;
    var descriptionOrganization = document.querySelector("#putInputdescriptionOrganization").value;
    var idGroup = document.querySelector("#putOrganizationSelectGroup").value;
    
    if ( newNameOrganization.length > 1 ){
        nameOrganization = newNameOrganization
    }
    
    $.ajax({
        type: "PUT",
        url: config() + "/organization/" + idOrganization,
        data : {'name':nameOrganization, 'description': descriptionOrganization },
        
        
            }).done(function (response) {
                var answer = response.response;
                functionAlert(answer);
                    
    });


    $.ajax({
        type: "POST",
        url: config() + "/organization/" + idOrganization + "/group/" + idGroup,
        
        }).done(function (response) {
                var answer = response.response;
                functionAlert(answer);
                    
    });
}



function GetOrganizations(id){
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": config() + "/organizations",
        "method": "GET",
        "headers": {}
    }

    $.ajax(settings).done(function (response) {

        var list = response.response;
        var len = response.response.length;
        
        for (var i = 0; i < len; i++ ) {
            var description = list[i]['description'];  

            var groupList = list[i]['name'].length;  
            newlink = document.createElement('option');
            newlink.setAttribute('value',list[i]['id']);     
            newlink.setAttribute('onclick','valuesOrg("'+ description + '")');              
            var t = document.createTextNode(list[i]['name']);
            newlink.appendChild(t);
            document.getElementById(id).appendChild(newlink);
        ;}
    });
}


function valuesOrg(descript){
    
    if ( descript == "null" ){
        descript = "";
    }
    document.querySelector("#putInputdescriptionOrganization").value = descript ;
}
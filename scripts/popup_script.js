//function for validating URL
function validURL(str) {
    var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
      '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
    return !!pattern.test(str);
}

//function for calling ProxyCrawl api
function call_pc_api(event){
    event.preventDefault();
        let a_url = document.getElementById("a_url").value;
        let token = document.getElementById("token").value;
        if(validURL(a_url) && token !=""){
            
            //restricting multiple api calls
            document.getElementById("submit_btn").innerHTML="<i class='fa fa-spinner fa-pulse fa-fw' aria-hidden='true'></i>"
            document.getElementById("submit_btn").disabled = true;
            proxy_url = "https://api.proxycrawl.com/scraper?token="+token+"&url="+a_url;
            
            fetch(proxy_url).then(function (response) {
                return response.json();
            })
            .then(function (data) {
                document.getElementById("result").innerHTML=JSON.stringify(data);
            }).catch(function(){
                document.getElementById("result").innerHTML="Something went worng. Please double check amazon product url and ProxyCrawl Token.";
            }).finally(function() {
                //restricting multipl api calls
                document.getElementById("submit_btn").innerHTML="Submit"
                document.getElementById("submit_btn").disabled = false;
             });

        }else
            document.getElementById("result").innerHTML="Url or token is not valid.";
}

document.getElementById("amazon-form").addEventListener("submit",call_pc_api);




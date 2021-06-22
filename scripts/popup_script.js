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
        let btn = document.getElementById("submit_btn");
        let result_div = document.getElementById("result");
        if(validURL(a_url) && token !=""){
            //restricting multiple api calls
            btn.innerHTML="<i class='fa fa-spinner fa-pulse fa-fw' aria-hidden='true'></i>"
            btn.disabled = true;
            proxy_url = "https://api.proxycrawl.com/scraper?token="+token+"&scraper=amazon-product-details&format=json&url="+a_url;
            
            fetch(proxy_url).then(function (response) {
                return response.json();
            })
            .then(function (data) {
                result_div.innerHTML=JSON.stringify(data);
            }).catch(function(e){
                result_div.innerHTML="Something went worng. Please double check amazon product url and ProxyCrawl Normal Token.";
            }).finally(function() {
                //resetting
                btn.innerHTML="Submit";
                btn.disabled = false;
            });

        }else{
            result_div.innerHTML="Url or Token is not valid.";
        }
}

document.getElementById("amazon-form").addEventListener("submit",call_pc_api);




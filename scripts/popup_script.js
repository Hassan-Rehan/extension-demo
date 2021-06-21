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
    try{
        let a_url = document.getElementById("a_url").value;
        let token = document.getElementById("token").value;
        if(validURL(a_url) && token !=""){
            
            //restricting multiple api calls
            document.getElementById("submit_btn").innerHTML="<i class='fa fa-spinner fa-pulse fa-fw' aria-hidden='true'></i>"
            document.getElementById("submit_btn").disabled = true;

            proxy_url = "api.proxycrawl.com/scraper?token="+token+"&url="+a_url;
            // $.ajax({
            //     type: "GET",
            //     url: proxy_url,
            //     dataType : "json",
            //     cache: false,
            //     timeout: 10000,
            //     success: function (data){
            //         document.getElementById("result").innerHTML= data;
                    
            //         //resetting things
            //         document.getElementById("submit_btn").innerHTML="Submit"
            //         document.getElementById("submit_btn").disabled = false;
            //     },
            //     error: function (e) {
            //         if(e.statusText == 'timeout')
            //             document.getElementById("result").innerHTML="Timeout. Please try again.";
            //         else
            //         document.getElementById("result").innerHTML="Please enter Valid amazon product url and ProxyCrawl Token.";
                    
            //         //resetting things
            //         document.getElementById("submit_btn").innerHTML="Submit"
            //         document.getElementById("submit_btn").disabled = false;
            //     }
            // });
            
            
            options = {
                method  : 'GET', 
                headers : new Headers({
                    "User-Agent"   : "Mozilla/5.0",
                    "Access-Control-Allow-Origin": "*"
                })
            }

            fetch(proxy_url, options).then(function (response) {
                return response.json();
            })
            .then(function (data) {
                console.log(data);
            });

        }else
            document.getElementById("result").innerHTML="Url or token is not valid.";

    }catch(e){
        document.getElementById("result").innerHTML="Something went worng. Please double check amazon product url and ProxyCrawl Token.";
        //resetting things
        document.getElementById("submit_btn").innerHTML="Submit"
        document.getElementById("submit_btn").disabled = false;
    }
}

document.getElementById("amazon-form").addEventListener("submit",call_pc_api);




var Logger = {

    debug: function(message){
        if(console){
            console.log("%c" + message, "color:orange;font-weight:bold;");
        }
    },
    error: function(message){
        if(console){
            console.log("%c" + message, "color:red;font-weight:bold;");
        }
    },
    info: function(message){
        if(console){
            console.log("%c" + message, "color:green;font-weight:bold;");
        }
    }
}
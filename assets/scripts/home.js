"use strict";
var Home = function () { };

(function closure() {
    Home.prototype.init = function(el) {
        console.log(this.message);
        
            $(function() {
        $("#sign-in-with-twitter").on("click", function() {
            window.location.href = "./requesttoken";
        });
    });
    };
})();

var home = new Home();
home.init();
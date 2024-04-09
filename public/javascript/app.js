$(document).ready(function(){
    $("body").on("click", ".go-to-signup", function(){
        $(".signup-form-space").toggle();
        $(".login-form-space").toggle();
    });
    $("body").on("click", ".go-to-signin", function(){
        $(".login-form-space").toggle();
        $(".signup-form-space").toggle();
    });
});
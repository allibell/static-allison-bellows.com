$(function() {
    Profile.load();
});

Profile = {
    load:function(){
        this.buttons();
    },
    buttons:function(){
        $('.animated-button').click(function(){
            var focusSide = $(this).parent().parent().parent().children('.focus-side');
            focusSide.children('.image-container').children('.ppn-image').toggleClass('blur');
            abtContainer = focusSide.children('.image-container').children('.about-container');
            abtContainer.toggleClass('active');
        });
    }
}


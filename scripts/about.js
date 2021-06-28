$(function() {
    Profile.load();
});

Profile = {
    load:function(){
        this.links();
        this.social();
    },
    links:function(){
        $('a[href="#"]').click(function(e){
            e.preventDefault();
        });
    },
    social:function(){
        $('.circle-pic .circle-pic-overlay .plus').click(function(){
            $('.social-link').toggleClass('active');
            $('.circle-pic').toggleClass('blur');
        });
        $('.social-link').click(function(){
            $(this).toggleClass('active');
            $('.circle-pic').toggleClass('blur');
        });
        $('.local-link').click(function(){
            $('.social-link').toggleClass('active');
            $('.circle-pic').toggleClass('blur');
        });
    }

}

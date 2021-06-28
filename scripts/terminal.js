// JavaScript Document
$(document).ready(function(e) {
    /* Todo:
 • Webpages in a database/more editable version
 • Add cookies to track previous commands? (You can press up and down to browse previous commands this session)
 */

    var faviconnumber = 1;
    function favicon() {
	favicon = favicon == 1 ? 2 : 1;
	$('.favicon').attr('href','favicon' + favicon + ".png");
    }
    console.clear();
    var commandlist = [ 
	["help", "Show commands"],
	["list", "List all pages on the website"],
	["clear", "Clear the console"],
    ];
    var previouscommands = [];
    var currentcommand = 0;
    var pages = {
	"index": "Title",
	"about": "Explaining me, and a bit about this site, which will be my pet toolkit/sandbox.  My sandkit?",
	"present-preoccupations": "What I'm currently up to",
	"past-preoccupations": "*Highlights* of things I've previously been up to",
	"top-fives": "Lists of favorites, at least as much for my reference as for yours (like much of this site)",
	"resume": "Obligatory 🥴 ",
	"random": "Comics, quotes, dank memes, betas/sandboxes, easter eggs...",
    };
    var currentpage = "random";
    var url = "https://allison-bellows.com/"
    /*
	 Custom Text Syntax
	 Links:      
	    [URLPATH](NAME) - regular
	    [^URLPATH](NAME) - open in new tab

	 Styles:
     *TEXT* - bold text
	    E! - Text is an error/notification
	    A! - spaces are converted to non-breaking spaces (it's for ascii art - after all, this is a text based website)
	    */
    function init() {
	setInterval(time);
	console.clear();

        const space = "&nbsp";
        const edge = "~";
        const welcome = "*WELCOME TO ALLISONLAND*"
        const border = edge.repeat(welcome.length)
        const edges = edge.repeat(7);
        const spaces = space.repeat(7);
	console.log(new Date().getTime());

	log("Website", "");
	log("Website", edges + border + edges);
	log("Website", spaces + welcome + spaces);
	log("Website", edges + border + edges);
	log("Website", "");
	log("Website", "I'm building this 'website terminal' as an experiment. I plan to add it as an optional type of 'menu' instead of the burger menu.  For now, while I'm sandboxing, I'm just hosting it here on the 'random' page.");
	log("Website", "");
	log("Website", "Planned features include:");
	log("Website", "    - page routing (e.g. 'nav about', 'nav present-preoccupations')");
	log("Website", "    - ascii art (input image url, output ascii version of image)");
        log("Website", "    - enable dark mode");
	log("Website", "    - probably more");
	log("Website", "");
	log("Website", "Feel free to play around!");
	urlvars();
	log("Client", "For help say 'help'");
	setInterval(favicon,500);
    }

    function urlvars() {
	var pagelocs = window.location.pathname.replace("/","").split("/");
	var pageloc = pagelocs[0];
	console.log(pageloc);
	//alert();
	if(pageloc != "") {
	    if (pageloc in pages) {
		currentpage = pageloc;
	    }
	}
	log("Website", "You are currently on page: *" + currentpage + "*");
	if(pageloc != "") {
	    if (pageloc in pages) {
		currentpage = pageloc;
		loadpage(pageloc);
	    } else {
		//Un-note next line to show 404 errors with wrong urls
		//log("Client", "404 - The page '" + pageloc + "' does not exist. To "); 
	    }
	}
	if(pageloc == "") {
	    log("Client", "What would you like to access?");	
	}
    }
    function getParam(name){
	name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
	var regexS = "[\\?&]"+name+"=([^&#]*)";
	var regex = new RegExp( regexS );
	var results = regex.exec (window.location.href);
	if (results == null) {
	    return "";
	}
	else  {
	    return results[1];
	}
    }

    function log(name, information) {
	var d = new Date();
	var hours = ((d.getHours() < 10) ? "0" : "") + d.getHours();
	var minutes = ((d.getMinutes() < 10) ? "0" : "") + d.getMinutes();
	var seconds = ((d.getSeconds() < 10) ? "0" : "") + d.getSeconds();
	var color = "whitet";
	var textcolor = "";
	var postcolor = "";

	switch (name[0]) {
	    case "!":
		postcolor = " important";
		name = name.substr(1);
		break;
	}
	switch (name) {
	    case "Website":
		color = "redt";
		break;
	    case "Server":
		color = "bluet";
		break;
	    case "Client":
		color = "bluet";
		break;
	    case "User":
                postcolor = "greent";
		color = "greent";
		break;
	}
	if (information[0] == "A" && information[1] == "!") {
	    information = information.substr(2);
	    information = information.replace(/ /g, '\u00A0');
	}
	if (information[0] == "E" && information[1] == "!") {
	    information = information.substr(2);
	    postcolor = " important";
	}

	while (information.indexOf("](") >= 0) { //URL parser

	    var NAMEregExp = /\(([^)]+)\)/;
	    var uname = NAMEregExp.exec(information)[1];

	    var URLregExp = /\[([^)]+)\]/;
	    var url = URLregExp.exec(information)[1];
	    var newpage = false;
	    if (url[0] == "^") {
		newpage = true;
		url = url.substr(1);
	    }
	    var start = information.indexOf("[");
	    var end = information.indexOf(")");
	    if (newpage) {
		information = information.replace(information.substring(start, end + 1), "").splice(start, 0, '<a href="' + url + '" target="_blank">' + uname + '</a>');
	    } else {
		information = information.replace(information.substring(start, end + 1), "").splice(start, 0, '<a href="' + url + '">' + uname + '</a>');
	    }
	    //information = '<a href="' + url + '">' + uname + '</a>'; //working

	}
	var tobold = true;
	var boldnumber = 0;
	for (var i = 0; i < information.length; i++) {
	    if (information[i] == "*" && information[i - 1] != "*" && information[i + 1] != "*") {
		boldnumber++;
	    }
	}
	while (information.indexOf("*") >= 0) { //Bold parser
	    var pos = information.indexOf("*");
	    information = information.replace("*", "");
	    if (tobold) {
		information = information.splice(pos, 0, '<b>');
	    } else {
		information = information.splice(pos, 0, '</b>');
	    }
	    tobold = !tobold;
	    if (tobold && boldnumber <= 1) {
		break;
	    }
	    //information = '<a href="' + url + '">' + uname + '</a>'; //working
	}
	var tounderline = true;
	var underlinenumber = 0;
	for (var i = 0; i < information.length; i++) {
	    if (information[i] == "*" && information[i - 1] != "*" && information[i + 1] != "*") {
		underlinenumber++;
	    }
	}
	while (information.indexOf("**") >= 0) { //Bold parser
	    var pos = information.indexOf("**");
	    information = information.replace("**", "");
	    if (tounderline) {
		information = information.splice(pos, 0, '<u>');
	    } else {
		information = information.splice(pos, 0, '</u>');
	    }
	    tounderline = !tounderline;
	    if (tounderline && underlinenumber <= 1) {
		break;
	    }
	    //information = '<a href="' + url + '">' + uname + '</a>'; //working
	} /**/
	$(".stream").append('<div class="line">' +
	    '<p class="time">[' + hours + ":" + minutes + ":" + seconds + ']</p>' +
	    '<p class="name ' + color + '">' + '</p>' +
	    '<p class="information ' + postcolor + '">' + information + '</p>' +
	    '</div>');
	$(document).scrollTop($(document).height() - $(window).height());
    }
    var timestring = "";
    function time() {
	var d = new Date();
	var hours = d.getHours();
	var minutes = d.getMinutes();
	var seconds = d.getSeconds();
	if (hours < 10) {
	    hours = "0" + hours;
	}
	if (minutes < 10) {
	    minutes = "0" + minutes;
	}
	if (seconds < 10) {
	    seconds = "0" + seconds;
	}
	var temptimestring = "[" + hours + ":" + minutes + ":" + seconds + "]";
	if (temptimestring != timestring) {
	    timestring = temptimestring;
	    $(".editline .time").text(timestring);
	}
    }

    var ctrldown = false;
    var ctrldown = false;
    $(".editline .edit").keydown(function(e) {
	var text = $(".editline .edit").text();
	console.log(e.which);
	if (e.which == 13 && text !== "" && !ctrldown) {
	    var commands = text.split(' ');
	    var output = "";

	    $(".editline .edit").text("");
	    log("User", text);

	    previouscommands[currentcommand] = text;
	    currentcommand = previouscommands.length;
	    cmd(commands[0], text, commands);

            return false;
	    /*Add mod commands*/
	    //modcmd(commands[0], text, commands);

	}
	if (e.which == 38) { //up
	    if (currentcommand > 0) {
		currentcommand--;
		$(".editline .edit").text(previouscommands[currentcommand]);
	    }
	}
	if (e.which == 40) { //down

	    if (currentcommand < previouscommands.length) {
		currentcommand++;
		$(".editline .edit").text(previouscommands[currentcommand]);
	    }
	}
    });

    function cmd(command, words, word) {
	switch (word[0]) {
	    case "help":
		for (var i = 0; i < commandlist.length; i++) {
		    output = commandlist[i][0] + " : " + commandlist[i][1];
		    //console.log(command[i][0]);
		    log("Client", output);
		}
		break;
	    case "clear":
		$(".stream").text("");
		break;
	    case "nav":
                if (word[1] in pages) {
		    currentpage = word[1];
		    log("Website", "You are now in *" + currentpage + "*");
		    loadpage(currentpage);
		} else {
		    log("Client", "'" + word[1] + "' does not exist.");
		}
		break;
	    case "list":
                var detailed = word.includes("--detailed");
                for (var page in pages) {
                    var desc = ""
                    if (detailed) desc = " : " + pages[page];
                    log("Client", "> " + page + desc);
                }
		break;
	    case "login":
		if (word.length >= 3) {
		    log("Client", "Attempting to login to " + word[1] + " with " + Array(word[2].length + 1).join("â€¢"));
		    loginreturn = false;
		    //log("Client", "ER1");
		    setTimeout(loginemptyreturn, 20000);
		} else {
		    log("Client", "Not enough arguments to log in, you need a USERNAME and a PASSWORD.");
		}
		break;
	    default:
		output = "Unrecognised command '" + word[0] + "'.";
		log("Client", output);
	}
    }

    function loadpage(page) {
        log("Website", pages[page]);
    }
    var loginreturn = false;

    function loginemptyreturn() {
	//log("Client", "ER2");
	if (!loginreturn) {
	    log("Client", "E![LOGIN] No Return Recieved");
	}
    }
    String.prototype.splice = function(idx, rem, str) {
	return this.slice(0, idx) + str + this.slice(idx + Math.abs(rem));
    };
    init();

    $(".editline .edit").focus();
});


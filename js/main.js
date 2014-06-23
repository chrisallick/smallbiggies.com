changeBGColor = function() {
	color_index++;
	if( color_index > bgcolors.length - 2 ) {
		color_index = 0;
	}

	$('body,html').css({
		backgroundColor: bgcolors[color_index]
	});
}

changeVideo = function() {
	video_index++;
	if( video_index > vids.length - 1 ) {
		video_index = 0;
	}

    var new_url = "http://www.youtube.com/embed/"+vids[video_index]+"?modestbranding=1&nologo=0&rel=0&autoplay=0&controls=0&loop=1&rel=0&showinfo=0&enablejsapi=1&origin=http://digital.frommother.com";
    $("#the-biggie").attr("src",new_url);

	player = new YT.Player('the-biggie', {
		height: '390',
		width: '640',
		events: {
			'onReady': onPlayerReady,
			'onStateChange': onPlayerStateChange
		}
	});
}

getURLsFromPlayList = function() {
	$.getJSON(playListURL, function(data) {
	    $.each(data.feed.entry, function(i, item) {
	    	vids.push( item["media$group"]["yt$videoid"]["$t"] );
	    });

	    //var vid = getRandomInt(0,vids.length-1);
	    // var new_url = "//www.youtube.com/embed/"+vids[video_index]+"?modestbranding=1&rel=0&autoplay=0&controls=0&loop=1&rel=0&showinfo=0";
	    // $("#the-biggie").attr("src",new_url);
	});	
}

recenter = function() {
	$("#the-biggie").css({
		top: $(document).height()/2 - $("#the-biggie").height()/2,
		left: $(window).width()/2 - $("#the-biggie").width()/2
	});
}

function onYouTubeIframeAPIReady() {
	console.log("yt api ready.");

	changeVideo();
}

function onPlayerReady(event) {
	console.log("yt player ready.");

    done = false;

	event.target.playVideo();
}

function onPlayerStateChange(event) {
	if (event.data == YT.PlayerState.ENDED && !done) {
		done = true;

		changeBGColor();
		changeVideo();
	}
}

function stopVideo() {
	player.stopVideo();
}

var playListURL = 'http://gdata.youtube.com/feeds/api/playlists/PLiHYYnsAdhzgn5PNGylsYyE6DNleSGjbc?v=2&alt=json&callback=?';
var videoURL= 'http://www.youtube.com/watch?v=';
var vids = new Array();
var video_index = 0;

var bgcolors = new Array("#771dcc", "#00ff9c", "#ffea00", "#ff0054", "00e4ff");
var color_index = 0;

var player;
var done = false;

$(window).load(function() {
	var tag = document.createElement('script');
	tag.src = "http://www.youtube.com/iframe_api";
	var firstScriptTag = document.getElementsByTagName('script')[0];
	firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

	$("#logo").animate({
		opacity: 1
	});
});

$(document).ready(function() {
	getURLsFromPlayList();

	$('body,html').css({
		backgroundColor: bgcolors[color_index]
	});

	$(window).resize(function(){
		recenter();
	})
	recenter();

	$("#the-biggie").mouseover(function() {
		$("#the-biggie").css({
			width: 640,
			height: 360
		});

		$("#the-biggie").css({
			top: $(window).height()/2 - $("#the-biggie").height()/2,
			left: $(window).width()/2 - $("#the-biggie").width()/2
		});
	}).mouseout(function(){
		$("#the-biggie").css({
			width: 64,
			height: 36
		});

		$("#the-biggie").css({
			top: $(window).height()/2 - $("#the-biggie").height()/2, // 50 for some reason :(
			left: $(window).width()/2 - $("#the-biggie").width()/2
		});
	});

	$("#reload").click(function(e){
		e.preventDefault();

		changeBGColor();
		changeVideo();
	});
});
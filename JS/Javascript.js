//All global variables are declaired at the start of the file
var x;
var canvas;
var my_context;
var textColour;
//Premade albums and tracks stored on the site files
var Homework = [["Daftendirekt","yuoghR-5-Xs"],["Revolution 909","Wtd6DvLoCsU"],["Da Funk","n1ZqN_VFhdo"]];
var Discovery = [["One More Time","FGBhQbmPwH8"],["Harder, Better, Faster, Stronger","gAjR4_CbPpQ"],["Crescendolls","6S3ISlvlEbs"]];
var HumanAfterAll = [["The Prime Time of Your Life","QwRlt1XyOg0"],["Robot Rock","sFZjqVnWBhc"],["Steam Machine","zjKnWqPGEP4"]];
var Alive = [["Technologic","7_rUMACHnLg"],["Steam Machine","1He3pnSGU2U"]];
var url;
var track;
var playList = [];
var savedLists = [];
var listToPlay;
var selectedList = [];
var listToPlayTitle = "";
var playingListLinks = [];
var arrayPosition = 0;
var player;
var scrollTextString = "Robot Rock";

//Waiting for the site to load before any script is executed
window.onload = function(){
	console.log("Javascript loaded");
	//localStorage.clear();
	//Checking if the user has already stored any playlists locally
	if(localStorage.getItem("savedLists") == false || localStorage.getItem("savedLists") == null){
		savedLists.push(["Homework", Homework]);
		savedLists.push(["Discovery", Discovery]);
		savedLists.push(["HumanAfterAll", HumanAfterAll]);
		savedLists.push(["Alive", Alive]);
		localStorage.setItem("savedLists", JSON.stringify(savedLists));}
	else{
		savedLists = JSON.parse(localStorage.getItem("savedLists"));}
	
	//Dynamically generates rows of the users saved playlists
	var table = document.getElementById("savedAlbumTable");
	if(table != null){
	for(var i = 0; i < savedLists.length; i++){
	var newRow = table.insertRow(0)
	newRow.setAttribute("data",JSON.stringify(savedLists[i][1]));
	newRow.setAttribute("class","generatedList");
	newRow.innerHTML = savedLists[i][0];}}
	
	//If a list has been selected it is loaded from local storage and displayed on the Home page
	var playingList = document.getElementById("playingList");
	if(playingList != null && localStorage.getItem("selectedList") != null){
		var listContentsString = "";
		var listContents = JSON.parse(localStorage.getItem("selectedList"));
		for(var i = 0; i < listContents.length; i++){
			listContentsString += i+1 + ". " + listContents[i][0] + "<br />";
			playingListLinks.push(listContents[i][1]);
		}
		playingList.innerHTML = listContentsString;
		document.getElementById("currentName").innerHTML = "Current List: " + JSON.parse(localStorage.getItem("listToPlayTitle"));
	}
	
	//First video of the selected playlist is also loaded from local storage
	var video = document.getElementById("video")
	if(video != null && localStorage.getItem("selectedList") != null){
		arrayPosition = 0;
		var listContents = JSON.parse(localStorage.getItem("selectedList"));
		scrollTextString = listContents[arrayPosition][0];
		video.src = "https://www.youtube.com/embed/"+ playingListLinks[arrayPosition] +"?controls=0&autoplay=1&rel=0&enablejsapi=1";
		player = new YT.Player("video");
		//An envent listener is created to load the next track when the playing track ends
		player.addEventListener("onStateChange", "trackEnd");
	}        
	
	//Canvas size is set based on user window size
	canvas = document.getElementById("canvas");
	if(canvas != null){
	my_context = canvas.getContext('2d');
	canvas.width = $(window).width()*0.8;
	
	//Event listener to change text colour when the user picks a new colour using local storage
	$("#textColour").change(function(){
		console.log($("#textColour").val());
		localStorage.setItem("textColour", $("#textColour").val());})
	
	//Text scroller changes text position every 100 milliseconds
	setInterval(scrollText, 100);
	
	//Canvas size is updated when window size is changed
	$(window).resize(function(){
	canvas.width = $(window).width()*0.8;});}
	
	//Event listener for dragging a draggable object	
	$(".draggable").draggable({
	revert:true,
	proxy:"clone",
	onStartDrag:function(){
		track = $(this).find("p").text();
		url = $(this).find("p").attr("data-data");
		$(this).draggable("proxy").css("z-index",10);}
				
	});
	
	//Event listener for dropping in a drop field
	$(".droppable").droppable({
	onDrop:function(e,source){
		playList.push([track, url]);
		updatePlaylist();
		}
	});
	
	//Event listeners for user selecting an album
	$("#Homework").click(function(){
		($("#tr1p").text(Homework[0][0]).attr("data-data",Homework[0][1]));
		($("#tr1img").attr("src","Assets/Daftpunk-homework.jpg"));
		($("#tr2p").text(Homework[1][0]).attr("data-data",Homework[1][1]));
		($("#tr2img").attr("src","Assets/Daftpunk-homework.jpg"));
		($("#tr3p").text(Homework[2][0]).attr("data-data",Homework[2][1]));
		($("#tr3img").attr("src","Assets/Daftpunk-homework.jpg"));
		})
		
	$("#Discovery").click(function(){
		($("#tr1p").text(Discovery[0][0]).attr("data-data",Discovery[0][1]));
		($("#tr1img").attr("src","Assets/Discovery.jpg"));
		($("#tr2p").text(Discovery[1][0]).attr("data-data",Discovery[1][1]));
		($("#tr2img").attr("src","Assets/Discovery.jpg"));
		($("#tr3p").text(Discovery[2][0]).attr("data-data",Discovery[2][1]));
		($("#tr3img").attr("src","Assets/Discovery.jpg"));
		})
		
	$("#HumanAfterAll").click(function(){
		($("#tr1p").text(HumanAfterAll[0][0]).attr("data-data",HumanAfterAll[0][1]));
		($("#tr1img").attr("src","Assets/HumanAfterAll.jpg"));
		($("#tr2p").text(HumanAfterAll[1][0]).attr("data-data",HumanAfterAll[1][1]));
		($("#tr2img").attr("src","Assets/HumanAfterAll.jpg"));
		($("#tr3p").text(HumanAfterAll[2][0]).attr("data-data",HumanAfterAll[2][1]));
		($("#tr3img").attr("src","Assets/HumanAfterAll.jpg"));
		})
		
	$("#Alive").click(function(){
		($("#tr1p").text(Alive[0][0]).attr("data-data",Alive[0][1]));
		($("#tr1img").attr("src","Assets/Alive.jpg"));
		($("#tr2p").text(Alive[1][0]).attr("data-data",Alive[1][1]));
		($("#tr2img").attr("src","Assets/Alive.jpg"));
		($("#tr3p").text(HumanAfterAll[2][0]).attr("data-data",HumanAfterAll[2][1]));
		($("#tr3img").attr("src","Assets/HumanAfterAll.jpg"));
		})
	
	//Event listener for user selecting a playlist
	$(".generatedList").click(function(){
		listToPlay = JSON.parse($(this).attr("data"));
		var list = document.getElementById("selectedList");
		var playListString = "";
		for(var i = 0; i < listToPlay.length; i++){
		playListString += i+1 + ". " + listToPlay[i][0] + "<br />";
		}
		list.innerHTML = playListString;
		listToPlayTitle = $(this).text()
		$("#selectedListTitle").text("Selected list: " + listToPlayTitle);
	})
}

//Function to save the users playlist choice to local storage 
function selectList(){
	localStorage.setItem("selectedList", JSON.stringify(listToPlay));
	localStorage.setItem("listToPlayTitle", JSON.stringify(listToPlayTitle));
}

//Function to save a user made playlist to local storage
function saveList(){
	savedLists.push([$("#playlistName").val(),playList]);
	localStorage.setItem("savedLists", JSON.stringify(savedLists));
}

//Function to write the current playing song to the canvas
function scrollText(){
	my_context.font = "20px Lucida Console";
	my_context.clearRect(0, 0, canvas.width, canvas.height);
	textColour = $("#textColour").val();
	if(localStorage && localStorage.getItem("textColour")){
		textColour = localStorage.getItem("textColour");}
		
	my_context.fillStyle = textColour;
	if(x == null){
		x = scrollTextString.length*-12;}
	my_context.fillText(scrollTextString,x,20);
	x+=2;
	if(x > canvas.width){
		x = scrollTextString.length*-12;}
}

//Function to update and display the contents of the playlist created by the user
function updatePlaylist(){
	var list = document.getElementById("dropTable");
	var playListString = "";
	for(var i = 0; i < playList.length; i++){
		playListString += i+1 + ". " + playList[i][0] + "<br />";
		}
	list.innerHTML = playListString;
}

//Youtube API function that launches when page is loaded
//It is used to set and event listener to the embedded youtube video
function onYouTubeIframeAPIReady(){
		console.log("Youtube running!");
		player = new YT.Player("video");
		player.addEventListener("onStateChange", "trackEnd");}

//An event listener that detects when a track has ended, uses Youtube API		
function trackEnd(event){
	if(event.data == 0 && arrayPosition < playingListLinks.length-1){
		arrayPosition += 1;
		var video = document.getElementById("video")
		video.src = "https://www.youtube.com/embed/"+ playingListLinks[arrayPosition] +"?controls=0&autoplay=1&rel=0&enablejsapi=1";
		player = new YT.Player("video");
		player.addEventListener("onStateChange", "trackEnd");
		var listContents = JSON.parse(localStorage.getItem("selectedList"));
		scrollTextString = listContents[arrayPosition][0];
		}
}






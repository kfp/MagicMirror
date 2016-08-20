var bible = {
        verses: [],
	verseIndex: 0,
	updateInterval: config.bible.interval || 10000,
        fadeInterval: config.bible.fadeInterval || 4000,
	intervalId: null,
	notes: [],
	noteIndex: 0,
	notesUpdating: false,
	showBible: true
}

bible.init = function(){
        this.verses = bibleVerses;
	this.updateNotes();
	this.updateBible();

        this.intervalId = setInterval(function () {
                this.updateDisplay();
        }.bind(this), this.updateInterval)

	setInterval(function() {
		this.updateNotes();
	}.bind(this), 60000)		
	
	setInterval(function() {
		this.updateBible();
	}.bind(this), 1800000)		
}

bible.updateDisplay = function(){
	console.log("Updating display...");
	if(this.verseIndex >= this.verses.length){
		this.verseIndex = 0;
	}
	if(this.noteIndex >= this.notes.length){
		this.noteIndex = 0;
	}


	if(this.showBible || this.notes.length == 0 || this.notesUpdating){
		console.log("Updating bible verse...");
		var currentVerse = this.verses[this.verseIndex];
		var verseAttr = currentVerse.bookname + " " + currentVerse.chapter + ":" + currentVerse.verse;
		$('.bibleVerse').updateWithText(currentVerse.text, this.fadeInterval);
		$('.bibleAttr').updateWithText(verseAttr, this.fadeInterval);
		this.showBible = false;
		this.verseIndex++;
	} else {
		console.log("bible["+this.noteIndex+"]:" + bible.notes);
		$('.bibleVerse').updateWithText(this.notes[this.noteIndex], this.fadeInterval);
		$('.bibleAttr').updateWithText(":>", this.fadeInterval);
		this.showBible = true;
		this.noteIndex++;
	}
}

bible.updateNotes = function(){
	this.notesUpdating = true;
	console.log("Updating notes...");
	jQuery.ajax({url: "/pushbullet", success: function(result){
		bible.notes = result.response;	
		bible.notesUpdating = false;
	}});
}

bible.updateBible = function(){
	console.log("Updating bible verses...");
}

function playNote(value) {
    $.post( "http://localhost:3000/music", { note: value } );
} 

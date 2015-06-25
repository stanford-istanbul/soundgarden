function playNote(value) {
    $.post( "http://music-cannon.meteor.com/music", { note: value, name: 'bryce' } );
} 

 var createSongRow = function(songNumber, songName, songLength) {
     var template =
        '<tr class="album-view-song-item">'
      + '  <td class="song-item-number" data-song-number="' + songNumber + '">' + songNumber + '</td>'
      + '  <td class="song-item-title">' + songName + '</td>'
      + '  <td class="song-item-duration">' + songLength + '</td>'
      + '</tr>'
      ;

     var $row = $(template);

     var clickHandler = function() {
         // clickHandler logic

         var songItem = $(this).attr('data-song-number');

         if (currentlyPlayingSong !== null) {
                  var currentlyPlayingSong = $('.song-item-number[data-song-number = " ' +currentlyPlayingSong + '"]');
                  currentlyPlayingCell.html(currentlyPlayingSong);
       }
         if (currentlyPlayingSong !== songNumber) {
           $(this).html(pauseButtonTemplate);
           currentlyPlayingSong = songNumber;
         } else if (currentlyPlayingSong === songNumber) {
                  $(this).html(playButtonTemplate);
                  currentlyPlayingSong = null;
         }
     };


      var onHover = function(event) {
        var songNumberCell = $(this).find('.song-item-number');
        var songNumber = songNumberCell.attr('data-song-number');

        if (songNumber !== currentlyPlayingSong) {
            songNumberCell.html(playButtonTemplate);
        }
      };
      var offHover = function(event) {
        var songNumberCell = $(this).find('.song-item-number');
      var songNumber = songNumberCell.attr('data-song-number');

      if (songNumber !== currentlyPlayingSong) {
          songNumberCell.html(songNumber);
      }

  };




     // #1
    $row.find('.song-item-number').click(clickHandler);
          // #2
    $row.hover(onHover, offHover);
          // #3
    return $row;
 };


 var setCurrentAlbum = function(album) {
     // #1
     var $albumTitle = $('.album-view-title');
     var $albumArtist = $('.album-view-artist');
     var $albumReleaseInfo = $('.album-view-release-info');
     var $albumImage = $('.album-cover-art');
     var $albumSongList = $('.album-view-song-list');
     // #2
     $albumTitle.text(album.title);
     $albumArtist.text(album.artist);
     $albumReleaseInfo.text(album.year + ' ' + album.label);
     $albumImage.attr('src', album.albumArtUrl);

     // #3
     $albumSongList.empty();

     // #4
     for (var i = 0; i < album.songs.length; i++) {
       var $newRow = createSongRow(i + 1, album.songs[i].title, album.songs[i].duration);
      $albumSongList.append($newRow);
     }
 };


// Album button templates
 var playButtonTemplate = '<a class="album-song-button"><span class="ion-play"></span></a>';
 var pauseButtonTemplate = '<a class="album-song-button"><span class="ion-pause"></span></a>';

 // Store state of playing songs
 var currentlyPlayingSong = null;

 $(document).ready(function() {
   setCurrentAlbum(albumPicasso);

});

﻿using System.Collections.Generic;

namespace PlaylistManager.Models
{
    public interface IMusicRepository
    {
        IEnumerable<TrackInfo> GetAllTracks(int pageNum, int pageSize);

        int AllTracksCount { get; }

        int AddPlayList(string title);

        int AllPlaylistsCount { get; }

        IEnumerable<PlaylistSummary> GetAllPlaylists(int pageNum, int pageSize);

        PlaylistDetails GetPlaylist(int id);
    }
}

import { useNavigate } from 'react-router';

import { useTvShows } from 'hooks/useTvShows';
import { TvShowCard } from './components';

export const TvShows = () => {
  const navigate = useNavigate();

  const { data: tvShows, isLoading, currentPage, mutate, goToNextPage, goToPrevPage } = useTvShows();

  const onDeleteCallback = () => {
    // if on last page and only one contact is on last page go to prev page otherwise refetch contacts
    if (tvShows && tvShows.last_page === currentPage && tvShows.data.length === 1 && currentPage > 1) {
      goToPrevPage();
    } else {
      mutate();
    }
  };

  return (
    <>
      <h1>TV Shows</h1>
      {isLoading && (
        <div className="loading-wrapper">
          <div className="loader"></div>
        </div>
      )}
      {tvShows?.data && tvShows.data.length > 0 && (
        <ul className="tv-shows-wrapper">
          {tvShows.data.map((data) => {
            return <TvShowCard key={data.id} data={data} onDeleteCallback={onDeleteCallback} />;
          })}
        </ul>
      )}
      {tvShows && tvShows.last_page > 1 && (
        <div className="pagination">
          <button onClick={goToPrevPage} disabled={tvShows.current_page === 1} className="button button--small">
            prev
          </button>
          <button onClick={goToNextPage} disabled={tvShows.last_page === currentPage} className="button button--small">
            next
          </button>
        </div>
      )}
      {!tvShows?.data.length && !isLoading && (
        <div className="no-data">
          <p>No shows yet. Please create some</p>
        </div>
      )}

      <button className="button" onClick={() => navigate('/tv-shows/new')}>
        Create new
      </button>
    </>
  );
};

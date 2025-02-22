import { BrowserRouter, Routes, Route } from 'react-router';

import { MainLayout } from 'layouts';
import { TvShows, SaveTvShow } from 'modules/TvShows';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<TvShows />} />
          <Route path="/tv-shows/:id" element={<SaveTvShow />} />
          <Route path="*" element={<h1>Page Not Found</h1>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

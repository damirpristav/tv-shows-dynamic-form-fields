/* eslint-disable @typescript-eslint/no-explicit-any */
import { useNavigate } from "react-router";

import { TVShow } from "types";
import { useDeleteTvShowMutation } from "hooks/useTvShowMutation";

export const TvShowCard = ({ data: { title, id }, onDeleteCallback }: Props) => {
  const navigate = useNavigate();

  const { trigger: deleteTrigger } = useDeleteTvShowMutation(id);

  const onDelete = async () => {
    try {
      await deleteTrigger();
      onDeleteCallback?.();
    } catch (err: any) {
      console.log(err);
    }
  };

  return (
    <li className="tv-show-card">
      <p>{title}</p>
      <div>
        <button type="button" onClick={() => navigate(`/tv-shows/${id}`)}>edit</button>
      </div>
      <div>
        <button type="button" className="delete" onClick={onDelete}>delete</button>
      </div>
    </li>
  );
};

type Props = {
  data: TVShow;
  onDeleteCallback?: () => void;
};

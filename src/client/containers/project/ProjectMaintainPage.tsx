import clsx from "clsx";
import FetchSlice from "src/client/slices/FetchSlice";
import ProjectSlice from "src/client/slices/ProjectSlice";
import React, { Dispatch, useEffect } from "react";
import { AxiosError, AxiosInstance } from "axios";
import { AxiosUtil, PaginationParams } from "src/client/utils/AxiosUtil";
import { CreateProjectFAB } from "src/client/components/project/CreateProjectFAB";
import { ProjectCardList } from "src/client/components/project/ProjectCardList";
import { ProjectPaginationVM } from "src/client/domain/project/ProjectVM";
import { RootState } from "src/client/reducer";
import { useDispatch, useSelector } from "react-redux";

export interface ProjectMaintainPageProps {
  title: string;
}

const PageSize = 48 * 4;

const GotoTop = () => {
  setTimeout(() => {
    const main = document.querySelector("main");
    main.scroll({ top: 0, behavior: "smooth" });
  }, 100);
};

const fetchProjectOnInitial = (
  client: AxiosInstance,
  dispatch: Dispatch<any>,
  refresh: boolean
) => {
  useEffect(() => {
    const params = {
      limit: PageSize,
      offset: 0,
    };

    if (refresh) {
      client
        .get<ProjectPaginationVM>("/api/projects", { params: params })
        .then((res) => {
          console.log(res.data);
          if (res.data.offset === 0) {
            GotoTop();
          }
          dispatch(ProjectSlice.fetch(res.data));
        })
        .catch((err: AxiosError) => {
          console.log(err.message);
          AxiosUtil.redirectUnAuthorization(err);
          dispatch(FetchSlice.fail({ error: err.message }));
        })
        .finally(() => {
          dispatch(FetchSlice.end());
        });
    }
  }, [refresh]);
};

export const ProjectMaintainPage: React.FC<ProjectMaintainPageProps> = () => {
  const name = "project";
  const classname = `${name} page`;
  const dispatch = useDispatch();

  const origin = AxiosUtil.getOriginWithPort();
  const client = AxiosUtil.makeAxiosInstance(dispatch, origin);

  const { projects, limit, offset, total, refresh } = useSelector(
    (state: RootState) => {
      return {
        ...state.project.page_result,
        refresh: state.project.fetch_refresh,
      };
    }
  );

  const { goto_top } = useSelector((state: RootState) => state.layout);

  const actions = clsx(["fab-actions", goto_top.show ? "with-goto-top" : ""]);

  fetchProjectOnInitial(client, dispatch, refresh);

  return (
    <React.Fragment>
      <div className={classname}>
        <div className="project-card-grid">
          <ProjectCardList projects={projects} />
        </div>
        <div className={actions}>
          <CreateProjectFAB />
        </div>
      </div>
    </React.Fragment>
  );
};

export default ProjectMaintainPage;

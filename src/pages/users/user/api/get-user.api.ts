import { IOffsetBasePaginate } from "../../../../common/interface/pagination";
import { useAxios } from "../../../../contexts/axios/AxiosContext";
import { UsersResponse } from "./response.interface";

export default async (state: IOffsetBasePaginate) => {
  const { axios } = useAxios();

  return axios.get<UsersResponse>("/users", {
    params: { limit: state.limit, skip: state.offset },
  });
};

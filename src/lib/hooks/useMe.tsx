import useSWR from "swr";
import { getUserInfo } from "../apis/user";

const useMe = () => {
  const {
    data: me,
    mutate: mutateMe,
    isLoading: isLoadingMe,
  } = useSWR("/user/me", getUserInfo);

  return {
    me,
    mutateMe,
    isLoadingMe,
  };
};

export default useMe;

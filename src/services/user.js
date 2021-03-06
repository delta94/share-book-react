import { axios } from "../config/axios";

const pathname = '/users' 

const registerUser = (email, password, username) => {
  return axios({
    url: pathname,
    method: "post",
    data: {
      email,
      password,
      username
    }
  })
    .then(res => res.data.message)
    .catch(err => {
      const messageError =
        (err.response && err.response.data && err.response.data.message) ||
        "action failed";
      throw new Error(messageError);
    });
};

const fetchUserById = (userId, token) => {
    return axios({
      url: `${pathname}/${userId}`,
      method: 'get',
      headers: {
        'Authorization': `Bearer ${token}`
      },
    })
      .then(res => res.data.user)
      .catch(err => {
        const messageError =
          (err.response && err.response.data && err.response.data.message) ||
          "failed to fetch user";
        throw new Error(messageError);
      });
}

const fetchGiveawaysByUser = (userId, token, {skip, limit, ...query}) => {
  return axios({
    url: `${pathname}/${userId}/giveaways`,
    headers: {
      'Authorization': `Bearer ${token}`,
    },
    method: 'get',
    params: {
      skip, limit,
      ...query

    }
  })
    .then(res => res.data.giveaways)
    .catch(err => {
      const messageError =
        (err.response && err.response.data && err.response.data.message) ||
        "failed to fetch giveaway";
      throw new Error(messageError);
    });

}



export const UserService =  {
  pathname,
  registerUser,
  fetchUserById,
  fetchGiveawaysByUser
};


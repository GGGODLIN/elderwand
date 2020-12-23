import axios from 'axios';
import faker from 'faker';
import TestEnvVar from '../../../test/config/TestEnvVar';
import UserMaintainUCO from '../UserMaintainUCO';
import {
  InviteUserDTO,
  InviteUserVO,
  LoginVO,
  RegisterVO,
  UserDTO
  } from 'g13-web-shared/server/user/models';
import { PlatformEnum, UserRoleEnum } from 'g13-web-shared/server/enums';
import { ServerEnvVar } from '../../config/ServerEnvVar';

const ApiHost = `http://${ServerEnvVar.SkymapApiHost}`;

const GetSkyMapAdmin = async (): Promise<UserDTO> => {
  const uid = TestEnvVar.SkymapAdminAccount;
  const url = `${ApiHost}/api/users/${uid}`;

  const query = {
    pid: PlatformEnum.SkyMap,
  };

  return await axios
    .get(url, { params: query })
    .then((result) => {
      return result.data;
    })
    .catch(() => {
      return null;
    });
};

const GetInviteTenantToken = async (): Promise<InviteUserDTO> => {
  const operator = await GetSkyMapAdmin();

  const email = faker.internet.email();

  const vo: InviteUserVO = {
    email: email,
    role_id: UserRoleEnum.ProjectEngineer,
    parent_id: operator.id,
    operator_id: operator.id,
  };

  return await new UserMaintainUCO().inviteUser(vo);
};

const GetInvitingUser = async (token: string): Promise<UserDTO> => {
  return await new UserMaintainUCO().getInvitingUser(token);
};

const GetRegisteredUser = async (user: UserDTO): Promise<UserDTO> => {
  const name = `${faker.name.firstName()} ${faker.name.lastName()}`;

  const vo: RegisterVO = {
    id: user.id,
    account_id: user.account_id,
    username: name.replace("s", "_").toLowerCase(),
    password: faker.internet.password(8),
    platform_id: user.platform_id,

    display_name: name,
    email: user.email,
    tel: faker.phone.phoneNumber(),
    address: faker.address.streetAddress(),
  };

  console.log(vo);

  return await new UserMaintainUCO().register(vo);
};

describe("User Maintain UseCase", () => {
  beforeAll(() => { });

  afterAll(() => { });

  describe("GET /api/users", () => {
    test("should return users", async () => {
      const vo = {
        platform_id: PlatformEnum.SkyMap,
      };

      await new UserMaintainUCO()
        .listUser(vo)
        .then((result) => {
          console.log(result);
        })
        .catch((err) => {
          console.log(err);
          expect(err).not.toBeNull();
        });
    });

    test("should return error", async () => {

      const vo = {
        platform_id: null,
      };

      await new UserMaintainUCO()
        .listUser(vo)
        .then((result) => {
          console.log(result);
        })
        .catch((err) => {
          console.log(err);
        });
    });
  });

  describe("GET /api/users/:uid", () => {
    test("should return users", async () => {
      const uid = await GetSkyMapAdmin()
        .then((result) => {
          return result.id;
        }).catch((err) => {
          console.log(err);
          expect(err).not.toBeNull();
          return ""
        });

      await new UserMaintainUCO()
        .getUser(uid)
        .then((result) => {
          console.log(result);
        })
        .catch((err) => {
          console.log(err);
          expect(err).not.toBeNull();
        });
    });

    test("should return error", async () => {

      const vo = {
        platform_id: null,
      };

      await new UserMaintainUCO()
        .listUser(vo)
        .then((result) => {
          console.log(result);
        })
        .catch((err) => {
          console.log(err);
        });
    });
  });

  describe("POST /api/login", () => {
    test("should return 200", async () => {
      const username = TestEnvVar.SkymapAdminAccount;
      const password = TestEnvVar.SkymapAdminPassword;

      const vo: LoginVO = {
        username: username,
        password: password,
      };

      await new UserMaintainUCO()
        .login(vo)
        .then((result) => {
          console.log(result);
        })
        .catch((err) => {
          console.log(err);
          expect(err).toBeNull();
        });
    });
  });

  describe("POST /api/invite/user", () => {
    test("invite a tenant should return 200", async () => {
      await GetInviteTenantToken()
        .then((result) => {
          console.log(result.token);
          expect(result.token).not.toBeNull();
        })
        .catch((err) => {
          expect(err).toBeNull();
        });
    });
  });

  describe("GET /api/invite/user", () => {
    test("get inviting user should return 200", async () => {
      const token = await GetInviteTenantToken()
        .then((result) => {
          return result.token;
        })
        .catch((err) => {
          expect(err).toBeNull();
          return "";
        });

      await new UserMaintainUCO()
        .getInvitingUser(token)
        .then((result) => {

          expect(result).not.toBeNull();
          console.log(result);
        })
        .catch((err) => {
          expect(err).toBeNull();
        });
    });
  });

  describe("POST /api/register", () => {
    test("register inviting user should return 200", async () => {
      const token = await GetInviteTenantToken()
        .then((result) => {
          return result.token;
        })
        .catch((err) => {
          expect(err).toBeNull();
          return "";
        });

      const user = await GetInvitingUser(token)
        .then((result) => {
          return result;
        })
        .catch((err) => {
          expect(err).toBeNull();
          return null;
        });

      await GetRegisteredUser(user)
        .then((result) => {
          console.log(result)
          expect(result).not.toBeNull();
        })
        .catch((err) => {
          expect(err).toBeNull();
        });

    });
  });

});

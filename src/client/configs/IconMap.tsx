import VisibilityIcon from "@material-ui/icons/Visibility";
import { UserRoleEnum } from "./Enum";
import SecurityIcon from "@material-ui/icons/Security";
import PolicyIcon from "@material-ui/icons/Policy";
import PortraitIcon from "@material-ui/icons/Portrait";
import PersonIcon from "@material-ui/icons/Person";
import PermContactCalendarIcon from "@material-ui/icons/PermContactCalendar";
import PeopleIcon from "@material-ui/icons/People";
import SettingsIcon from '@material-ui/icons/Settings';
import EmojiPeopleIcon from '@material-ui/icons/EmojiPeople';
import FaceIcon from '@material-ui/icons/Face';

export const UserRoleIconMap = {
  [UserRoleEnum.System]: <PortraitIcon />,
  [UserRoleEnum.Admin]: <SecurityIcon />,
  [UserRoleEnum.Staff]: <PermContactCalendarIcon />,
  [UserRoleEnum.Tenant]: <PolicyIcon />,
  [UserRoleEnum.Agent]: <FaceIcon />,
  [UserRoleEnum.ProjectEngineer]: <EmojiPeopleIcon />,
  [UserRoleEnum.FieldEngineer]: <PersonIcon />,
  [UserRoleEnum.Viewer]: <VisibilityIcon />,
};

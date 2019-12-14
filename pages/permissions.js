import PleaseSignIn from "../components/PleaseSignIn";
import Permissions from "../components/Permissions";

const PermissionPage = props => (
  <div>
    <PleaseSignIn>
      <Permissions />
    </PleaseSignIn>
  </div>
);

export default PermissionPage;

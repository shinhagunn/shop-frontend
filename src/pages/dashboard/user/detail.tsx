import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Block from '~/components/Block';
import BlockAdmin from '~/components/BlockAdmin';
import BlockItem from '~/components/BlockItem';
import Select from '~/components/Select';
import Button from '~/components/Button';
import LayoutAdmin from '~/layouts/LayoutAdmin';
import useAdminStore from '~/stores/admin';
import { changeISOTimeToMyFormTime } from '~/mixins/helper';
import ApiClient from '~/library/ApiClient';
import AddToast from '~/library/Toast';

function UserDetailAdminPage() {
  const AdminStore = useAdminStore();

  const [state, setState] = useState('');
  const [role, setRole] = useState('');

  const { uid } = useParams();

  const handleUpdate = async () => {
    try {
      await new ApiClient().patch(`/api/v2/myauth/admin/user/${uid}`, {
        state,
        role,
      });
      AddToast('Success', 'Update user thành công!', 'toast');
    } catch (error) {
      AddToast('Error', 'Update user không thành công!', 'toast');
      return error;
    }
  };

  useEffect(() => {
    if (uid) {
      AdminStore.fetchUserByUID(uid).then((result) => {
        if (result) {
          setState(result.state);
          setRole(result.role);
        }
      });
    }
  }, []);
  return (
    <div>
      <LayoutAdmin selected={2} pageName="Users">
        <div className="main">
          <BlockAdmin className="users" blockName="User Detail">
            <div>
              <Block className="items-center">
                <BlockItem col={4}>
                  <div className="text-2xl">
                    {AdminStore.user?.email}
                  </div>
                  <div>
                    <p>{`Last updated: ${AdminStore.user?.updated_at ? changeISOTimeToMyFormTime(AdminStore.user.updated_at) : ''}`}</p>
                    <p>{`Created at: ${AdminStore.user?.created_at ? changeISOTimeToMyFormTime(AdminStore.user.created_at) : ''}`}</p>
                  </div>
                </BlockItem>
                <BlockItem col={0}>
                  <Block>
                    <BlockItem col={3}>
                      <div className="">
                        <p className="font-bold">UID:</p>
                        {AdminStore.user?.uid}
                      </div>
                    </BlockItem>
                    <BlockItem col={3}>
                      <div className="">
                        <p className="font-bold">State:</p>
                        <Select value={state}>
                          <div>
                            <Button className="py-1 px-2 text-lg w-full text-left" onClick={() => setState('Active')}>Active</Button>
                          </div>
                          <div>
                            <Button className="py-1 px-2 text-lg w-full text-left" onClick={() => setState('Pending')}>Pending</Button>
                          </div>
                          <div>
                            <Button className="py-1 px-2 text-lg w-full text-left" onClick={() => setState('Banned')}>Banned</Button>
                          </div>
                          <div>
                            <Button className="py-1 px-2 text-lg w-full text-left" onClick={() => setState('Deleted')}>Deleted</Button>
                          </div>
                        </Select>
                      </div>
                    </BlockItem>
                    <BlockItem col={3}>
                      <div className="">
                        <p className="font-bold">Role:</p>
                        <Select value={role}>
                          <div>
                            <Button className="py-1 px-2 text-lg w-full text-left" onClick={() => setRole('Member')}>Member</Button>
                          </div>
                          <div>
                            <Button className="py-1 px-2 text-lg w-full text-left" onClick={() => setRole('Admin')}>Admin</Button>
                          </div>
                          <div>
                            <Button className="py-1 px-2 text-lg w-full text-left" onClick={() => setRole('Collaborators')}>Collaborators</Button>
                          </div>
                        </Select>
                      </div>
                    </BlockItem>
                  </Block>
                </BlockItem>
              </Block>
              <Block className="justify-end">
                <BlockItem>
                  <Button className="btn bg-indigo-400 hover:bg-indigo-500 btn-icon p-2 text-white rounded w-28 mt-12" onClick={() => handleUpdate()}>Update</Button>
                </BlockItem>
              </Block>
            </div>
          </BlockAdmin>
        </div>
      </LayoutAdmin>
    </div>
  );
}

export default UserDetailAdminPage;

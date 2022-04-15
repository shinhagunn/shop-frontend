/* eslint-disable jsx-a11y/label-has-associated-control */
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Block from '~/components/Block';
import BlockAdmin from '~/components/BlockAdmin';
import BlockItem from '~/components/BlockItem';
import Button from '~/components/Button';
import LayoutAdmin from '~/layouts/LayoutAdmin';
import useAdminStore from '~/stores/admin';
import ApiClient from '~/library/ApiClient';
import AddToast from '~/library/Toast';
import Input from '~/components/Input';
import '~/assets/styles/pages/admin/product/detail.less';
import { changeISOTimeToMyFormTime } from '~/mixins/helper';

function SlideDetailAdminPage() {
  const AdminStore = useAdminStore();
  const [description, setDescription] = useState('');
  const [url, setUrl] = useState<any>('');
  const [title, setTitle] = useState('');

  const navigation = useNavigate();

  const { id } = useParams();

  const handleUpdate = async () => {
    if (title === '') {
      AddToast('Error', 'Bạn phải nhập trường title', 'toast');
      return;
    }

    if (url === '') {
      AddToast('Error', 'Bạn phải upload file ảnh', 'toast');
      return;
    }

    if (description === '') {
      AddToast('Error', 'Bạn phải nhập trường description', 'toast');
      return;
    }

    try {
      await new ApiClient().patch(`/api/v2/product/admin/slide/${id}`, {
        description,
        image: url,
        title,
      });
      AddToast('Success', 'Update slide thành công!', 'toast');
      navigation('/admin/slides');
    } catch (error) {
      AddToast('Error', 'Update slide không thành công!', 'toast');
      return error;
    }
  };

  const handleRemove = async () => {
    try {
      // eslint-disable-next-line no-restricted-globals
      const x = confirm('Bạn chắc chắn muốn xóa ?');
      if (x) {
        await new ApiClient().delete(`/api/v2/product/admin/slide/${id}`);
        AddToast('Success', 'Remove slide thành công!', 'toast');
        navigation('/admin/slides');
      }
    } catch (error) {
      AddToast('Error', 'Remove slide không thành công!', 'toast');
      return error;
    }
  };

  useEffect(() => {
    if (id) {
      AdminStore.fetchSlideByID(id).then((result) => {
        if (result) {
          setUrl(result.image);
          setDescription(result.description);
          setTitle(result.title);
        }
      });
    }
  }, []);

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        setUrl(reader.result);
      };
    }
  };

  return (
    <div>
      <LayoutAdmin selected={5} pageName="Slides">
        <div className="main">
          <BlockAdmin className="users" blockName="Slide Detail">
            <div>
              <Block className="items-center">
                <BlockItem col={2}>
                  <div className="text-2xl">
                    <Input type="text" value={title} onChange={(e) => setTitle(e.target.value)} title="Click here to change" />
                  </div>
                  <div>
                    <p>{`Last updated: ${AdminStore.slide?.updated_at ? changeISOTimeToMyFormTime(AdminStore.slide.updated_at) : ''}`}</p>
                  </div>
                </BlockItem>
                <BlockItem col={2}>
                  <div className="">
                    <p className="font-bold">Created At:</p>
                    {AdminStore.slide?.updated_at ? changeISOTimeToMyFormTime(AdminStore.slide.created_at) : ''}
                  </div>
                </BlockItem>
              </Block>

              <Block>
                <BlockItem col={4}>
                  <div className="">
                    <p className="font-bold">Image:</p>
                    <label id="imagePre" htmlFor="upFile">
                      <img id="preview" src={url} />
                      <div className="overlay">
                        <i className="fas fa-upload text" />
                      </div>
                    </label>
                    <div>
                      <Input id="upFile" type="file" onChange={(e) => onFileChange(e)} />
                    </div>
                  </div>
                </BlockItem>
                <BlockItem col={0}>
                  <div className="">
                    <p className="font-bold">Description:</p>
                    <textarea className="w-full focus:outline-none border-color p-2 mt-4 h-48" value={description} onChange={(e) => setDescription(e.target.value)} />
                  </div>
                </BlockItem>
              </Block>

              <Block className="justify-between">
                <Button className="btn bg-red-300 hover:bg-red-400 btn-icon p-2 text-white rounded w-28 mt-12" onClick={() => handleRemove()}>Remove</Button>
                <Button className="btn bg-indigo-400 hover:bg-indigo-500 btn-icon p-2 text-white rounded w-28 mt-12" onClick={() => handleUpdate()}>Update</Button>
              </Block>
            </div>
          </BlockAdmin>
        </div>
      </LayoutAdmin>
    </div>
  );
}

export default SlideDetailAdminPage;

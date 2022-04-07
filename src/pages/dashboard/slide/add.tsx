/* eslint-disable jsx-a11y/label-has-associated-control */
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Block from '~/components/Block';
import BlockAdmin from '~/components/BlockAdmin';
import BlockItem from '~/components/BlockItem';
import Select from '~/components/Select';
import Button from '~/components/Button';
import LayoutAdmin from '~/layouts/LayoutAdmin';
import useAdminStore from '~/stores/admin';
import ApiClient from '~/library/ApiClient';
import AddToast from '~/library/Toast';
import Input from '~/components/Input';
import '~/assets/styles/pages/admin/product/detail.less';

function SlideAddAdminPage() {
  const AdminStore = useAdminStore();
  const [description, setDescription] = useState('');
  const [url, setUrl] = useState('');
  const [title, setTitle] = useState('');

  const navigation = useNavigate();

  const handleAdd = async () => {
    try {
      await new ApiClient().post('/api/v2/product/admin/slide', {
        description,
        image: url,
        title,
      });
      AddToast('Success', 'Add slide thành công!', 'toast');
    } catch (error) {
      AddToast('Error', 'Add slide không thành công!', 'toast');
      return error;
    }
  };

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setUrl(URL.createObjectURL(e.target.files[0]));
    }
  };

  return (
    <div>
      <LayoutAdmin selected={5} pageName="Slides">
        <div className="main">
          <BlockAdmin className="slides" blockName="Slide Add">
            <div>
              <Block>
                <BlockItem col={2}>
                  <div className="">
                    <p className="font-bold">Title:</p>
                    <Input className="w-96 mt-4 border-color p-1 pl-2 focus:outline-none rounded" type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
                  </div>
                </BlockItem>
                <BlockItem col={2}>
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
              </Block>

              <Block>
                <BlockItem col={0}>
                  <div className="">
                    <p className="font-bold">Description:</p>
                    <textarea className="w-full focus:outline-none border-color p-2 mt-4 h-48" value={description} onChange={(e) => setDescription(e.target.value)} />
                  </div>
                </BlockItem>
              </Block>

              <Block className="justify-between">
                <Button className="btn bg-red-300 hover:bg-red-400 btn-icon p-2 text-white rounded w-42 mt-12" onClick={() => navigation('/dashboard/slides')}>Return dashboard</Button>
                <Button className="btn bg-indigo-400 hover:bg-indigo-500 btn-icon p-2 text-white rounded w-28 mt-12" onClick={() => handleAdd()}>Add</Button>
              </Block>
            </div>
          </BlockAdmin>
        </div>
      </LayoutAdmin>
    </div>
  );
}

export default SlideAddAdminPage;

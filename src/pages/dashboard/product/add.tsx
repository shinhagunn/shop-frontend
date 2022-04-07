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

function ProductAddAdminPage() {
  const AdminStore = useAdminStore();
  const [description, setDescription] = useState('');
  const [url, setUrl] = useState('');
  const [name, setName] = useState('');
  const [categoryID, setCategoryID] = useState('');
  const [discount, setDiscount] = useState('');
  const [price, setPrice] = useState('');

  const navigation = useNavigate();

  const handleAdd = async () => {
    try {
      await new ApiClient().post('/api/v2/product/admin/product', {
        description,
        image: url,
        name,
        category_id: categoryID,
        discount: Number(discount),
        price: Number(price),
      });
      AddToast('Success', 'Add product thành công!', 'toast');
    } catch (error) {
      AddToast('Error', 'Add product không thành công!', 'toast');
      return error;
    }
  };

  const getNameCategory = (categoryID: string) => {
    const index = AdminStore.categories.findIndex((category) => category.id === categoryID);
    return AdminStore.categories[index]?.name;
  };

  useEffect(() => {
    AdminStore.fetchCategories().then((res) => {
      if (res) {
        setCategoryID(res[0].id);
      }
    });
  }, []);

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setUrl(URL.createObjectURL(e.target.files[0]));
    }
  };

  return (
    <div>
      <LayoutAdmin selected={4} pageName="Products">
        <div className="main">
          <BlockAdmin className="users" blockName="Product Add">
            <div>
              <Block className="items-center">
                <BlockItem col={4}>
                  <div className="">
                    <p className="font-bold">Name:</p>
                    <Input className="w-full mt-1 border-color p-1 pl-2 focus:outline-none rounded" type="text" value={name} onChange={(e) => setName(e.target.value)} />
                  </div>
                </BlockItem>
                <BlockItem col={4}>
                  <div className="">
                    <p className="font-bold">Price:</p>
                    <Input className="w-full mt-1 border-color p-1 pl-2 focus:outline-none rounded" type="text" value={price} onChange={(e) => setPrice(e.target.value)} />
                  </div>
                </BlockItem>
                <BlockItem col={4}>
                  <div className="">
                    <p className="font-bold">Discount:</p>
                    <Input className="w-full mt-1 border-color p-1 pl-2 focus:outline-none rounded" type="text" value={discount} onChange={(e) => setDiscount(e.target.value)} />
                  </div>
                </BlockItem>
                <BlockItem col={4}>
                  <div className="">
                    <p className="font-bold">Category:</p>
                    <Select value={getNameCategory(categoryID)}>
                      {AdminStore.categories.map((category) => (
                        <div key={category.id}>
                          <Button className="py-1 px-2 text-lg w-full text-left" onClick={() => setCategoryID(category.id)}>{category.name}</Button>
                        </div>
                      ))}
                    </Select>
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
                <Button className="btn bg-red-300 hover:bg-red-400 btn-icon p-2 text-white rounded w-42 mt-12" onClick={() => navigation('/dashboard/products')}>Return dashboard</Button>
                <Button className="btn bg-indigo-400 hover:bg-indigo-500 btn-icon p-2 text-white rounded w-28 mt-12" onClick={() => handleAdd()}>Add</Button>
              </Block>
            </div>
          </BlockAdmin>
        </div>
      </LayoutAdmin>
    </div>
  );
}

export default ProductAddAdminPage;

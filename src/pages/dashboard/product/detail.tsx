/* eslint-disable jsx-a11y/label-has-associated-control */
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Block from '~/components/Block';
import BlockAdmin from '~/components/BlockAdmin';
import BlockItem from '~/components/BlockItem';
import Select from '~/components/Select';
import Button from '~/components/Button';
import LayoutAdmin from '~/layouts/LayoutAdmin';
import useAdminStore from '~/stores/admin';
import { changeISOTimeToMyFormTime, CurrencyHTML } from '~/mixins/helper';
import ApiClient from '~/library/ApiClient';
import AddToast from '~/library/Toast';
import Input from '~/components/Input';
import '~/assets/styles/pages/admin/product/detail.less';

function ProductDetailAdminPage() {
  const AdminStore = useAdminStore();
  const [description, setDescription] = useState('');
  const [url, setUrl] = useState('');
  const [name, setName] = useState('');
  const [categoryID, setCategoryID] = useState('');
  const [discount, setDiscount] = useState('');
  const [price, setPrice] = useState('');

  const { id } = useParams();

  const handleUpdate = async () => {
    try {
      await new ApiClient().patch(`/api/v2/product/admin/product/${id}`, {
        description,
        image: url,
        name,
        category_id: categoryID,
        discount: Number(discount),
        price: Number(price),
      });
      AddToast('Success', 'Update product thành công!', 'toast');
    } catch (error) {
      AddToast('Error', 'Update product không thành công!', 'toast');
      return error;
    }
  };

  const handleRemove = async () => {
    try {
      await new ApiClient().delete(`/api/v2/product/admin/product/${id}`);
      AddToast('Success', 'Remove product thành công!', 'toast');
    } catch (error) {
      AddToast('Error', 'Remove product không thành công!', 'toast');
      return error;
    }
  };

  const getNameCategory = (categoryID: string) => {
    const index = AdminStore.categories.findIndex((category) => category.id === categoryID);
    return AdminStore.categories[index]?.name;
  };

  useEffect(() => {
    AdminStore.fetchCategories();
    if (id) {
      AdminStore.fetchProductByID(id).then((result) => {
        if (result) {
          setUrl(result.image);
          setDescription(result.description);
          setCategoryID(result.category_id);
          setName(result.name);
          setDiscount(`${result.discount}`);
          setPrice(`${result.price}`);
        }
      });
    }
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
          <BlockAdmin className="users" blockName="Product Detail">
            <div>
              <Block className="items-center">
                <BlockItem col={3}>
                  <div className="text-2xl">
                    <Input type="text" value={name} onChange={(e) => setName(e.target.value)} title="Click here to change" />
                  </div>
                  <div>
                    <p>{`Last updated: ${AdminStore.product?.updated_at ? changeISOTimeToMyFormTime(AdminStore.product.updated_at) : ''}`}</p>
                  </div>
                </BlockItem>
                <BlockItem col={3}>
                  <div className="">
                    <p className="font-bold">ID:</p>
                    {AdminStore.product?.id}
                  </div>
                </BlockItem>
                <BlockItem col={3}>
                  <div className="">
                    <p className="font-bold">Created At:</p>
                    {AdminStore.product?.updated_at ? changeISOTimeToMyFormTime(AdminStore.product.created_at) : ''}
                  </div>
                </BlockItem>
              </Block>

              <Block className="items-center">
                <BlockItem col={3}>
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
                <BlockItem col={3}>
                  <div className="">
                    <p className="font-bold">Price:</p>
                    <Input className="w-32" type="text" value={price} onChange={(e) => setPrice(e.target.value)} title="Click here to change" />
                  </div>
                </BlockItem>
                <BlockItem col={3}>
                  <div className="">
                    <p className="font-bold">Discount:</p>
                    <Input className="w-8" type="text" value={discount} onChange={(e) => setDiscount(e.target.value)} title="Click here to change" />
                    %
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

export default ProductDetailAdminPage;

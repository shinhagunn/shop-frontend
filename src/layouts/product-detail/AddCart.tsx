/* eslint-disable @typescript-eslint/ban-types */
import Button from '~/components/Button';
import Input from '~/components/Input';

interface AddCartProps {
  value: string
  parentCallback: Function
  addCart: Function
}

function AddCart(props: AddCartProps) {
  return (
    <div className="flex">
      <div className="flex mr-4">
        <Button className="border-2 text-lg h-10 py-1 px-2" onClick={() => props.parentCallback(props.value === '1' ? 1 : Number(props.value) - 1)}>-</Button>
        <Input type="text" className="w-10 h-10 border-t-[2px] border-b-[2px] focus:outline-none text-center" onChange={(e) => props.parentCallback(e.target.value)} value={props.value} />
        <Button className="border-2 text-lg  h-10 py-1 px-2" onClick={() => props.parentCallback(Number(props.value) + 1)}>+</Button>
      </div>
      <Button className="btn-color btn-icon btn-hover text-white py-2 px-3 font-bold text-base" onClick={() => props.addCart()}>THÊM VÀO GIỎ</Button>
    </div>
  );
}

export default AddCart;
